import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '../../theme';
import { s, vs } from 'react-native-size-matters';

type CompletedWorkSessionIndicatorProps = {
  completedWork: number
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const WorkIndicator = ({ completedWork }: CompletedWorkSessionIndicatorProps) => {
  const cycleLength = 4;
  const remainder = completedWork % cycleLength;
  const activeDots = (remainder === 0 && completedWork > 0) ? cycleLength : remainder;
  
  return (
    <View style={styles.container}>
      {[...Array(4)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index < activeDots && styles.activeDot
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.80,
    marginBottom: vs(60),
    flexDirection: 'row',
    gap: s(spacing.sm),
  },
  dot: {
    width: s(50),
    height: s(25),
    borderRadius: s(25),
    borderWidth: s(1),
    borderColor: colors.muted,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
});

export default WorkIndicator;