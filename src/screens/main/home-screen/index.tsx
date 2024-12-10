import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image as RNImage,
  Alert,
  Text,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { palette } from '../../../constants/palette';

export default function ObjectDetectionApp() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [processedImageUri, setProcessedImageUri] = useState<string | null>(
    null,
  );

  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (!result.didCancel && result.assets) {
      const selectedAsset = result.assets[0];
      if (selectedAsset && selectedAsset.uri) {
        setImageUri(selectedAsset.uri);
        setProcessedImageUri(null);
      }
    }
  };

  const handleProcessImage = async () => {
    if (!imageUri) {
      Alert.alert('Chưa chọn hình ảnh');
      return;
    }

    const formData = new FormData();
    formData.append('image_file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image_file.jpg',
    });

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DETECT_API}/detect_caries`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const imgBlob = await response.blob();
      const imgUrl = URL.createObjectURL(imgBlob);
      setProcessedImageUri(imgUrl);
      setImageUri(null);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Có lỗi xảy ra khi phát hiện sâu răng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phát hiện sâu răng</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Chọn ảnh"
          onPress={handleSelectImage}
          color={palette.blue}
        />
        <Button
          title="Phát hiện sâu răng"
          onPress={handleProcessImage}
          color={palette.green}
        />
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {imageUri && (
        <RNImage source={{ uri: imageUri }} style={styles.selectedImage} />
      )}

      {processedImageUri && (
        <RNImage
          source={{ uri: processedImageUri }}
          style={styles.processedImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: palette.blue,
    borderRadius: 10,
  },
  processedImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: palette.green,
    borderRadius: 10,
  },
});
