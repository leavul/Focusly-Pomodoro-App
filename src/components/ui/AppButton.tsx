import { ColorValue, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { s } from 'react-native-size-matters'
import { colors, radius } from '../../theme'

type AppButtonType = TouchableOpacityProps & {
    padding?: number
    backgroundColor?: string,
    enableBorderWidth?: boolean
}

const AppButton = ({ padding = 16, backgroundColor, enableBorderWidth = true, style, children, ...props }: AppButtonType) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    padding: s(padding),
                    backgroundColor,
                    borderWidth: s(1),
                    borderColor: colors.muted,
                },
                style

            ]}
            {...props}
        >
            {children}
        </TouchableOpacity >
    )
}

export default AppButton

const styles = StyleSheet.create({
    container: {
        borderRadius: s(radius.full),
        justifyContent: 'center',
        alignItems: 'center'
    }
})