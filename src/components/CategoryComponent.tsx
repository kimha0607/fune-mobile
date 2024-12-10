import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { palette } from '../constants/palette';

interface Props {
  name?: string;
  onPress: () => void;
  selected?: boolean;
}

export default function CategoryComponent(props: Props) {
  const { name, onPress, selected } = props;

  const style: ViewStyle = {
    borderRadius: 999,
    borderWidth: selected ? 2 : 0,
    width: 48,
    height: 48,
    borderColor: selected ? palette.white : 'transparent', // Use 'transparent' instead of null
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
  };

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={{ fontSize: 30 }}>{name}</Text>
    </TouchableOpacity>
  );
}
