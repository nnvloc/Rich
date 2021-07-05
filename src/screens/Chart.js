import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {useGetResultsByValue} from '../redux/selectors';

const ChartScreen = () => {
  const rootData = useGetResultsByValue();
  console.log('rootData: ', rootData);

  const [result, setResult] = useState('');
  const [foundResult, setFoundResult] = useState(null);

  const onChangeResult = (text) => {
    setResult(text);
  };

  const onSubmit = async () => {
    if(!result) {
      return;
    }

    const foundItem = rootData[result];
    setFoundResult(foundItem);
  };

  const renderItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem = ({item}) => {
    const itemData = rootData[item];
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemValue}>{item}</Text>
      </View>
    );
  };

  const footerComponent = () => (
    <View style={{marginVertical: 20}}>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text>Result</Text>
            <TextInput
              value={result}
              mode="flat"
              style={styles.textInput}
              placeholder="Enter result"
              onChangeText={onChangeResult}
              defaultValue={''}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity onPress={onSubmit} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {
        foundResult && <View style={styles.itemContainer}>
          <Text style={styles.itemDate}>{foundResult.key}</Text>
          <Text style={styles.itemValue}>{foundResult.value.join(', ')}</Text>
        </View> 
      }
      <View style={styles.componentSeparator}>
      </View>

      <FlatList
        data={Object.keys(rootData).sort()}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={renderItem}
        listFooterComponent={footerComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 15,
    paddingVertical: 15,
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
  itemContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  itemSeparator: {
    marginVertical: 10,
    height: 1,
    backgroundColor: 'grey',
  },
  itemValue: {
    fontSize: 18,
  },
  itemDate: {
    fontSize: 18,
  },
  componentSeparator: {
    marginVertical: 10,
  }
});

export default ChartScreen;
