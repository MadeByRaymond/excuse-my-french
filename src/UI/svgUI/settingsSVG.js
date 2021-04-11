import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      
      width={props.height ? props.height : 38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.067 0h27.866A5.067 5.067 0 0138 5.067v27.866A5.067 5.067 0 0132.933 38H5.067A5.066 5.066 0 010 32.933V5.067A5.066 5.066 0 015.067 0z"
        fill="#FFC477"
      />
      <Path
        d="M11.4 3.8h2.533v30.4H11.4V3.8zM24.067 3.8H26.6v30.4h-2.534V3.8z"
        fill="#FF6243"
      />
      <Path
        d="M7.6 21.533h10.133v2.534H7.6v-2.534zM20.267 13.933H30.4v2.534H20.267v-2.534z"
        fill="#3D9AE2"
      />
    </Svg>
  )
}

export default SvgComponent
