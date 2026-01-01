import * as Font from 'expo-font';
import { fonts } from '../theme';

const loadAppFonts = async () => {
    await Font.loadAsync({
        [fonts.regular]: require('../assets/fonts/Ubuntu-Regular.ttf'),
        [fonts.bold]: require('../assets/fonts/Ubuntu-Bold.ttf'),
    });
};

export default loadAppFonts;
