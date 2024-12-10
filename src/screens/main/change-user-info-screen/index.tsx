import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import RHFInput from '../../../hook-form/rhf-input';
import { palette } from '../../../constants/palette';
import { ContainerComponent } from '../../../components';
import { appSize } from '../../../constants/appSize';
import { Call, Map, User } from 'iconsax-react-native';
import SpaceComponent from '../../../components/SpaceComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { selectErrorList } from '../../../store/slices/error/selectors';
import { CODE400, FIELD_TRANSLATIONS } from '../../../utils/config';
import Toast from 'react-native-toast-message';
import {
  selectLoadingChangeUserInfo,
  selectUserInfo,
} from '../../../store/slices/user/selectors';
import {
  getUserInfo,
  handleChangeUserInfo,
} from '../../../store/slices/user/thunk';
import { resetLoadingChangeUserInfo } from '../../../store/slices/user';
import LoadingButton from '../../../components/LoadingButton';
import { splitFullName } from '../../../utils/helper';

export default function ChangeUserInfo() {
  const { control, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const loadingChangeUserInfo = useSelector(selectLoadingChangeUserInfo);
  const errorList = useSelector(selectErrorList);
  const userInfo = useSelector(selectUserInfo);

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

  const validatePhoneNumber = (value: string) => {
    const regex = /^(?:\+84|84|0)(?:[3-9][0-9]{8})$/;
    return regex.test(value) || 'Số điện thoại không hợp lệ.';
  };

  const onSubmit = (data: any) => {
    const { firstName, lastName } = splitFullName(data.fullName || '');

    dispatch(
      handleChangeUserInfo({
        phoneNumber: data.phoneNumber,
        email: userInfo?.username || '',
        firstName: firstName,
        lastName: lastName,
        address: data.address,
        description: '',
      }),
    );
  };

  useEffect(() => {
    if (userInfo) {
      setValue('fullName', userInfo.lastName + ' ' + userInfo.firstName);
      setValue('phoneNumber', userInfo.phoneNumber);
      setValue('address', userInfo.address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (loadingChangeUserInfo === 'fulfilled') {
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Thay đổi thông tin thành công',
      });
      dispatch(getUserInfo());
      dispatch(resetLoadingChangeUserInfo());
    }
    if (loadingChangeUserInfo === 'rejected') {
      errorList.forEach(error => {
        const foundMessage = CODE400.find(e => e.code === error.code)?.message;
        const foundObj = FIELD_TRANSLATIONS.find(
          e => e.fieldName === error.values,
        )?.translation;

        return Toast.show({
          type: 'error',
          text1: 'Thay đổi không thành công',
          text2: foundObj + ' ' + foundMessage,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingChangeUserInfo]);

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
          <SpaceComponent height={21} />
          <RHFInput
            placeHolder="Họ và tên"
            control={control}
            name="fullName"
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
            placeHolder="Số điện thoại"
            control={control}
            name="phoneNumber"
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
              validate: validatePhoneNumber,
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
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingButton
        title="Thay đổi"
        onPress={handleSubmit(onSubmit)}
        isLoading={loadingChangeUserInfo === 'pending'}
        color={palette.primary}
      />
    </ContainerComponent>
  );
}
