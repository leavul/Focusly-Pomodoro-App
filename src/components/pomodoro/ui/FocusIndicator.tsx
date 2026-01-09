import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, layouts, spacing } from '../../../theme';
import { s, vs } from 'react-native-size-matters';

type FocusIndicatorProps = {
  focusCount: number
}

const FocusIndicator = ({ focusCount }: FocusIndicatorProps) => {
  const cycleLength = 4;
  const remainder = focusCount % cycleLength;
  const activeDots = (remainder === 0 && focusCount > 0) ? cycleLength : remainder;

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
    marginTop: vs(spacing.xl),
    flexDirection: 'row',
    gap: s(spacing.sm),
  },
  dot: {
    width: s(spacing.xl),
    height: s(spacing.md),
    borderRadius: s(spacing.md),
    borderWidth: layouts.borderWidth,
    borderColor: colors.muted,
  },
  activeDot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export default FocusIndicator;