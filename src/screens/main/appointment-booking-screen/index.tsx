import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { palette } from '../../../constants/palette';
import { ContainerComponent } from '../../../components';
import { appSize } from '../../../constants/appSize';
import { CardEdit, UserOctagon } from 'iconsax-react-native';
import SpaceComponent from '../../../components/SpaceComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import Toast from 'react-native-toast-message';
import { selectUserInfo } from '../../../store/slices/user/selectors';
import LoadingButton from '../../../components/LoadingButton';
import { getChildrenList } from '../../../store/slices/children/thunk';
import { Dropdown } from 'react-native-element-dropdown';
import DateInput from '../../../components/DateInput';
import TimeInput from '../../../components/TimeInput';
import { handleAppointmentBooking } from '../../../store/slices/appointment/thunk';
import { selectLoadingAppointmentBooking } from '../../../store/slices/appointment/selectors';
import { resetLoadingAppointmentBooking } from '../../../store/slices/appointment';
import { fetchDoctorInfo } from '../../../axios/user/api';
import { filterDoctors } from '../../../utils/helper';

const dataDentalIssue = [
  {
    value: 'caries',
    label: 'Sâu răng',
  },
  {
    value: 'wisdom_tooth',
    label: 'Khám răng khôn',
  },
  {
    value: 'tartar',
    label: 'Lấy cao răng',
  },
  {
    value: 'teeth_whitening',
    label: 'Tẩy trắng răng',
  },
  {
    value: 'orthodontics',
    label: 'Niềng răng',
  },
  {
    value: 'extraction',
    label: 'Nhổ răng',
  },
  {
    value: 'checkup',
    label: 'Khám tổng quát',
  },
];

export default function AppointmentBookingScreen() {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const loadingAppointmentBooking = useSelector(
    selectLoadingAppointmentBooking,
  );
  const userInfo = useSelector(selectUserInfo);
  const [date, setDate] = useState('2025-01-01');
  const [time, setTime] = useState('08:45:00');
  const [dentalIssue, setDentalIssue] = useState('');
  const [doctor, setDoctor] = useState('');
  const [dataDoctor, setDataDoctor] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const onSubmit = () => {
    if (userInfo) {
      dispatch(
        handleAppointmentBooking({
          clinic_id: 1,
          doctor_id: +doctor,
          patient_id: userInfo.id,
          appointment_time: `${date} ${time}`,
          dental_issue: dentalIssue,
        }),
      );
    }
  };

  useEffect(() => {
    const getDoctorInfo = async () => {
      const res = await fetchDoctorInfo();
      if (!res || !res.data) {
        throw new Error('Network Error!');
      }
      const data = filterDoctors(res?.data.data.data);
      if (data) {
        setDataDoctor(data);
      }
    };
    getDoctorInfo();
  }, []);

  useEffect(() => {
    if (loadingAppointmentBooking === 'fulfilled') {
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Thêm thành công',
      });
      dispatch(resetLoadingAppointmentBooking());
    }
    return () => {
      if (userInfo) {
        dispatch(getChildrenList(userInfo?.id));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAppointmentBooking]);

  return (
    <ContainerComponent style={{ paddingHorizontal: 8, flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <SpaceComponent height={21} />
          <TimeInput value={time} onChange={newTime => setTime(newTime)} />
          <DateInput value={date} onChange={newDate => setDate(newDate)} />
          <SpaceComponent height={16} />
          <Dropdown
            data={dataDoctor}
            labelField="label"
            valueField="value"
            placeholder="Chọn bác sĩ"
            value={doctor}
            onChange={item => {
              setDoctor(item.value);
            }}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            renderLeftIcon={() => (
              <UserOctagon size={appSize.h1} color={palette.primary} />
            )}
          />
          <SpaceComponent height={16} />

          <Dropdown
            data={dataDentalIssue}
            labelField="label"
            valueField="value"
            placeholder="Chọn dịch vụ"
            value={dentalIssue}
            onChange={item => {
              setDentalIssue(item.value);
            }}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            renderLeftIcon={() => (
              <CardEdit size={appSize.h1} color={palette.primary} />
            )}
          />
          <SpaceComponent height={16} />
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingButton
        title="Thêm"
        onPress={handleSubmit(onSubmit)}
        isLoading={loadingAppointmentBooking === 'pending'}
        color={palette.primary}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderBottomColor: palette.gray4,
    borderBottomWidth: 0.5,
    borderRadius: 12,
    borderColor: palette.gray4,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 20,
  },
  selectedTextStyle: {
    marginLeft: 20,
    fontSize: appSize.h5,
    fontWeight: 'bold',
    color: palette.gray2,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    marginRight: 5,
  },
});
