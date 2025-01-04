import { NavigationProp, RouteProp } from '@react-navigation/native';
import { IBasePackage } from './package';

export type RootStackParamList = {
  HomeScreen: undefined;
  Main: undefined;
  ChangePasswordScreen: undefined;
  AddChildScreen: undefined;
  AppointmentScheduleScreen: undefined;
  AppointmentBookingScreen: undefined;
  CategoryScreen: { type: number };
  ChangeUserInfoScreen: undefined;
  PaymentScreen: { packageItem: IBasePackage };
  RegisterScreen: undefined;
  MedicineScreen: { categoryId: number; type: number };
  LoginScreen: undefined;
};

export type NavigationProps = NavigationProp<RootStackParamList>;

export type MedicineScreenRouteProp = RouteProp<
  RootStackParamList,
  'MedicineScreen'
>;

export type PaymentScreenRouteProp = RouteProp<
  RootStackParamList,
  'PaymentScreen'
>;

export type CategoryScreenRouteProp = RouteProp<
  RootStackParamList,
  'CategoryScreen'
>;
