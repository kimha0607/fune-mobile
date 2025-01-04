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
import { convertDateTime } from '../../../utils/helper';

export default function AppointmentScreen() {
  const userInfo = useSelector(selectUserInfo);
  const appointmentList = useSelector(selectAppointmentList);
  const loadingGetAppointmentList = useSelector(
    selectLoadingGetAppointmentList,
  );

  const dispatch = useDispatch<AppDispatch>();

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
            <Text style={styles.appointmentTitle}>
              {convertDateTime(item.appointment_time)}
            </Text>
            <Text style={styles.appointmentDetails}>{item.clinic.address}</Text>
            <Text style={styles.appointmentDetails}>
              Bác sĩ {item.doctor.name}
            </Text>
            <Text
              style={[
                styles.appointmentStatus,
                item.status === 'Completed' && styles.completed,
                item.status === 'Cancelled' && styles.cancelled,
                item.status === 'pending' && styles.pending,
              ]}>
              {item.status}
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
