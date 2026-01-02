import { Text, TextProps } from 'react-native';
import { colors, fonts, typography } from '../../theme';

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
                    color: color ?? colors.primary
                },

                typography[variant],
            ]}
            {...props}
        >
            {children}
        </Text>
    )
}

export default AppText
