import { Text, TextProps } from 'react-native';
import { colors, fonts, typography } from '../../theme';
import { s } from 'react-native-size-matters';

type AppTextProps = TextProps & {
    variant?: keyof (typeof typography);
    color?: string
}

const AppText = ({ variant = 'body', style, color, children, ...props }: AppTextProps) => {
    // Determine fontFamily based on variant
    const fontFamily = variant === 'timer'
        ? fonts.bold
        : fonts.regular

    return (
        <Text
            style={[
                style,
                {
                    fontFamily,
                    color: color ?? colors.secondary
                },
                typography[variant]
            ]}
            {...props}
        >
            {children}
        </Text>
    )
}

export default AppText
