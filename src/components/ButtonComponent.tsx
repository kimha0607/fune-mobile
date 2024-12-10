import React from 'react';
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { palette } from '../constants/palette';

interface Props {
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  text?: string;
  styleButton?: ViewStyle;
  styleText?: TextStyle;
  disabled?: boolean;
  onPress?: () => void;
}

export default function ButtonComponent(props: Props) {
  const { text, styleButton, styleText, disabled, onPress } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: disabled ? palette.gray : palette.primary,
          paddingVertical: 16,
          borderRadius: 20,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              shadowOffset: { width: 0, height: 2 },
            },
            android: {
              elevation: 8,
            },
          }),
        },
        styleButton,
        disabled && {
          backgroundColor: palette.gray4,
          shadowColor: 'transparent',
          elevation: 0,
        },
      ]}>
      <Text
        style={[
          {
            color: disabled ? palette.gray3 : palette.white,
            fontWeight: 'bold',
            fontSize: 16,
          },
          styleText,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
