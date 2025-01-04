import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { palette } from '../constants/palette';
import { LoadingModal } from '../modals';
import { selectLoadingGetUserInfo } from '../store/slices/user/selectors';
import { useSelector } from 'react-redux';
import ChangePasswordScreen from '../screens/main/change-password-screen';
import ChangeUserInfoScreen from '../screens/main/change-user-info-screen';
import AddChildrenScreen from '../screens/main/add-children-screen';

export default function MainNavigator() {
  const Stack = createNativeStackNavigator();
  const loadingGetUserInfo = useSelector(selectLoadingGetUserInfo);

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{
            headerShown: true,
            title: 'Đổi mật khẩu',
            headerBackTitleVisible: false,
            headerTintColor: palette.primary,
            headerStyle: {
              backgroundColor: palette.white,
            },
          }}
        />
        <Stack.Screen
          name="ChangeUserInfoScreen"
          component={ChangeUserInfoScreen}
          options={{
            headerShown: true,
            title: 'Thay Đổi Thông Tin',
            headerBackTitleVisible: false,
            headerTintColor: palette.primary,
            headerStyle: { backgroundColor: palette.white },
          }}
        />
        <Stack.Screen
          name="AddChildScreen"
          component={AddChildrenScreen}
          options={{
            headerShown: true,
            title: 'Thêm thông tin con',
            headerBackTitleVisible: false,
            headerTintColor: palette.primary,
            headerStyle: { backgroundColor: palette.white },
          }}
        />
      </Stack.Navigator>
      <LoadingModal visible={loadingGetUserInfo === 'pending'} />
    </>
  );
}
