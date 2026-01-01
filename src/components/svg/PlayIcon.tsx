import SvgIconWrapper from "./SvgIconWrapper";
import { SvgIconProps } from "./types";
import { Path } from "react-native-svg";


const PlayIcon = (props: SvgIconProps) => {
    return (
        <SvgIconWrapper
            viewBox="0 0 256 256"
            {...props}
        >
            <Path d="M239.969 128a15.9 15.9 0 01-7.656 13.656l-143.97 87.985A15.998 15.998 0 0164 215.992V40.008a15.998 15.998 0 0124.344-13.649l143.969 87.985A15.9 15.9 0 01239.969 128z" />

        </SvgIconWrapper >
    )
};

export default PlayIcon;
