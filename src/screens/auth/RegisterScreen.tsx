import React, { useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import RHFInput from '../../hook-form/rhf-input';
import { palette } from '../../constants/palette';
import { ContainerComponent } from '../../components';
import { appSize } from '../../constants/appSize';
import { Calendar2, Call, Lock1, Map, User } from 'iconsax-react-native';
import SpaceComponent from '../../components/SpaceComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { handleRegister } from '../../store/slices/auth/thunk';
import { selectLoadingRegister } from '../../store/slices/auth/selectors';
import Toast from 'react-native-toast-message';
import LoadingButton from '../../components/LoadingButton';
import { NavigationProps } from '../../types/root-stack-params';
import { useNavigation } from '@react-navigation/native';
import { resetLoadingAuth } from '../../store/slices/auth';

export default function RegisterScreen() {
  const { control, handleSubmit, watch } = useForm();
  const navigation = useNavigation<NavigationProps>();
  const loadingRegister = useSelector(selectLoadingRegister);

  const dispatch = useDispatch<AppDispatch>();

  const validateFullName = (value: string) => {
    if (!value) {
      return 'Họ và tên không được để trống.';
    }
    const nameParts = value.trim().split(/\s+/);
    if (nameParts.length < 2) {
      return 'Họ và tên phải có ít nhất hai từ.';
    }
    return true;
  };

  const onSubmit = (data: any) => {
    dispatch(
      handleRegister({
        password: data.password,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
      }),
    );
  };

  useEffect(() => {
    if (loadingRegister === 'fulfilled') {
      navigation.navigate('LoginScreen');
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Đăng ký thành công',
      });
      dispatch(resetLoadingAuth());
    }
    if (loadingRegister === 'rejected') {
      dispatch(resetLoadingAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingRegister]);

  return (
    <ContainerComponent style={{ paddingHorizontal: 8, flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Image
            source={require('../../assets/images/logo-single.png')}
            style={{ height: 142, width: '100%', marginBottom: 4 }}
            resizeMode="contain"
          />
          <SpaceComponent height={21} />
          <RHFInput
            placeHolder="Họ và tên"
            control={control}
            name="name"
            affic={
              <User
                size={appSize.h1}
                color={palette.primary}
                variant="Outline"
              />
            }
            rules={{
              required: 'Họ và tên không được để trống.',
              validate: validateFullName,
            }}
          />
          <SpaceComponent height={16} />
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
          <SpaceComponent height={16} />
          <RHFInput
            placeHolder="Số điện thoại"
            control={control}
            name="phone"
            affic={
              <Call
                size={appSize.h1}
                color={palette.primary}
                variant="Outline"
              />
            }
            isNumber
            maxLength={10}
            rules={{
              required: 'Số điện thoại không được để trống.',
            }}
          />
          <SpaceComponent height={16} />
          <RHFInput
            placeHolder="Địa chỉ"
            control={control}
            name="address"
            affic={
              <Map
                size={appSize.h1}
                color={palette.primary}
                variant="Outline"
              />
            }
            rules={{
              required: 'Địa chỉ không được để trống.',
            }}
          />
          <SpaceComponent height={16} />
          <RHFInput
            placeHolder="Mật khẩu"
            control={control}
            maxLength={32}
            name="password"
            affic={
              <Lock1
                size={appSize.h1}
                color={palette.primary}
                variant="Outline"
              />
            }
            rules={{
              required: 'Mật khẩu không được để trống.',
              minLength: {
                value: 8,
                message: 'Mật khẩu phải có từ 8 ký tự trở lên.',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  'Mật khẩu phải có ít nhất 1 chữ viết hoa, 1 chữ viết thường, 1 ký tự đặc biệt và 1 số.',
              },
            }}
            isPassword
          />
          <SpaceComponent height={16} />
          <RHFInput
            placeHolder="Nhập lại mật khẩu"
            control={control}
            name="confirmPassword"
            maxLength={32}
            affic={
              <Lock1
                size={appSize.h1}
                color={palette.primary}
                variant="Outline"
              />
            }
            rules={{
              required: 'Nhập lại mật khẩu không được để trống.',
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return 'Nhập lại mật khẩu không khớp.';
                }
              },
            }}
            isPassword
          />
          <SpaceComponent height={16} />
          <View style={{ flex: 1 }} />
          <LoadingButton
            title="Đăng ký"
            onPress={handleSubmit(onSubmit)}
            isLoading={loadingRegister === 'pending'}
            color={palette.primary}
          />
          <SpaceComponent height={16} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ContainerComponent>
  );
}
