import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../ui/AppText';
import { vs } from 'react-native-size-matters';
import { spacing, colors } from '../../theme';

type TimerStatusDisplayProps = {
  timerIsRunning: boolean;
};

const TimerStatusDisplay = ({ timerIsRunning }: TimerStatusDisplayProps) => {
  return <AppText
    style={styles.statusText}
    color={timerIsRunning
      ? colors.green
      : colors.red
    }
  >
    {
      timerIsRunning
        ? 'R U N N I N G'
        : 'P A S U E D'
    }
  </AppText>;
};

export default TimerStatusDisplay;

const styles = StyleSheet.create({
  statusText: {
    marginTop: vs(spacing.md),
  },
});
