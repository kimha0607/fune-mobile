import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { palette } from '../constants/palette';

interface LoadingButtonProps {
  onPress?: () => void;
  isLoading?: boolean;
  title: string;
  buttonStyle?: object;
  textStyle?: object;
  loadingColor?: string;
  outline?: boolean;
  color?: string;
  disabled?: boolean;
  backgroundColor?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  onPress,
  isLoading,
  title,
  buttonStyle,
  textStyle,
  loadingColor = '#fff',
  outline = false,
  disabled = false,
  color = '#007bff',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        outline && {
          borderColor: color,
          borderWidth: 1,
          backgroundColor: 'transparent',
        },
        !outline && { backgroundColor: disabled ? palette.gray6 : color },
      ]}
      onPress={onPress}
      disabled={isLoading || disabled}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={outline ? color : loadingColor}
        />
      ) : (
        <Text
          style={[
            styles.text,
            textStyle,
            outline && { color: color },
            !outline && { color: disabled ? palette.gray3 : '#fff' },
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoadingButton;
