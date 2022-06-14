import React, {useState} from 'react';
import Home from '../../screens/general/home/Home';
import Login from '../../screens/general/login/Login';
import SignUp from '../../screens/general/signup/Signup';
import ForgetPass from '../../screens/general/signup/ForgetPass';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavBarAndroid from '../../components/Android/BottomNavBar';
import {TopNavBar} from '../../components/Android/TopNavBar';
import {globalStateContext} from './../../App';

const Stack = createNativeStackNavigator();

export default function Router() {
  const useGlobalState = () => [React.useContext(globalStateContext)];

  const [state] = useGlobalState();

  const [showBottonNavLocal, setShowBottonNavLocal] = useState(
    state.showBottonNav,
  );

  React.useEffect(() => {
    console.log('detect change ' + state.showBottonNav);
    setShowBottonNavLocal(state.showBottonNav);
  }, [state.showBottonNav]);

  return (
    <NavigationContainer>
      <TopNavBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPass" component={ForgetPass} />
      </Stack.Navigator>
      <BottomNavBarAndroid show={showBottonNavLocal} />
    </NavigationContainer>
  );
}
