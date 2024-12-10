import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { palette } from '../constants/palette';

type SegmentedControlProps = {
  options: { id: number; name: string }[];
  selectedOption: number;
  onOptionPress?: (optionId: number) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const { width: windowWidth } = useWindowDimensions();

    const internalPadding = 20;
    const segmentedControlWidth = windowWidth - 40;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      const selectedIndex = options.findIndex(
        option => option.id === selectedOption,
      );
      return {
        left: withTiming(itemWidth * selectedIndex + internalPadding / 2),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 20,
            paddingLeft: internalPadding / 2,
          },
        ]}>
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map(option => {
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option.id);
              }}
              key={option.id}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}>
              <Text style={styles.label}>{option.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: palette.primaryLight,
  },
  activeBox: {
    position: 'absolute',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 3,
    height: '80%',
    top: '10%',
    backgroundColor: palette.white,
  },
  labelContainer: { justifyContent: 'center', alignItems: 'center' },
  label: {
    fontFamily: 'SF-Compact-Rounded-Medium',
    fontSize: 16,
  },
});

export { SegmentedControl };
