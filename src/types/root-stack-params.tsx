import { NavigationProp, RouteProp } from '@react-navigation/native';
import { AuthActionType } from './auth';
import { IBasePackage } from './package';

export type RootStackParamList = {
  HomeScreen: undefined;
  Main: undefined;
  ChangePasswordScreen: undefined;
  CategoryScreen: { type: number };
  ChangeUserInfoScreen: undefined;
  PaymentScreen: { packageItem: IBasePackage };
  ForgotPasswordScreen: undefined;
  RegisterScreen: undefined;
  MedicineScreen: { categoryId: number; type: number };
  OTPScreen: { email: string; authActionType: AuthActionType };
  LoginScreen: undefined;
};

export type NavigationProps = NavigationProp<RootStackParamList>;

export type MedicineScreenRouteProp = RouteProp<
  RootStackParamList,
  'MedicineScreen'
>;

export type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTPScreen'>;

export type PaymentScreenRouteProp = RouteProp<
  RootStackParamList,
  'PaymentScreen'
>;

export type CategoryScreenRouteProp = RouteProp<
  RootStackParamList,
  'CategoryScreen'
>;
