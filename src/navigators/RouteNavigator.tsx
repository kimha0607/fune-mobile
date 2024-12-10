import React, { useEffect, useState } from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../utils/config';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAccessToken,
  selectLoadingSignIn,
} from '../store/slices/auth/selectors';
import {
  addAccessToken,
  removeAccessToken,
  resetLoadingAuth,
} from '../store/slices/auth';
import { getUserInfo } from '../store/slices/user/thunk';
import { AppDispatch } from '../store/store';
import { selectLoadingGetUserInfo } from '../store/slices/user/selectors';
import { resetLoadingUserInfo } from '../store/slices/user';
import SplashScreen from '../screens/splash-screen';

const RouteNavigator = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const accessToken = useSelector(selectAccessToken);
  const loadingSignIn = useSelector(selectLoadingSignIn);
  const loadingGetUserInfo = useSelector(selectLoadingGetUserInfo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeApp = async () => {
      const token = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      if (token) {
        dispatch(addAccessToken(JSON.parse(token)));
      } else {
        dispatch(removeAccessToken());
      }
    };

    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (loadingSignIn === 'fulfilled' && accessToken) {
      AsyncStorage.setItem(
        STORAGE_KEY.ACCESS_TOKEN,
        JSON.stringify(accessToken),
      );
      dispatch(resetLoadingAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingSignIn, accessToken]);

  useEffect(() => {
    if (loadingGetUserInfo === 'fulfilled') {
      dispatch(resetLoadingUserInfo());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingGetUserInfo]);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return accessToken ? <MainNavigator /> : <AuthNavigator />;
};

export default RouteNavigator;
