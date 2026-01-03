import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme';
import AppBootstrap from './src/components/bootstrap/AppBootstrap';
import { Provider } from 'react-redux';
import { store } from './src/store';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Provider store={store}>
        <AppBootstrap>
          <HomeScreen />
        </AppBootstrap>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
