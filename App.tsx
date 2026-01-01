import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme';
import AppBootstrap from './src/components/bootstrap/AppBootstrap';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppBootstrap>
        <HomeScreen />
      </AppBootstrap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
