import { Modal, Pressable, Animated, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { palette } from '../constants/palette';
import { appInfo } from '../constants/appInfo';
import { ButtonComponent } from '../components';
import { useNavigation } from '@react-navigation/native';
import SpaceComponent from '../components/SpaceComponent';
import { NavigationProps } from '../types/root-stack-params';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SettingModal(props: Props) {
  const { onClose, visible } = props;
  const transformY = useRef(
    new Animated.Value(appInfo.sizes.HEIGHT * 0.3),
  ).current;
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    if (visible) {
      Animated.spring(transformY, {
        toValue: 0, // Vị trí đích khi mở
        stiffness: 300,
        damping: 28,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => {
    Animated.timing(transformY, {
      toValue: appInfo.sizes.HEIGHT * 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal transparent statusBarTranslucent visible={visible}>
      <Pressable
        onPress={handleClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'flex-end',
        }}>
        <Pressable>
          <Animated.View
            style={[
              {
                width: appInfo.sizes.WIDTH,
                height: appInfo.sizes.HEIGHT * 0.3,
                backgroundColor: palette.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
                shadowColor: palette.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              },
              { transform: [{ translateY: transformY }] },
            ]}>
            <View style={{ flex: 1 }} />
            <ButtonComponent
              text="Chỉnh Sửa Thông Tin"
              onPress={() => {
                handleClose();
                navigation.navigate('ChangeUserInfoScreen');
              }}
            />
            <SpaceComponent height={16} />
            <ButtonComponent
              text="Đổi Mật Khẩu"
              onPress={() => {
                handleClose();
                navigation.navigate('ChangePasswordScreen');
              }}
            />
            <SpaceComponent height={20} />
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
