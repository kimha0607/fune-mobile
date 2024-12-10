import { TextInput, TouchableOpacity, View } from 'react-native';
import React, { ReactNode, useState } from 'react';
import { palette } from '../constants/palette';
import { CloseCircle, Eye, EyeSlash } from 'iconsax-react-native';
import { appSize } from '../constants/appSize';

export interface InputProps {
  value?: string;
  affic?: ReactNode;
  suffic?: ReactNode;
  isPassword?: boolean;
  placeHolder?: string;
  colorPlayerHolder?: string;
  isNumber?: boolean;
  onBlur?: () => void;
  error?: boolean;
  maxLength?: number;
  onChange?: (text: string) => void;
}

export default function InputComponent(props: InputProps) {
  const {
    value = '',
    affic,
    suffic,
    isPassword,
    placeHolder,
    isNumber,
    error,
    colorPlayerHolder,
    maxLength,
    onChange,
    onBlur,
  } = props;

  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderColor: error ? palette.primary : palette.gray4,
      }}>
      {affic && (
        <View
          style={{
            width: 22,
            height: 22,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
          }}>
          {affic}
        </View>
      )}
      <TextInput
        secureTextEntry={isShowPassword}
        placeholder={placeHolder}
        value={value}
        maxLength={maxLength ? maxLength : 100}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholderTextColor={colorPlayerHolder ?? palette.gray}
        keyboardType={isNumber ? 'number-pad' : 'default'}
        autoCapitalize="none"
        style={{
          color: 'black',
          flex: 1,
          marginVertical: 2,
          marginRight: 2,
          fontSize: appSize.h5,
          margin: 0,
          padding: 0,
          paddingVertical: 11,
          fontWeight: 'bold',
        }}
      />
      {suffic ?? suffic}
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onChange && onChange('')
        }>
        {isPassword ? (
          isShowPassword ? (
            <EyeSlash
              color={palette.gray3}
              variant="Outline"
              size={appSize.h1}
            />
          ) : (
            <View
              style={{
                width: 22,
                height: 22,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Eye color={palette.gray3} variant="Outline" size={appSize.h1} />
            </View>
          )
        ) : value?.length > 0 ? (
          <View
            style={{
              width: 22,
              height: 22,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CloseCircle
              color={palette.gray}
              variant="Outline"
              size={appSize.h1}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
