import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';
import { appSize } from '../constants/appSize';
import { palette } from '../constants/palette';

interface Props {
  left?: ReactNode;
  title?: string;
  right?: ReactNode;
  white?: boolean;
}

export default function AppBarComponent(props: Props) {
  const { left, title, right, white } = props;

  return (
    <View
      style={{
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ width: 30, height: 30, alignItems: 'center' }}>
        {left}
      </View>
      {title ? (
        <Text
          style={{
            fontSize: appSize.h2,
            color: white ? palette.white : palette.primary,
          }}>
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      <View style={{ width: 30, height: 30, alignItems: 'center' }}>
        {right}
      </View>
    </View>
  );
}
