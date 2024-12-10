import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { OtpInput } from 'react-native-otp-entry';
import { Calendar2 } from 'iconsax-react-native';

import RHFInput from '../../hook-form/rhf-input';
import {
  selectLoadingSendOtp,
  selectLoadingVerifyOtp,
} from '../../store/slices/auth/selectors';
import { AppDispatch } from '../../store/store';
import { handleSendOtp, handleVerifyOtp } from '../../store/slices/auth/thunk';
import { palette } from '../../constants/palette';
import LoadingButton from '../../components/LoadingButton';
import SpaceComponent from '../../components/SpaceComponent';
import { ContainerComponent } from '../../components';
import { appSize } from '../../constants/appSize';
import { appInfo } from '../../constants/appInfo';
import {
  NavigationProps,
  OTPScreenRouteProp,
} from '../../types/root-stack-params';
import { useNavigation } from '@react-navigation/native';
import { CODE400 } from '../../utils/config';
import Toast from 'react-native-toast-message';
import { resetError } from '../../store/slices/error';
import { selectErrorList } from '../../store/slices/error/selectors';
import {
  resetLoadingSendOtp,
  resetLoadingVerifyOtp,
} from '../../store/slices/auth';

type Props = {
  route: OTPScreenRouteProp;
};

export default function OTPScreen({ route }: Props) {
  const { email, authActionType } = route?.params;
  const [otp, setOtp] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const loadingSendOtp = useSelector(selectLoadingSendOtp);
  const loadingVerifyOtp = useSelector(selectLoadingVerifyOtp);
  const errorList = useSelector(selectErrorList);

  const { control, handleSubmit } = useForm();
  const opacity = useSharedValue(0);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch<AppDispatch>();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 300 }),
    transform: [{ scale: withTiming(opacity.value, { duration: 300 }) }],
  }));

  const sendOtp = (emailUser: string) => {
    if (authActionType === 'confirm-email') {
      dispatch(
        handleSendOtp({
          email: emailUser,
          type: 1,
        }),
      );
    } else if (authActionType === 'forgot-password') {
      dispatch(
        handleSendOtp({
          email: emailUser,
          type: 2,
        }),
      );
    }
  };

  const verifyOtp = async () => {
    if (authActionType === 'confirm-email') {
      dispatch(handleVerifyOtp({ email, otp, type: 1 }));
    } else if (authActionType === 'forgot-password') {
      dispatch(handleVerifyOtp({ email, otp, type: 2 }));
    }
  };

  const closeModal = () => {
    opacity.value = 0;
    setTimeout(() => setModalVisible(false), 300);
  };

  const resendOtp = () => {
    if (!email) {
      setModalVisible(true);
      opacity.value = 1;
    } else {
      sendOtp(email);
    }
  };

  const handleSubmitOtp = (data: any) => {
    sendOtp(data.email);
    closeModal();
  };

  useEffect(() => {
    if (email) {
      sendOtp(email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadingSendOtp === 'fulfilled') {
      Toast.show({
        type: 'success',
        text1: 'Đã gửi mã xác thực',
      });
      dispatch(resetLoadingSendOtp());
    }
    if (loadingSendOtp === 'rejected') {
      errorList.forEach(error => {
        const code = CODE400.find(e => e.code === error.code);
        return Toast.show({
          type: 'error',
          text1: 'Lỗi gửi mã xác thực',
          text2: code?.message,
        });
      });
      dispatch(resetError());
      dispatch(resetLoadingSendOtp());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingSendOtp]);

  useEffect(() => {
    if (loadingVerifyOtp === 'fulfilled') {
      if (authActionType === 'confirm-email') {
        Toast.show({
          type: 'success',
          text1: 'Xác thực thành công',
        });
      } else if (authActionType === 'forgot-password') {
        Toast.show({
          type: 'success',
          text1: 'Xác thực thành công',
          text2: 'Hãy kiểm tra email',
        });
      }
      navigation.navigate('LoginScreen');
      dispatch(resetLoadingVerifyOtp());
    }
    if (loadingVerifyOtp === 'rejected') {
      errorList.forEach(error => {
        const code = CODE400.find(e => e.code === error.code);
        return Toast.show({
          type: 'error',
          text1: 'Lỗi xác thực',
          text2: code?.message,
        });
      });
      dispatch(resetError());
      dispatch(resetLoadingVerifyOtp());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingVerifyOtp]);

  return (
    <ContainerComponent style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Image
          source={require('../../assets/images/logo-single.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Nhập Mã Xác Minh</Text>

        <Text style={styles.description}>Chúng tôi đã gửi một mã xác minh</Text>
        <Text style={styles.description}>
          tới địa chỉ email {email || ''} của bạn.
        </Text>

        <View style={styles.otpInputContainer}>
          <OtpInput
            numberOfDigits={6}
            onTextChange={setOtp}
            focusColor={palette.gray2}
            focusStickBlinkingDuration={400}
            theme={otpInputTheme}
          />
        </View>
        <View style={styles.resendContainer}>
          <Text style={styles.grayText}>Bạn chưa nhận được mã xác minh?</Text>
          {loadingSendOtp === 'pending' ? (
            <ActivityIndicator size="small" color={palette.primary} />
          ) : (
            <Text style={styles.resendText} onPress={resendOtp}>
              Gửi lại
            </Text>
          )}
        </View>
        <SpaceComponent height={10} />
        <View style={styles.resendContainer}>
          <Text style={styles.grayText}>Trở về màn hình</Text>
          <Text
            style={styles.backToLogin}
            onPress={() => navigation.navigate('LoginScreen')}>
            đăng nhập
          </Text>
        </View>
        <View style={styles.flexFill} />
        <LoadingButton
          title="GỬI YÊU CẦU"
          onPress={verifyOtp}
          buttonStyle={styles.submitButton}
          disabled={otp.length < 6}
          isLoading={loadingVerifyOtp === 'pending'}
          color={palette.primary}
        />
        <SpaceComponent height={16} />
        {isModalVisible && (
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContent, animatedStyle]}>
              <Text style={styles.modalMessage}>
                Vui lòng nhập lại địa chỉ email
              </Text>
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
                rules={emailValidationRules}
              />
              <SpaceComponent height={16} />
              <View style={styles.modalButtons}>
                <Pressable style={styles.modalCloseButton} onPress={closeModal}>
                  <Text style={styles.modalButtonText}>Đóng</Text>
                </Pressable>
                <Pressable
                  style={styles.modalConfirmButton}
                  onPress={handleSubmit(handleSubmitOtp)}>
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

const otpInputTheme = {
  pinCodeContainerStyle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.white,
  },
  pinCodeTextStyle: {
    fontSize: 18,
  },
};

const emailValidationRules = {
  required: 'Email không được để trống.',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Email không hợp lệ.',
  },
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  logo: {
    width: appInfo.sizes.WIDTH * 0.8,
    height: appInfo.sizes.HEIGHT * 0.2,
  },
  title: {
    marginBottom: 8,
    fontSize: appSize.h1,
    color: palette.black,
    fontWeight: 'bold',
  },
  description: {
    fontSize: appSize.h4,
    color: palette.black,
  },
  otpInputContainer: {
    marginVertical: 22,
    width: appInfo.sizes.WIDTH * 0.8,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayText: {
    color: palette.gray,
    fontSize: appSize.h5,
    marginRight: 5,
  },
  resendText: {
    color: palette.primary,
    fontWeight: 'bold',
    fontSize: appSize.h5,
  },
  backToLogin: {
    color: palette.primary,
    fontSize: appSize.h5,
  },
  flexFill: {
    flex: 1,
  },
  submitButton: {
    width: appInfo.sizes.WIDTH * 0.8,
  },
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
  modalMessage: {
    fontSize: 18,
    fontWeight: '500',
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
