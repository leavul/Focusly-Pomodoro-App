import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../ui/AppText';
import { vs } from 'react-native-size-matters';
import { spacing } from '../../theme';

type TimeDisplayProps = {
  time: string;
};

const TimeDisplay = ({ time }: TimeDisplayProps) => {
  return <AppText style={styles.timerText} variant="timer">{time}</AppText>;
};

export default TimeDisplay;

const styles = StyleSheet.create({
  timerText: {
    marginTop: vs(spacing.xl),
  },
});
