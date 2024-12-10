import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { palette } from '../../constants/palette';
import RHFInput from '../../hook-form/rhf-input';
import ContainerComponent from '../../components/ContainerComponent';
import { useForm } from 'react-hook-form';
import { CODE400 } from '../../utils/config';
import { Lock1, Sms } from 'iconsax-react-native';
import { appSize } from '../../constants/appSize';
import { useDispatch, useSelector } from 'react-redux';
import SpaceComponent from '../../components/SpaceComponent';
import { handleLogin } from '../../store/slices/auth/thunk';
import { AppDispatch } from '../../store/store';
import { selectLoadingSignIn } from '../../store/slices/auth/selectors';
import { selectErrorList } from '../../store/slices/error/selectors';
import { NavigationProps } from '../../types/root-stack-params';
import LoadingButton from '../../components/LoadingButton';
import { resetError } from '../../store/slices/error';
import Toast from 'react-native-toast-message';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { resetLoadingAuth } from '../../store/slices/auth';

export default function LoginScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const loadingSignIn = useSelector(selectLoadingSignIn);
  const errorList = useSelector(selectErrorList);

  const { control, watch, handleSubmit } = useForm();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 300 }),
      transform: [{ scale: withTiming(opacity.value, { duration: 300 }) }],
    };
  });

  const dispatch = useDispatch<AppDispatch>();

  const openModal = () => {
    setModalVisible(true);
    opacity.value = 1;
  };

  const handleModalClose = () => {
    opacity.value = 0;
    setTimeout(() => setModalVisible(false), 300);
  };

  const handleSignIn = async (data: any) => {
    dispatch(
      handleLogin({
        email: data.email,
        password: data.password,
      }),
    );
  };

  useEffect(() => {
    if (loadingSignIn === 'fulfilled') {
      dispatch(resetLoadingAuth());
    }
    if (loadingSignIn === 'rejected') {
      errorList.forEach(error => {
        const code = CODE400.find(e => e.code === error.code);
        if (code?.code === 'E011') {
          openModal();
        }
        return Toast.show({
          type: 'error',
          text1: 'Lỗi đăng nhập',
          text2: code?.message,
        });
      });
      dispatch(resetError());
      dispatch(resetLoadingAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingSignIn]);

  return (
    <ContainerComponent
      style={{ paddingHorizontal: 8, justifyContent: 'center' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <View style={{ height: 40 }} />
        <Image
          source={require('../../assets/images/logo-single.png')}
          style={{ height: 142, width: '100%', marginBottom: 4 }}
          resizeMode="contain"
        />
        <View style={{ height: 10 }} />
        <Text
          style={{ color: 'black', fontSize: appSize.h1, fontWeight: 'bold' }}>
          Đăng nhập
        </Text>
        <View style={{ height: 21 }} />
        <RHFInput
          placeHolder="Email"
          control={control}
          name="email"
          affic={
            <Sms size={appSize.h1} color={palette.primary} variant="Outline" />
          }
          rules={{
            required: 'Email không được để trống.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email không hợp lệ.',
            },
          }}
        />
        <SpaceComponent height={20} />
        <RHFInput
          name="password"
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
        <SpaceComponent height={19} />
        <Text
          style={{
            fontWeight: '400',
            color: palette.black,
            fontSize: appSize.h5,
            alignSelf: 'flex-end',
          }}
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          Quên mật khẩu?
        </Text>
        <View style={{ flex: 1 }} />

        <LoadingButton
          title="Đăng nhập"
          onPress={handleSubmit(handleSignIn)}
          isLoading={loadingSignIn === 'pending'}
          color={palette.primary}
        />
        <View style={{ height: 16 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: palette.gray, fontSize: appSize.h5 }}>
            Bạn chưa có tài khoản?
          </Text>
          <Text
            style={{
              color: palette.primary,
              marginLeft: 4,
              fontWeight: 'bold',
            }}
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}>
            Đăng ký
          </Text>
        </View>
        <SpaceComponent height={16} />
        {isModalVisible && (
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, animatedStyle]}>
              <Text style={styles.modalTitle}>Email chưa xác minh</Text>
              <Text style={styles.modalMessage}>
                Đi tới trang xác minh email
              </Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.modalCloseButton}
                  onPress={() => handleModalClose()}>
                  <Text style={styles.modalButtonText}>Đóng</Text>
                </Pressable>
                <Pressable
                  style={styles.modalConfirmButton}
                  onPress={() => {
                    handleModalClose();
                    navigation.navigate('OTPScreen', {
                      email: watch('email'),
                      authActionType: 'confirm-email',
                    });
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
    width: 320,
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
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCloseButton: {
    backgroundColor: palette.gray3,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '48%',
    elevation: 2,
  },
  modalConfirmButton: {
    backgroundColor: palette.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '48%',
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
