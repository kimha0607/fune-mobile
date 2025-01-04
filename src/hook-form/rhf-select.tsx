import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import { palette } from '../constants/palette';

interface SelectItem {
  label: string;
  value: any;
}

interface Props {
  name: string;
  control: Control<FieldValues> | undefined;
  rules?: {};
  placeHolder?: string;
  items: SelectItem[];
}

export default function RHFSelect(props: Props) {
  const { name, control, rules, placeHolder, items } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <RNPickerSelect
            onValueChange={onChange}
            value={value}
            items={items}
            placeholder={{
              label: placeHolder || 'Chọn một giá trị',
              value: null,
            }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              placeholder: styles.placeholder,
            }}
          />
          {error && (
            <Text style={styles.errorText}>{error.message || 'Error'}</Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    color: palette.black,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: palette.gray,
    borderRadius: 4,
    backgroundColor: palette.white,
  },
  placeholder: {
    color: palette.gray,
    fontSize: 16,
  },
  errorText: {
    color: palette.error,
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
