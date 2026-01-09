import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../../ui/AppText';
import { vs } from 'react-native-size-matters';
import { colors, spacing } from '../../../theme';

type TimeDisplayProps = {
  remainingTime: string;
  timerIsRunning: boolean;
};

const TimerDisplay = ({ remainingTime, timerIsRunning }: TimeDisplayProps) => {
  return (
    <>
      <AppText
        style={styles.timerText}
        variant='timer'
      >
        {remainingTime}
      </AppText>

      <AppText
        style={styles.statusText}
        color={timerIsRunning
          ? colors.green
          : colors.red
        }
      >
        {
          timerIsRunning
            ? 'R U N N I N G'
            : 'P A U S E D'
        }
      </AppText>
    </>
  );
};

export default TimerDisplay;

const styles = StyleSheet.create({
  timerText: {
    marginTop: vs(spacing.xl),
  },
  statusText: {
    marginTop: vs(spacing.md),
  },
});
