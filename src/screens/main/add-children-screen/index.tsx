import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import RHFInput from '../../../hook-form/rhf-input';
import { palette } from '../../../constants/palette';
import { ContainerComponent } from '../../../components';
import { appSize } from '../../../constants/appSize';
import { AttachCircle, User } from 'iconsax-react-native';
import SpaceComponent from '../../../components/SpaceComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import Toast from 'react-native-toast-message';
import { selectUserInfo } from '../../../store/slices/user/selectors';
import LoadingButton from '../../../components/LoadingButton';
import {
  getChildrenList,
  handleAddChild,
} from '../../../store/slices/children/thunk';
import { Dropdown } from 'react-native-element-dropdown';
import { selectLoadingAddChildren } from '../../../store/slices/children/selectors';
import { resetLoadingAddChildren } from '../../../store/slices/children';
import DateInput from '../../../components/DateInput';

const data = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
];

export default function AddChildrenScreen() {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const loadingAddChildren = useSelector(selectLoadingAddChildren);
  const userInfo = useSelector(selectUserInfo);
  const [dob, setDob] = useState('2025-01-01');
  const [gender, setGender] = useState(data[0].value);

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
    if (userInfo && data) {
      dispatch(
        handleAddChild({
          user_id: userInfo.id,
          name: data.name,
          dob: dob,
          gender: gender,
        }),
      );
    }
  };

  useEffect(() => {
    if (loadingAddChildren === 'fulfilled') {
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Thêm thành công',
      });
      dispatch(resetLoadingAddChildren());
    }
    return () => {
      if (userInfo) {
        dispatch(getChildrenList(userInfo?.id));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAddChildren]);

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
          <DateInput
            value={dob}
            onChange={newDate => setDob(newDate)}
            label="Ngày sinh"
          />
          <SpaceComponent height={16} />
          <Dropdown
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={gender}
            onChange={item => {
              setGender(item.value);
            }}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            renderLeftIcon={() => (
              <AttachCircle size={appSize.h1} color={palette.primary} />
            )}
          />
          <SpaceComponent height={16} />
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingButton
        title="Thêm"
        onPress={handleSubmit(onSubmit)}
        isLoading={loadingAddChildren === 'pending'}
        color={palette.primary}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderBottomColor: palette.gray4,
    borderBottomWidth: 0.5,
    borderRadius: 12,
    borderColor: palette.gray4,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    marginLeft: 20,
    fontSize: appSize.h5,
    fontWeight: 'bold',
    color: palette.gray2,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    marginRight: 5,
  },
});
