import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as StoreProvider} from 'react-redux';

import store from './src/redux/store';

import HomeScreen from './src/screens/Home';
import BingoValueScreen from './src/screens/BingoValue';
import ChartScreen from './src/screens/Chart';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Bingo" component={BingoValueScreen} />
          <Tab.Screen name="Chart" component={ChartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
