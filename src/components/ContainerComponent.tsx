import {
  View,
  ScrollView,
  ImageBackground,
  ViewStyle,
  SafeAreaView,
  ImageSourcePropType,
} from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyle } from '../styles/globalStyle';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  imageBackgroundSource?: ImageSourcePropType;
  style?: ViewStyle;
}

export default function ContainerComponent(props: Props) {
  const {
    isImageBackground,
    isScroll,
    children,
    imageBackgroundSource,
    style,
  } = props;

  const returnComponent = isScroll ? (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[globalStyle.container, style]}>{children}</View>
    </ScrollView>
  ) : (
    <View style={[globalStyle.container, style]}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={imageBackgroundSource}
      style={[globalStyle.container, style]}>
      <SafeAreaView style={[globalStyle.container, style]}>
        {returnComponent}
      </SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyle.container, style]}>
      {returnComponent}
    </SafeAreaView>
  );
}
