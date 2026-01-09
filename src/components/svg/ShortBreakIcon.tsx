import SvgIconWrapper from "./SvgIconWrapper";
import { SvgIconProps } from "./types";
import { G, Path } from "react-native-svg";
import { colors } from "../../theme";


const ShortBreakIcon = (props: SvgIconProps) => {
  return (
    <SvgIconWrapper
      viewBox="0 0 64 64"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <G transform="translate(-1152 -256)">
        <Path d="M0 0H1280V800H0z" fill="none" />
        <Path
          d="M737.673 328.231a1.943 1.943 0 012.084.921c.198.311.349.57.349.57s5.1 8.859-.677 23.06c-2.35 5.777-2.937 13.301-.994 18.897a1.952 1.952 0 01-2.7 2.398c-5.543-2.702-13.707-9.019-13.714-22.077-.006-11.774 6.791-21.721 15.652-23.769z"
          transform="rotate(30 1081.637 1145.933) translate(0 -.7)"
        />
        <Path
          d="M737.609 328.246c.856-.186 1.735.2 2.176.957.185.287.321.519.321.519s5.1 8.859-.677 23.06c-2.329 5.725-2.926 13.166-1.046 18.745a2.025 2.025 0 01-2.823 2.462c-5.54-2.748-13.532-9.069-13.539-21.989-.005-11.745 6.758-21.672 15.588-23.754z"
          transform="rotate(30 1081.637 1145.933) rotate(180 741.515 351.647)"
        />
      </G>
    </SvgIconWrapper >
  )
};

export default ShortBreakIcon;
