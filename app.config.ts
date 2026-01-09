import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
    name: 'Focusly',
    slug: 'focusly-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,

    splash: {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },

    ios: {
        supportsTablet: true,
        icon: 'assets/icons/focuslyapp.icon',
        bundleIdentifier: 'com.albaraadighriri.focuslyapp',
        infoPlist: {
            ITSAppUsesNonExemptEncryption: false,
        },
    },

    android: {
        adaptiveIcon: {
            foregroundImage: './assets/icons/adaptive-icon.png',
            monochromeImage: './assets/icons/adaptive-icon.png',
            backgroundColor: '#FDFBF7',
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: 'com.albaraadighriri.focuslyapp',
    },

    web: {
        favicon: './assets/favicon.png',
    },

    plugins: [
        'expo-font',
        'expo-audio',
        [
            'expo-splash-screen',
            {
                image: './assets/icons/splash-icon.png',
                backgroundColor: '#FDFBF7',
                dark: {
                    image: './assets/icons/splash-icon.png',
                    backgroundColor: '#121212',
                },
                resizeMode: 'contain',
                imageWidth: 200,
            },
        ],
    ],

    extra: {
        eas: {
            projectId: "c14ccdd2-c39b-4734-a7ce-2fe46bdd051d"
        }
    },

    owner: 'leavul',
};

export default config;
