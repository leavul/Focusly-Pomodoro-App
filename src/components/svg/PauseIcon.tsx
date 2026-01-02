import SvgIconWrapper from "./SvgIconWrapper";
import { SvgIconProps } from "./types";
import { Path } from "react-native-svg";

const PauseIcon = (props: SvgIconProps) => {
    return (
        <SvgIconWrapper
            viewBox="0 0 32 32"
            {...props}
        >
            <Path
                d="M14 6v20c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2zm10-2h-4c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
            />
        </SvgIconWrapper >
    )
};

export default PauseIcon;
