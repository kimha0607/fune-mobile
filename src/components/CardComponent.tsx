import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { appSize } from '../constants/appSize';
import { palette } from '../constants/palette';
import SpaceComponent from './SpaceComponent';

interface Props {
  title?: string;
  onPress?: () => void;
}

export default function CardComponent(props: Props) {
  const { title, onPress } = props;

  return (
    <View
      style={{
        backgroundColor: palette.white,
        borderRadius: 10,
        marginHorizontal: 20,
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
      }}>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: palette.lightGray,
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: appSize.h3,
              fontWeight: '500',
              color: palette.black,
            }}>
            {title}
          </Text>
        </View>
        <SpaceComponent height={16} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: appSize.h4, color: palette.gray2 }}>PO</Text>
          <Text style={{ fontSize: appSize.h4, color: palette.green }}>
            0 mg to 0 mg
          </Text>
        </View>
        <SpaceComponent height={10} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: appSize.h4, color: palette.gray2 }}>
            q 24 hr
          </Text>
          <Text style={{ fontSize: appSize.h4, color: palette.blue }}>
            1.0 to 4.0 mg/kg
          </Text>
        </View>
        <SpaceComponent height={10} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: appSize.h4, color: palette.gray2 }}>
            <Text>Taper:</Text> None
          </Text>
          <Text style={{ fontSize: appSize.h4, color: palette.gray2 }}>{}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: appSize.h4, color: palette.gray2 }}>
          Antihistaminic
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ fontSize: appSize.h4, color: palette.primary }}>
            Ghi chú
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
