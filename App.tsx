import { Alert, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import RouteNavigator from './src/navigators/RouteNavigator';
import Toast from 'react-native-toast-message';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import SplashScreen from './src/screens/splash-screen';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  const renderContent = () => {
    if (isShowSplash) {
      return <SplashScreen />;
    }

    return (
      <>
        <NavigationContainer>
          <RouteNavigator />
        </NavigationContainer>
        <Toast topOffset={60} />
      </>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (!state.isConnected) {
        Alert.alert(
          'Dữ liệu di động đã bị tắt',
          'Bật hoặc sử dụng Wi-Fi để truy cập dữ liệu.',
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <Provider store={store}>{renderContent()}</Provider>
    </>
  );
};

export default App;
