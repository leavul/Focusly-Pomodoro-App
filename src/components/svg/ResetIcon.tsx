import { colors } from "../../theme";
import SvgIconWrapper from "./SvgIconWrapper";
import { SvgIconProps } from "./types";
import { G, Path } from "react-native-svg";


const ResetIcon = (props: SvgIconProps) => {
    return (
        <SvgIconWrapper
            viewBox="0 0 24 24"
            {...props}
        >
            <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <Path fillRule="nonzero" d="M0 0H24V24H0z" />
                <Path
                    d="M4 13a8 8 0 103.755-6.782M9.238 1.898l-1.74 3.941a1 1 0 00.512 1.319l3.94 1.74"
                    stroke={colors.secondary}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                />
            </G>
        </SvgIconWrapper >
    )
};

export default ResetIcon;
