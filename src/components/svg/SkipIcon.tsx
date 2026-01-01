import SvgIconWrapper from "./SvgIconWrapper";
import { SvgIconProps } from "./types";
import { Path } from "react-native-svg";
import { colors } from "../../theme";


const SkipIcon = (props: SvgIconProps) => {
  return (
    <SvgIconWrapper
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        stroke={colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 24.414V7.586c0-1.746 2.081-2.653 3.36-1.465l9.062 8.413a2 2 0 010 2.932l-9.061 8.413C10.08 27.067 8 26.16 8 24.414zM23 5v22"
      />
    </SvgIconWrapper >
  )
};

export default SkipIcon;
