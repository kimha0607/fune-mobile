import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppointmentScreen from '../screens/main/appointment-screen';
import UserScreen from '../screens/main/user-screen';
import { Home2, User, Calendar } from 'iconsax-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { RootStackParamList } from '../types/root-stack-params';
import { palette } from '../constants/palette';
import HomeScreen from '../screens/main/home-screen';

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
const HomeTabIcon = ({ size, focused, color }: TabIconProps) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 2,
      borderTopColor: focused ? palette.primary : 'transparent',
    }}>
    <Home2 size={size} color={color} variant={focused ? 'Bold' : 'Outline'} />
  </View>
);

const AppointmentTabIcon = ({ size, focused, color }: TabIconProps) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 2,
      borderTopColor: focused ? palette.primary : 'transparent',
    }}>
    <Calendar
      size={size}
      color={color}
      variant={focused ? 'Bold' : 'Outline'}
    />
  </View>
);

const UserTabIcon = ({ size, focused, color }: TabIconProps) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 2,
      borderTopColor: focused ? palette.primary : 'transparent',
    }}>
    <User size={size} color={color} variant={focused ? 'Bold' : 'Outline'} />
  </View>
);

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: palette.primary,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="AppointmentTab"
        component={AppointmentScreen}
        options={{
          tabBarIcon: AppointmentTabIcon,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FAFBFF',
            borderBottomColor: palette.gray4,
            borderBottomWidth: 1,
          },
          headerTintColor: palette.primary,
          title: 'Đặt lịch khám',
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserScreen}
        options={{
          tabBarIcon: UserTabIcon,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FAFBFF',
            borderBottomColor: palette.gray4,
            borderBottomWidth: 1,
          },
          headerTintColor: palette.primary,
          title: 'Thông tin người dùng',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
