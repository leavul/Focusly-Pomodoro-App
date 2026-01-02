import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../ui/AppText';
import { vs } from 'react-native-size-matters';
import { spacing, colors } from '../../theme';

type StatusDisplayProps = {
  status: string;
};

const StatusDisplay = ({ status }: StatusDisplayProps) => {
  return <AppText style={styles.statusText} color={colors.red}>{status}</AppText>;
};

export default StatusDisplay;

const styles = StyleSheet.create({
  statusText: {
    marginTop: vs(spacing.md),
  },
});
