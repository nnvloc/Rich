import React from 'react';
import {View, StyleSheet} from 'react-native';

const ChartScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
})

export default ChartScreen;
