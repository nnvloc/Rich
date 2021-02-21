import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {DispatchUnwrapResult} from '../redux/helpers';
import {validateResult, validateDate} from './validations';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {getResult, addResult} from '../redux/actions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [extra, setExtra] = useState('');
  const [formErrors, setError] = useState(null);

  const handleGetData = async (params) => {
    try {
      return await DispatchUnwrapResult(getResult, params);
    } catch (err) {
      console.log('error: ', err);
    }
  };

  useEffect(() => {
    handleGetData({});
  });

  const onChangeDate = (text) => {
    setDate(text);
  };

  const onChangeResult = (text) => {
    setResult(text);
  };

  const onChangeExtra = (text) => {
    setExtra(text);
  };

  const formValidate = () => {
    const errors = {};

    const validateDateErr = validateDate(date);
    if (validateDateErr) {
      errors.date = {key: 'date', message: validateDateErr};
    }

    const validateResultErr = validateResult(result);
    if (validateResultErr) {
      errors.result = {key: 'result', message: validateResultErr};
    }

    if (!extra) {
      errors.extra = {key: 'extra', message: 'Extra is required!'};
    }

    return errors;
  };

  const onSubmit = async () => {
    const errors = formValidate();

    console.log('form validate errors: ', errors);

    if (Object.keys(errors).length) {
      setError(errors);
      return;
    } else {
      setError({});
      await handleSubmit({
        value: result.split(',').map((item) => +item.trim()),
        extra,
        date,
      });
    }
  };

  const handleSubmit = async (params) => {
    try {
      const addedResult = await DispatchUnwrapResult(addResult, params);
      Alert.alert(
        'Add Result',
        `Add result success: ${addedResult.date}`,
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'OK', onPress: () => null},
        ],
        {cancelable: false},
      );
    } catch (err) {
      setError({submit: {key: 'submit', message: err.message}});
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text>Date</Text>
            <TextInput
              mode="flat"
              style={styles.textInput}
              placeholder="Enter date"
              onChangeText={onChangeDate}
              defaultValue={''}
              autoCapitalize="none"
              underlineColor="transparent"
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Result</Text>
            <TextInput
              mode="flat"
              style={styles.textInput}
              placeholder="Enter result"
              onChangeText={onChangeResult}
              defaultValue={''}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Extra</Text>
            <TextInput
              mode="flat"
              style={styles.textInput}
              placeholder="Enter Extra"
              onChangeText={onChangeExtra}
              defaultValue={''}
              autoCapitalize="none"
            />
          </View>
          {renderErrors()}
          <TouchableOpacity onPress={onSubmit} style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Add Result</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
});

export default HomeScreen;
