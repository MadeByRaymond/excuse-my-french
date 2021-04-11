import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={props.height ? ((props.height * 42) / 38) : 42}
      height={38}
      viewBox="0 0 42 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30.802 0a11.104 11.104 0 00-9.68 5.664A11.104 11.104 0 0011.443 0C5.306 0 .33 5.693.33 11.83.33 27.245 21.122 38 21.122 38s20.793-10.755 20.793-26.17C41.915 5.693 36.939 0 30.802 0z"
        fill="#FF6243"
      />
      <Path
        d="M3.198 11.83C3.198 6.152 7.46.864 12.958.103A11.062 11.062 0 0011.442 0C5.306 0 .33 5.693.33 11.83.33 27.245 21.122 38 21.122 38s.538-.279 1.434-.806C17.86 34.431 3.198 24.776 3.198 11.83z"
        fill="#FF5023"
      />
    </Svg>
  )
}

export default SvgComponent