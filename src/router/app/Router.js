import React from 'react';
import Home from '../../screens/general/home/Home';
import Login from '../../screens/general/login/Login';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStructue from '../../screens/AppStructure';

const Stack = createNativeStackNavigator();

export default function Router() {
  const HomeComp = props => <AppStructue com={Home} />;
  const LoginComp = props => <AppStructue com={Login} />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeComp} />
        <Stack.Screen name="Login" component={LoginComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
