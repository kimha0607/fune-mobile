import { Text, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { Category } from 'iconsax-react-native';
import { appSize } from '../constants/appSize';
import { palette } from '../constants/palette';
import SpaceComponent from './SpaceComponent';

interface Props {
  isSectionTitle?: boolean;
  title?: string;
  isLoading?: boolean;
  onPress?: () => void;
}

export default function ItemComponent(props: Props) {
  const { isSectionTitle, title, isLoading, onPress } = props;

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: palette.white,
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 15,
        shadowOpacity: 0.05,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 10,
        elevation: 5,
        marginVertical: 6,
      }}
      onPress={onPress}>
      <Category
        size={appSize.h4}
        color={isSectionTitle ? palette.black : palette.gray2}
      />
      <SpaceComponent width={8} />
      <Text
        style={{
          fontSize: isSectionTitle ? appSize.h4 : appSize.h5,
          color: isSectionTitle ? palette.black : palette.gray2,
          textTransform: isSectionTitle ? 'uppercase' : 'none',
        }}>
        {title}
      </Text>
      {isLoading && (
        <>
          <SpaceComponent width={8} />
          <ActivityIndicator size={'small'} color={palette.primary} />
        </>
      )}
    </Pressable>
  );
}
