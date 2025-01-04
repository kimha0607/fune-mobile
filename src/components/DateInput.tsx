import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Calendar } from 'iconsax-react-native';
import { palette } from '../constants/palette';

interface DateInputProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  label = '',
}) => {
  const [open, setOpen] = useState(false);

  const date = value ? new Date(value) : new Date();

  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Calendar size={24} color={palette.primary} style={styles.icon} />
        <Text style={styles.text}>
          {date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={selectedDate => {
          setOpen(false);
          onChange(formatDate(selectedDate));
        }}
        locale="vi"
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: palette.gray2,
    marginBottom: 4,
    marginLeft: 16,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.gray4,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: palette.gray2,
  },
});

export default DateInput;
