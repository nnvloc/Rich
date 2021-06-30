import React, {useEffect, useCallback, useState, memo} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation} from '@react-navigation/native';

import {
  VictoryLine,
  VictoryLabel,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";

import {useGetFilteredResults} from '../redux/selectors';
import {
  filterData,
  sortResultsByDate,
  getAppearanceOfNumber,
} from '../utils/helpers';

const NumberDetailsScreen = () => {
  const route = useRoute();
  const {params: {value}} = route;
  const navigation = useNavigation();

  const rootData = sortResultsByDate(useGetFilteredResults(), 1);
  const [numberDetails, setNumberDetails] = useState({
    chart: [{x: 0, y:0}]
  });

  const [numberDetailsByDayOfWeek, setNumberDetailsByDayOfWeek] = useState({
    chart: [{x: 0, y:0}]
  });
  const [dayOfWeek, setDayOfWeek] = useState(null);

  const getNumberSummaryByDayOfWeek = () => {
    if (dayOfWeek) {
      const length = rootData.length;
      const filter = {
        startDate: rootData[0].date,
        endDate: rootData[length-1].date,
        dayOfWeek: +dayOfWeek,
      }
  
      const filtered = filterData({filter, rootData});
      const data = sortResultsByDate(filtered, 1)
      return getAppearanceOfNumber(data, value);
    }

    return numberDetails;
  }

  useEffect(() => {
    navigation.setOptions({title: `Details: ${value}`});
    const numberSummary = getAppearanceOfNumber(rootData, value);
    const numberSummaryByDayOfWeek = getNumberSummaryByDayOfWeek();

    setNumberDetailsByDayOfWeek(numberSummaryByDayOfWeek);
    setNumberDetails(numberSummary);
  }, []);

  const onChangeDayOfWeek = (text) => {
    setDayOfWeek(text);
  }

  const toggleFilter = () => {
    const details = getNumberSummaryByDayOfWeek();
    setNumberDetailsByDayOfWeek(details);
  }
  
  const renderChart = (data) => {
    const length = data.length;
    const width = length * 100;
    return (
      <ScrollView horizontal={true} >
        <VictoryChart
          zoom={false}
          width={width}
          height={200}
          theme={VictoryTheme.material}
        >
          <VictoryLine
            domain={{y: [0, 1.5]}}
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            labels={({ datum }) => datum.label || 'none'}
            fixLabelOverlap={true}
            data={data}
          />
        </VictoryChart>
      </ScrollView>
    )
  }

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.filterContainer}>
          <View style={styles.formGroup}>
            <Text>Day of week</Text>
            <TextInput
              value={dayOfWeek}
              mode="flat"
              style={styles.textInput}
              placeholder="Enter day of week"
              onChangeText={onChangeDayOfWeek}
              defaultValue={''}
              autoCapitalize="none"
              underlineColor="transparent"
            />
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={toggleFilter}>
            <Text style={styles.submitBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>
        {renderChart(numberDetails.chart)}
        <View style={{marginVertical: 10}}></View>
        {renderChart(numberDetailsByDayOfWeek.chart)}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 10,
  },
  chart: {
    flex: 1
  },
  form: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  formGroup: {
    marginVertical: 10,
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderBottomWidth: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  submitBtn: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default memo(NumberDetailsScreen);
