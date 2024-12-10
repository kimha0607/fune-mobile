import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { palette } from '../constants/palette';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: palette.primary },
        headerTintColor: palette.white,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Đăng Ký',
          headerTintColor: palette.primary,
          headerStyle: { backgroundColor: palette.white },
        }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          title: 'Quên Mật Khẩu',
          headerTintColor: palette.primary,
          headerStyle: { backgroundColor: palette.white },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
