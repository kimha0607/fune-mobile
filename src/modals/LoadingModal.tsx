import { Text, Modal, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { globalStyle } from '../styles/globalStyle';
import { palette } from '../constants/palette';
import SpaceComponent from '../components/SpaceComponent';

interface Props {
  visible: boolean;
  mess?: string;
}
export default function LoadingModal(props: Props) {
  const { visible, mess } = props;

  return (
    <Modal
      visible={visible}
      style={[globalStyle.container]}
      transparent
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <ActivityIndicator size={'large'} color={palette.primary} />
        <SpaceComponent height={10} />
        <Text style={{ color: palette.primary }}>{mess}</Text>
      </View>
    </Modal>
  );
}
