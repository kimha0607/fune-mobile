import { FlatList, Text, View } from 'react-native';
import React, { useState } from 'react';
import ContainerComponent from '../../../components/ContainerComponent';
import { FeatCardComponent } from '../../../components';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../../../utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmationModal, LoadingModal } from '../../../modals';
import { palette } from '../../../constants/palette';
import { appInfo } from '../../../constants/appInfo';
import SpaceComponent from '../../../components/SpaceComponent';
import {
  DirectRight,
  Heart,
  LogoutCurve,
  ShieldSecurity,
} from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { handleOpenZalo, truncateString } from '../../../utils/helper';
import { NavigationProps } from '../../../types/root-stack-params';
import { selectUserInfo } from '../../../store/slices/user/selectors';
import { removeAccessToken } from '../../../store/slices/auth';

const ItemSeparator = () => <SpaceComponent height={16} />;
const ListFooter = () => <SpaceComponent height={16} />;
const ListHeader = () => <SpaceComponent height={16} />;

export default function UserScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const userInfo = useSelector(selectUserInfo);
  const data = [
    {
      id: '1',
      title: 'Thay đổi thông tin',
      affic: <Heart size={30} color={palette.primary} variant="Bold" />,
      action: () => {
        navigation.navigate('ChangeUserInfoScreen');
      },
    },
    {
      id: '2',
      title: 'Đổi mật khẩu',
      affic: (
        <ShieldSecurity size={30} color={palette.primary} variant="Bold" />
      ),
      action: () => {
        navigation.navigate('ChangePasswordScreen');
      },
    },
    {
      id: '3',
      title: 'Liên Hệ Với Chúng Tôi',
      affic: <DirectRight size={30} color={palette.primary} variant="Bold" />,
      action: () => {
        handleOpenZalo(process.env.CONTACT_PHONE_NUMBER || '');
      },
    },
    {
      id: '6',
      title: 'Đăng Xuất',
      affic: <LogoutCurve size={30} color={palette.primary} variant="Bold" />,
      action: () => {
        setIsConfirmationModal(true);
      },
    },
  ];

  const { removeItem } = useAsyncStorage(STORAGE_KEY.ACCESS_TOKEN);

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await removeItem();
      dispatch(removeAccessToken());
    } catch (error) {
      console.error('error', error);
    }
    setIsLoading(false);
  };

  return (
    <ContainerComponent>
      <View style={{ flex: 1, backgroundColor: '#FAFBFF' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <SpaceComponent height={20} />
          <View
            style={{
              width: appInfo.sizes.WIDTH * 0.8,
              padding: 16,
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
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: palette.black, fontWeight: 'bold' }}>
                Họ và tên
              </Text>
              <Text style={{ color: palette.black }}>
                {truncateString(
                  userInfo?.lastName + ' ' + userInfo?.firstName,
                  25,
                )}
              </Text>
            </View>
            <SpaceComponent height={8} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: palette.black, fontWeight: 'bold' }}>
                Email
              </Text>
              <Text style={{ color: palette.black }}>
                {truncateString(userInfo?.username || '', 25)}
              </Text>
            </View>
            <SpaceComponent height={8} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: palette.black, fontWeight: 'bold' }}>
                Số điện thoại
              </Text>
              <Text style={{ color: palette.black }}>
                {truncateString(userInfo?.phoneNumber || '', 25)}
              </Text>
            </View>
            <SpaceComponent height={8} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: palette.black, fontWeight: 'bold' }}>
                Địa chỉ
              </Text>
              <Text style={{ color: palette.black }}>
                {truncateString(userInfo?.address || '', 25)}
              </Text>
            </View>
          </View>
          <SpaceComponent height={16} />
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <FeatCardComponent
                title={item.title}
                affic={item.affic}
                onPress={item.action}
              />
            )}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={item => item.id}
            ListFooterComponent={ListFooter}
            ListHeaderComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
          <SpaceComponent height={16} />
        </View>
        <ConfirmationModal
          visible={isConfirmationModal}
          onAccept={handleLogOut}
          onCancel={() => setIsConfirmationModal(false)}
          title="Bạn có muốn đăng xuất không?"
        />
        <LoadingModal visible={isLoading} />
      </View>
    </ContainerComponent>
  );
}
