import { Text } from 'react-native';
import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import InputComponent, { InputProps } from '../components/InputComponent';
import { palette } from '../constants/palette';

interface Props extends InputProps {
  name: string;
  control: Control<FieldValues> | undefined;
  rules?: {};
  placeHolder?: string;
}

export default function RHFInput(props: Props) {
  const { name, control, rules, placeHolder, ...other } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <InputComponent
            placeHolder={placeHolder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!error}
            {...other}
          />
          {error && (
            <Text
              style={{
                color: palette.error,
                marginTop: 6,
                alignSelf: 'stretch',
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
}
