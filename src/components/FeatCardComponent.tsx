import { View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';
import { appInfo } from '../constants/appInfo';
import { palette } from '../constants/palette';
import { appSize } from '../constants/appSize';
import SpaceComponent from './SpaceComponent';

interface Props {
  title?: string;
  affic?: ReactNode;
  onPress?: () => void;
}

export default function FeatCardComponent(props: Props) {
  const { title, affic, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 16,
        backgroundColor: palette.white,
        borderRadius: 10,
        width: appInfo.sizes.WIDTH * 0.8,
        flexDirection: 'row',
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
        marginHorizontal: 8,
      }}>
      {affic && <View style={{ width: 30, height: 30 }}>{affic}</View>}
      <SpaceComponent width={20} />
      <Text
        style={{
          fontSize: appSize.h4,
          color: palette.black,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
      <SpaceComponent width={30} height={30} />
    </TouchableOpacity>
  );
}
