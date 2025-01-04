import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Clock } from 'iconsax-react-native'; // Icon for time
import { palette } from '../constants/palette';

interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  label = '',
}) => {
  const [open, setOpen] = useState(false);

  const time = value ? new Date(`2025-01-01T${value}`) : new Date();

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Clock size={24} color={palette.primary} style={styles.icon} />
        <Text style={styles.text}>{formatTime(time)}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={time}
        mode="time"
        onConfirm={selectedTime => {
          setOpen(false);
          onChange(formatTime(selectedTime));
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

export default TimeInput;
