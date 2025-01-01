import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import RHFInput from '../../../hook-form/rhf-input';
import { Lock1 } from 'iconsax-react-native';
import { appSize } from '../../../constants/appSize';
import { palette } from '../../../constants/palette';
import { ContainerComponent } from '../../../components';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { STORAGE_KEY } from '../../../utils/config';
import SpaceComponent from '../../../components/SpaceComponent';
import { removeAccessToken } from '../../../store/slices/auth';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppDispatch } from '../../../store/store';
import { handleChangePassword } from '../../../store/slices/user/thunk';
import { selectLoadingChangeUserPassword } from '../../../store/slices/user/selectors';
import { resetLoadingChangeUserPassword } from '../../../store/slices/user';
import LoadingButton from '../../../components/LoadingButton';

const containerStyle: ViewStyle = { paddingHorizontal: 8 };

export default function ChangePasswordScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const opacity = useSharedValue(0);
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, watch } = useForm();
  const loadingChangeUserPassword = useSelector(
    selectLoadingChangeUserPassword,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 300 }),
      transform: [{ scale: withTiming(opacity.value, { duration: 300 }) }],
    };
  });

  const { removeItem } = useAsyncStorage(STORAGE_KEY.ACCESS_TOKEN);

  const handleModalClose = async () => {
    opacity.value = 0;
    setModalVisible(false);
    await removeItem();
    dispatch(removeAccessToken());
  };

  const onSubmit = async (data: any) => {
    const { currentPassword, newPassword } = data;
    const payload = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    try {
      dispatch(handleChangePassword(payload));
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    if (loadingChangeUserPassword === 'fulfilled') {
      setModalVisible(true);
      opacity.value = 1;
      dispatch(resetLoadingChangeUserPassword());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingChangeUserPassword]);

  return (
    <ContainerComponent style={containerStyle}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <View style={{ height: 40 }} />
        <Image
          source={require('../../../assets/images/logo-single.png')}
          style={{ height: 142, width: '100%', marginBottom: 4 }}
          resizeMode="contain"
        />
        <View style={{ height: 21 }} />
        <RHFInput
          name="currentPassword"
          control={control}
          isPassword
          maxLength={32}
          placeHolder="Mật khẩu"
          affic={
            <Lock1
              size={appSize.h1}
              color={palette.primary}
              variant="Outline"
            />
          }
          rules={{
            required: 'Mật khẩu không được để trống.',
          }}
        />
        <View style={{ height: 20 }} />
        <RHFInput
          name="newPassword"
          control={control}
          isPassword
          maxLength={32}
          placeHolder="Mật khẩu mới"
          affic={
            <Lock1
              size={appSize.h1}
              color={palette.primary}
              variant="Outline"
            />
          }
          rules={{
            required: 'Mật khẩu mới không được để trống.',
            minLength: {
              value: 8,
              message: 'Mật khẩu mới phải có từ 8 ký tự trở lên.',
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message:
                'Mật khẩu phải có ít nhất 1 chữ viết hoa, 1 chữ viết thường, 1 ký tự đặc biệt và 1 số.',
            },
          }}
        />
        <View style={{ height: 20 }} />
        <RHFInput
          name="confirmPassword"
          control={control}
          isPassword
          maxLength={32}
          placeHolder="Nhập lại mật khẩu mới"
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
              if (watch('newPassword') !== val) {
                return 'Nhập lại mật khẩu không khớp.';
              }
            },
          }}
        />
        <View style={{ flex: 1 }} />
        <LoadingButton
          title="Đổi Mật Khẩu"
          onPress={handleSubmit(onSubmit)}
          isLoading={loadingChangeUserPassword === 'pending'}
          color={palette.primary}
        />
        <SpaceComponent height={16} />
        {isModalVisible && (
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, animatedStyle]}>
              <Text style={styles.modalTitle}>Đổi mật khẩu thành công</Text>
              <Text style={styles.modalMessage}>Vui lòng đăng nhập lại</Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.modalConfirmButton}
                  onPress={() => {
                    handleModalClose();
                  }}>
                  <Text style={styles.modalButtonText}>Ok</Text>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 260,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    justifyContent: 'center',
    width: '100%',
  },
  modalConfirmButton: {
    backgroundColor: palette.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '50%',
    alignSelf: 'center',
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
