import { SvgIconProps } from "./types";
import { colors } from "../../theme";
import { s } from "react-native-size-matters";
import Svg from "react-native-svg";

/**
 * Wrapper component to centralize shared SVG icon logic.
 * Created to avoid repeating size scaling, color defaults,
 */

const SvgIconWrapper = ({ size = 24, fill = colors.secondary, viewBox, children, ...props }: SvgIconProps) => {
    const iconSize = s(size);
    return (
        <Svg
            width={iconSize}
            height={iconSize}
            fill={fill}
            viewBox={viewBox}
            {...props}
        >
            {children}
        </Svg>
    )
};

export default SvgIconWrapper;
