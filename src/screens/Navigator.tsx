import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Splash/Splash';
import RegisterScreen from './Login/RegisterScreen';
import {RootStackParamList} from './navigationTypes';
import SearchModeScreen from './SearchMode/SearchModeScreen';
import {LoginScreen} from './Login/LoginScreen';
import SelectSection from './SearchMode/SelectSection';
import SelectSigungu from './SearchMode/SelectSigungu.tsx';
import CleanModeScreen from '@screens/CleanMode/CleanModeScreen.tsx';
import AdminModeScreen from './AdminMode/AdminModeScreen.tsx';
import DriverModeScreen from "@screens/DriverMode/DriverModeScreen.tsx";
import SelectSigunguClean from "@screens/SearchMode/SelectSigunguClean.tsx";
import SelectSectionClean from "@screens/SearchMode/SelectSectionClean.tsx";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SearchMode"
        component={SearchModeScreen}
        options={{
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false, // 뒤로가기 버튼 숨기기
        }}
      />
      <RootStack.Screen name="SelectSigungu" component={SelectSigungu} />
      <RootStack.Screen name="SelectSection" component={SelectSection} />
      <RootStack.Screen name="SelectSigunguClean" component={SelectSigunguClean} />
      <RootStack.Screen name="SelectSectionClean" component={SelectSectionClean} />
      <RootStack.Screen
        name="AdminMode"
        component={AdminModeScreen}
        options={{
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false, // 뒤로가기 버튼 숨기기
        }}
      />
      <RootStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="DriverMode" component={DriverModeScreen} />
      <RootStack.Screen
        name="CleanupMode"
        component={CleanModeScreen}
        options={{
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false, // 뒤로가기 버튼 숨기기
        }}
      />
    </RootStack.Navigator>
  );
};

export default Navigator;
