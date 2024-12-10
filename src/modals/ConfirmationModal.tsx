import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { appInfo } from '../constants/appInfo';
import { palette } from '../constants/palette';
import { appSize } from '../constants/appSize';

interface Props {
  visible?: boolean;
  title?: string;
  onAccept: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal(props: Props) {
  const { visible, title, onAccept, onCancel } = props;

  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      transparent
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: appInfo.sizes.WIDTH * 0.7,
            height: appInfo.sizes.HEIGHT * 0.13,
            backgroundColor: palette.white,
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <View
            style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                textAlign: 'center',
                color: palette.black,
                fontSize: appSize.h4,
                fontWeight: 'bold',
              }}>
              {title}
            </Text>
          </View>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={onCancel}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopWidth: 0.5,
                borderRightWidth: 0.25,
                borderColor: palette.gray4,
              }}>
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                Huỷ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAccept}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopWidth: 0.5,
                borderLeftWidth: 0.25,
                borderColor: palette.gray4,
              }}>
              <Text style={{ color: palette.primary, fontSize: appSize.h4 }}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
