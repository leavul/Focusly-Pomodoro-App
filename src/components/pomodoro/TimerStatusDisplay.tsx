import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../ui/AppText';
import { vs } from 'react-native-size-matters';
import { spacing, colors } from '../../theme';

type TimerStatusDisplayProps = {
  timerIsOff: boolean;
};

/**
 * TimerStatusDisplay component
 *
 * Displays the current status of the Pomodoro timer.
 *
 * Props:
 * - timerIsOff: boolean
 *   - true: timer is paused, displays "P A U S E D" in red.
 *   - false: timer is running, displays "R U N N I N G" in green.
 *
 * Behavior:
 * - Text color changes according to the timer state.
 * - Shows a clear visual indicator of whether the timer is active or paused.
 */
const TimerStatusDisplay = ({ timerIsOff }: TimerStatusDisplayProps) => {
  return (
    <AppText
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
    </AppText>
  );
};

export default TimerStatusDisplay;

const styles = StyleSheet.create({
  statusText: {
    marginTop: vs(spacing.md),
  },
});
