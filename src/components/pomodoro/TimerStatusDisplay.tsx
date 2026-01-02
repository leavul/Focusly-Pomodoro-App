import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../ui/AppText';
import { vs } from 'react-native-size-matters';
import { spacing, colors } from '../../theme';

type TimerStatusDisplayProps = {
  status: string;
};

const TimerStatusDisplay = ({ status }: TimerStatusDisplayProps) => {
  return <AppText style={styles.statusText} color={colors.red}>{status}</AppText>;
};

export default TimerStatusDisplay;

const styles = StyleSheet.create({
  statusText: {
    marginTop: vs(spacing.md),
  },
});
