import React, {useState, useEffect, memo, useCallback} from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import {useNavigation} from '@react-navigation/native'

import {filterData} from '../utils/helpers';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Modal,
  FlatList,
  TouchableOpacity,
  Picker,
} from 'react-native';

import {useGetFilteredResults} from '../redux/selectors';

dayjs.extend(customParseFormat);

const SORT_BY = {
  NUMBER: 'number',
  FREQUENCY: 'frequency',
};

const BingoValueScreen = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [formErrors, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(SORT_BY.NUMBER);

  const rootData = useGetFilteredResults();

  const [data, setData] = useState([]);

  const onChangeStartDate = (text) => {
    setStartDate(text);
  };

  const onChangeEndDate = (text) => {
    setEndDate(text);
  };

  const onChangeDayOfWeek = (text) => {
    setDayOfWeek(text);
  };

  const summaryData = (dataToSummary) => {
    const summaryData = dataToSummary.reduce((results, item) => {
      item.value.forEach((v) => {
        if (!results[+v]) {
          results[+v] = {value: +v, count: 0};
        }
        results[+v].count++;
      });
      return {...results};
    }, {});
    return Object.values(summaryData);
  };

  const onSubmit = async () => {
    if (!startDate && !endDate && !dayOfWeek) {
      setData(summaryData(rootData));
      setModalVisible(false);
      return;
    }

    const filter = {
      startDate,
      endDate,
      dayOfWeek,
    };
    const filtered = filterData({filter, rootData});
    setData(summaryData(filtered));
    setModalVisible(false);
  };

  const sortResults = () => {
    return sortBy === SORT_BY.FREQUENCY
      ? data.sort((a, b) => {
        const aCount = a.count;
        const bCount = b.count;
        return bCount - aCount;
      })
      : data.sort((a, b) => {
        return a.value - b.value;
      });
  };

  // Render functions
  const renderErrors = () => {
    if (!formErrors || !Object.keys(formErrors ?? {}).length) {
      return null;
    }

    return (
      <View style={styles.errorWrapper}>
        {Object.values(formErrors ?? {}).map((err) => {
          return (
            <Text style={styles.errorText} key={err.key}>
              {err.key} : {err.message}
            </Text>
          );
        })}
      </View>
    );
  };

  const renderItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  const onItemClicked = (item) => {
    const {value} = item;
    navigation.push('NumberDetails', {
      value,
    });
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onItemClicked(item)}>
        <Text style={styles.itemValue}>{item.value}</Text>
        <Text style={styles.itemCount}>{item.count}</Text>
      </TouchableOpacity>
    );
  };

  const renderFilter = () => {
    return (
      <Modal
        style={styles.modalContainer}
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleFilter}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text>Start Date</Text>
            <TextInput
              mode="flat"
              style={styles.textInput}
              placeholder="Enter start date"
              onChangeText={onChangeStartDate}
              defaultValue={startDate}
              autoCapitalize="none"
              underlineColor="transparent"
            />
          </View>
          <View style={styles.formGroup}>
            <Text>End Date</Text>
            <TextInput
              mode="flat"
              style={styles.textInput}
              placeholder="Enter end date"
              onChangeText={onChangeEndDate}
              defaultValue={endDate}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Day of week</Text>
            <TextInput
              mode="flat"
              style={styles.textInput}
              placeholder="Enter Extra"
              onChangeText={onChangeDayOfWeek}
              defaultValue={dayOfWeek}
              autoCapitalize="none"
            />
          </View>
          <View>
            <Text>Sort by</Text>
            <Picker
              selectedValue={sortBy}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
            >
              <Picker.Item label={SORT_BY.NUMBER} value={SORT_BY.NUMBER} />
              <Picker.Item label={SORT_BY.FREQUENCY} value={SORT_BY.FREQUENCY} />
            </Picker>
          </View>
          {renderErrors()}
          <TouchableOpacity onPress={onSubmit} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit} style={styles.closeBtn}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const toggleFilter = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.filterBtn]}>
        <TouchableOpacity style={styles.submitBtn} onPress={toggleFilter}>
          <Text style={styles.submitBtnText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <FlatList
          data={sortResults(data)}
          keyExtractor={(item) => item.value.toString()}
          ItemSeparatorComponent={renderItemSeparator}
          renderItem={renderItem}
        />
      </View>
      {renderFilter()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  form: {
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  formGroup: {
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderBottomWidth: 1,
  },
  submitBtn: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  submitBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorWrapper: {
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  itemSeparator: {
    marginVertical: 5,
    height: 1,
    backgroundColor: 'grey',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 18,
    fontWeight: '500',
    width: 30,
    marginRight: 100,
  },
  itemCount: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  closeBtn: {
    paddingVertical: 15,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default memo(BingoValueScreen);
