import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import ContainerComponent from '../../../components/ContainerComponent';
import { LoadingModal } from '../../../modals';
import { palette } from '../../../constants/palette';
import SpaceComponent from '../../../components/SpaceComponent';
import { selectUserInfo } from '../../../store/slices/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { getAppointmentList } from '../../../store/slices/appointment/thunk';
import {
  selectAppointmentList,
  selectLoadingGetAppointmentList,
} from '../../../store/slices/appointment/selectors';
import { convertDateTime, convertToVietnamese } from '../../../utils/helper';

export default function AppointmentScheduleScreen() {
  const userInfo = useSelector(selectUserInfo);
  const appointmentList = useSelector(selectAppointmentList);
  const loadingGetAppointmentList = useSelector(
    selectLoadingGetAppointmentList,
  );

  const dispatch = useDispatch<AppDispatch>();

  const status = (value: string) => {
    if (value === 'confirmed') {
      return 'Đã xác nhận';
    }
    if (value === 'cancelled') {
      return 'Đã hủy';
    }
    return 'Chưa xác nhận';
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getAppointmentList(userInfo?.id));
    }
  }, [userInfo, dispatch]);

  return (
    <ContainerComponent>
      <SpaceComponent height={20} />
      {appointmentList.length === 0 && (
        <Text style={styles.noData}>Không có lịch khám</Text>
      )}
      <FlatList
        data={appointmentList}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <View style={styles.top}>
              <Text style={styles.appointmentTitle}>
                {convertToVietnamese(item.dental_issue)}
              </Text>
              <Text
                style={[
                  styles.appointmentStatus,
                  item.status === 'confirmed' && styles.completed,
                  item.status === 'cancelled' && styles.cancelled,
                  item.status === 'pending' && styles.pending,
                ]}>
                {status(item.status)}
              </Text>
            </View>
            <Text style={styles.appointmentDetails}>
              {convertDateTime(item.appointment_time)}
            </Text>
            <Text style={styles.appointmentDetails}>{item.clinic.address}</Text>
            <Text style={styles.appointmentDetails}>
              Bác sĩ {item.doctor.name}
            </Text>
          </View>
        )}
      />
      <LoadingModal visible={loadingGetAppointmentList === 'pending'} />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  appointmentCard: {
    marginVertical: 10,
    marginHorizontal: 30,
    padding: 16,
    backgroundColor: palette.white,
    borderRadius: 10,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: palette.black,
  },
  appointmentDetails: {
    fontSize: 14,
    color: palette.gray2,
    marginVertical: 4,
  },
  appointmentStatus: {
    fontSize: 14,
    marginTop: 8,
  },
  pending: {
    color: palette.yellow,
  },
  completed: {
    color: palette.green,
  },
  cancelled: {
    color: palette.error,
  },
  noData: {
    fontSize: 16,
    fontWeight: 'bold',
    color: palette.gray2,
    textAlign: 'center',
    marginTop: 20,
  },
});
