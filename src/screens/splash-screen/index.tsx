import React from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { ContainerComponent } from '../../components';
import { appInfo } from '../../constants/appInfo';
import { palette } from '../../constants/palette';

const SplashScreen = () => {
  return (
    <ContainerComponent
      style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../../assets/images/logo-single.png')}
        resizeMode="contain"
        style={{
          width: appInfo.sizes.WIDTH * 0.8,
          height: appInfo.sizes.HEIGHT * 0.2,
          padding: 0,
          margin: 0,
        }}
      />
      <ActivityIndicator size={'small'} color={palette.primary} />
    </ContainerComponent>
  );
};

export default SplashScreen;
