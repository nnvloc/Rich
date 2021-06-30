import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as StoreProvider} from 'react-redux';

import store from './src/redux/store';

import HomeScreen from './src/screens/Home';
import BingoValueScreen from './src/screens/BingoValue';
import ChartScreen from './src/screens/Chart';
import NumberDetails from './src/screens/NumberDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreens = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Bingo" component={BingoValueScreen} />
    <Tab.Screen name="Chart" component={ChartScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AppStack"
            options={{
              headerShown: false,
            }}
            component={TabScreens} />
          <Stack.Screen name="NumberDetails" component={NumberDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
