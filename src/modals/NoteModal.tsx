import { View, Modal, TouchableOpacity, ScrollView, Text } from 'react-native';
import React from 'react';
import { globalStyle } from '../styles/globalStyle';
import { appInfo } from '../constants/appInfo';
import { AppBarComponent } from '../components';
import { CloseCircle } from 'iconsax-react-native';
import { palette } from '../constants/palette';
import { appSize } from '../constants/appSize';
import SpaceComponent from '../components/SpaceComponent';
import { IMedicine } from '../types/medicine';

interface Props {
  visible: boolean;
  medicine: IMedicine;
  onClose: () => void;
}

export default function NoteModal(props: Props) {
  const { visible, medicine, onClose } = props;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade">
      <View
        style={[
          globalStyle.container,
          {
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            width: appInfo.sizes.WIDTH * 0.9,
            height: appInfo.sizes.HEIGHT * 0.8,
            backgroundColor: palette.white,
            borderRadius: 5,
          }}>
          <AppBarComponent
            right={
              <TouchableOpacity onPress={onClose}>
                <CloseCircle
                  size={30}
                  variant="Outline"
                  color={palette.gray2}
                />
              </TouchableOpacity>
            }
            title="Chi tiết"
          />
          <ScrollView>
            <View
              style={[
                globalStyle.container,
                {
                  paddingHorizontal: 16,
                },
              ]}>
              <SpaceComponent height={10} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Tên thuốc:{' '}
                </Text>
                <Text>{medicine.medicineName || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Đường đưa thuốc:{' '}
                </Text>
                <Text>{medicine.routeOfAdministration || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Khoảng liều:{' '}
                </Text>
                <Text>{medicine.dosageForm || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Giảm liều:{' '}
                </Text>
                <Text>{medicine.reduceDose || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Quy đổi:{' '}
                </Text>
                <Text>{medicine.equivalent || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Tác dụng:{' '}
                </Text>
                <Text>{medicine.uses || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Chỉ định:{' '}
                </Text>
                <Text>{medicine.indication || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Liều dùng:{' '}
                </Text>
                <Text>{medicine.dosageForCats || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Lưu ý:{' '}
                </Text>
                <Text>{medicine.sideEffect || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Tác dụng phụ:{' '}
                </Text>
                <Text>{medicine.contraindication || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Thận trọng:{' '}
                </Text>
                <Text>{medicine.caution || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
              <Text style={{ color: palette.gray2, fontSize: appSize.h4 }}>
                <Text style={{ fontWeight: 'bold', color: palette.primary }}>
                  Đảo ngược{' '}
                </Text>
                <Text>{medicine.safetyLimit || 'Không có'}</Text>
              </Text>
              <SpaceComponent height={20} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
