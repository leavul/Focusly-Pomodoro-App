import { ColorValue, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { s } from 'react-native-size-matters'
import { colors, radius } from '../../theme'

type AppButtonType = TouchableOpacityProps & {
    padding?: number
    backgroundColor?: string,
    enableBorderWidth?: boolean
}

const AppButton = ({ padding = 16, disabled = false, backgroundColor, enableBorderWidth = true, style, children, ...props }: AppButtonType) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    padding: s(padding),
                    backgroundColor,
                    opacity: disabled ? 0.5 : undefined,
                },
                enableBorderWidth &&
                {
                    borderWidth: s(1),
                    borderColor: colors.muted,
                },
                style

            ]}
            disabled={disabled}
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