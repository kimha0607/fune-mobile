import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import RHFInput from '../../hook-form/rhf-input';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { palette } from '../../constants/palette';
import ButtonComponent from '../../components/ButtonComponent';
import { Calendar2 } from 'iconsax-react-native';
import { appSize } from '../../constants/appSize';
import { NavigationProps } from '../../types/root-stack-params';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProps>();

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    navigation.navigate('OTPScreen', {
      email: data.email,
      authActionType: 'forgot-password',
    });
  };

  return (
    <ContainerComponent
      style={{ justifyContent: 'center', paddingHorizontal: 8 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <View style={{ height: 40 }} />
        <Image
          source={require('../../assets/images/logo-single.png')}
          style={{ height: 142, width: '100%', marginBottom: 4 }}
          resizeMode="contain"
        />
        <View style={{ height: 10 }} />
        <Text
          style={{
            color: palette.black,
            fontSize: appSize.h1,
            fontWeight: 'bold',
            marginBottom: 8,
          }}>
          Nhập địa chỉ email
        </Text>
        <Text style={{ color: palette.black, fontSize: 16 }}>
          Chúng tôi sẽ gửi mã xác thực tới địa chỉ email này
        </Text>
        <View style={{ height: 21 }} />
        <RHFInput
          placeHolder="Email"
          control={control}
          name="email"
          affic={
            <Calendar2
              size={appSize.h1}
              color={palette.primary}
              variant="Outline"
            />
          }
          rules={{
            required: 'Email không được để trống.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email không hợp lệ.',
            },
          }}
        />
        <View style={{ flex: 1 }} />
        <ButtonComponent text="Gửi yêu cầu" onPress={handleSubmit(onSubmit)} />
        <View style={{ height: 16 }} />
      </KeyboardAvoidingView>
    </ContainerComponent>
  );
}
