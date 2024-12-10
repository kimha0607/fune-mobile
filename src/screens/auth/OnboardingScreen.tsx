import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { palette } from '../../constants/palette';
import { appInfo } from '../../constants/appInfo';
import { appSize } from '../../constants/appSize';
import { STORAGE_KEY } from '../../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '../../types/root-stack-params';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const OnboardingScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const slides: Slide[] = [
    {
      id: 1,
      title: 'Chăm Sóc Sức Khỏe Cho Thú Cưng',
      description:
        'Tìm hiểu về các loại thuốc thông dụng và cách sử dụng để giữ cho thú cưng của bạn luôn khỏe mạnh.',
      image: require('../../assets/images/Onboarding-1.png'),
    },
    {
      id: 2,
      title: 'Các Loại Thuốc Phổ Biến',
      description:
        'Khám phá các loại thuốc phổ biến được sử dụng để điều trị các bệnh thường gặp ở thú cưng.',
      image: require('../../assets/images/Onboarding-2.png'),
    },
    {
      id: 3,
      title: 'Lưu Ý Khi Sử Dụng Thuốc',
      description:
        'Những điều cần lưu ý khi sử dụng thuốc cho thú cưng để đảm bảo an toàn và hiệu quả.',
      image: require('../../assets/images/Onboarding-3.png'),
    },
  ];

  const renderItem = ({ item }: { item: Slide }) => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: palette.white,
      }}>
      <Image
        source={item.image}
        style={{
          width: appInfo.sizes.WIDTH * 0.8,
          height: 400,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          color: palette.title,
          fontSize: appSize.h1,
          fontWeight: 'bold',
        }}>
        {item.title}
      </Text>
      <Text
        style={{
          color: palette.title,
          fontSize: appSize.h4,
          textAlign: 'center',
          paddingTop: 8,
        }}>
        {item.description}
      </Text>
    </View>
  );

  const buttonLabel = (label: string) => (
    <View style={{ padding: 12 }}>
      <Text
        style={{
          color: label === 'Bỏ qua' ? palette.lightGray : palette.title,
          fontSize: appSize.h4,
          fontWeight: 'bold',
        }}>
        {label}
      </Text>
    </View>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      activeDotStyle={{ backgroundColor: palette.primary, width: 30 }}
      showSkipButton
      renderNextButton={() => buttonLabel('Tiếp tục')}
      renderDoneButton={() => buttonLabel('Hoàn thành')}
      renderSkipButton={() => buttonLabel('Bỏ qua')}
      onDone={async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY.ONBOARDING, 'false');
          navigation.navigate('LoginScreen');
        } catch (error) {
          console.error('Error saving onboarding status:', error);
        }
      }}
    />
  );
};

export default OnboardingScreen;
