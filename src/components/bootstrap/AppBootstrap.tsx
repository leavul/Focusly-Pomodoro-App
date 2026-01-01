import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { ReactNode, useEffect, useState } from 'react'
import { colors } from '../../theme';
import loadAppFonts from '../../hooks/loadAppFonts';

type AppBootstrapProps = {
    children: ReactNode
}

const AppBootstrap = ({ children }: AppBootstrapProps) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            try {
                // Load todos and fonts in parallel
                const [_] = await Promise.all([loadAppFonts()]);
            } catch (error) {
                console.error('Error loading resources:', error);
            } finally {
                setIsReady(true);
            }
        }

        loadResources();
    }, [])

    return (
        !isReady ? (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        ) : (
            <>{children}</>
        )

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default AppBootstrap