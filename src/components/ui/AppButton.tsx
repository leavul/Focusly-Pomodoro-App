import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { s } from 'react-native-size-matters'
import { colors, layouts, radius } from '../../theme'

type AppButtonType = TouchableOpacityProps & {
    padding?: number
    backgroundColor?: string,
    reduceOpacityWhenDisabled?: boolean
}

const AppButton = ({
    padding = 16,
    disabled,
    reduceOpacityWhenDisabled = true,
    backgroundColor,
    style,
    children,
    ...props
}: AppButtonType) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    padding: s(padding),
                    backgroundColor,
                    borderWidth: layouts.borderWidth,
                    borderColor: backgroundColor ? backgroundColor : colors.muted,
                    opacity: disabled && reduceOpacityWhenDisabled
                        ? 0.5
                        : undefined
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