import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import ContainerComponent from '../../../components/ContainerComponent';
import { FeatCardComponent } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingModal } from '../../../modals';
import { palette } from '../../../constants/palette';
import { appInfo } from '../../../constants/appInfo';
import SpaceComponent from '../../../components/SpaceComponent';
import { CalendarEdit, CalendarSearch, AddSquare } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { truncateString } from '../../../utils/helper';
import { NavigationProps } from '../../../types/root-stack-params';
import { selectUserInfo } from '../../../store/slices/user/selectors';
import { getChildrenList } from '../../../store/slices/children/thunk';
import { AppDispatch } from '../../../store/store';
import {
  selectChildrenList,
  selectLoadingGetChildrenList,
} from '../../../store/slices/children/selectors';

const ItemSeparator = () => <SpaceComponent height={16} />;
const ListFooter = () => <SpaceComponent height={16} />;
const ListHeader = () => <SpaceComponent height={16} />;

export default function AppointmentScreen() {
  const navigation = useNavigation<NavigationProps>();

  const userInfo = useSelector(selectUserInfo);
  const childrenList = useSelector(selectChildrenList);
  const loadingGetChildrenList = useSelector(selectLoadingGetChildrenList);

  const data = [
    {
      id: '1',
      title: 'Đặt lịch khám',
      affic: <CalendarEdit size={30} color={palette.primary} variant="Bold" />,
      action: () => {
        navigation.navigate('AppointmentBookingScreen');
      },
    },
    {
      id: '2',
      title: 'Xem lịch của bạn',
      affic: (
        <CalendarSearch size={30} color={palette.primary} variant="Bold" />
      ),
      action: () => {
        navigation.navigate('AppointmentScheduleScreen');
      },
    },
  ];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userInfo) {
      dispatch(getChildrenList(userInfo?.id));
    }
  }, [userInfo, dispatch]);

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
            {childrenList.length > 0 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: palette.black, fontWeight: 'bold' }}>
                    Họ và tên con
                  </Text>
                  <Text style={{ color: palette.black }}>
                    {truncateString(childrenList[0].name, 25)}
                  </Text>
                </View>
                <SpaceComponent height={8} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: palette.black, fontWeight: 'bold' }}>
                    Ngày sinh
                  </Text>
                  <Text style={{ color: palette.black }}>
                    {truncateString(childrenList[0].dob, 25)}
                  </Text>
                </View>
                <SpaceComponent height={8} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: palette.black, fontWeight: 'bold' }}>
                    Giới tính
                  </Text>
                  <Text style={{ color: palette.black }}>
                    {truncateString(
                      childrenList[0].gender === 'male' ? 'Nam' : 'Nữ',
                      25,
                    )}
                  </Text>
                </View>
              </>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
                onPress={() => navigation.navigate('AddChildScreen')}>
                <AddSquare size={30} color={palette.primary} variant="Bold" />
                <Text
                  style={{
                    color: palette.primary,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Thêm thông tin con
                </Text>
              </TouchableOpacity>
            )}
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
        <LoadingModal visible={loadingGetChildrenList === 'pending'} />
      </View>
    </ContainerComponent>
  );
}
