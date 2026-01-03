import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../ui/AppText';
import { vs } from 'react-native-size-matters';
import { spacing, colors } from '../../theme';

type TimerStatusDisplayProps = {
  timerIsOff: boolean;
};

const TimerStatusDisplay = ({ timerIsOff }: TimerStatusDisplayProps) => {
  return <AppText
    style={styles.statusText}
    color={timerIsOff
      ? colors.red
      : colors.green
    }
  >
    {
      timerIsOff
        ? 'P A U S E D'
        : 'R U N N I N G'
    }
  </AppText>;
};

export default TimerStatusDisplay;

const styles = StyleSheet.create({
  statusText: {
    marginTop: vs(spacing.md),
  },
});
