import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 8a3 3 0 0 0-1 5.83 1.005 1.005 0 0 0 0 .17v6a1 1 0 0 0 2 0v-6a1.005 1.005 0 0 0 0-.17A3 3 0 0 0 12 8Zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-8.5-1a6.87 6.87 0 0 1 2.64-5.23 1.001 1.001 0 1 0-1.28-1.54A8.84 8.84 0 0 0 1.5 11a8.84 8.84 0 0 0 3.36 6.77 1.001 1.001 0 1 0 1.28-1.54A6.87 6.87 0 0 1 3.5 11Z"
      fill="#fff"
    />
    <Path
      d="M16.64 6.24a1 1 0 0 0-1.28 1.52A4.28 4.28 0 0 1 17 11a4.28 4.28 0 0 1-1.64 3.24A1 1 0 0 0 16 16a1 1 0 0 0 .64-.24A6.201 6.201 0 0 0 19 11a6.2 6.2 0 0 0-2.36-4.76Zm-7.88.12a1 1 0 0 0-1.4-.12A6.2 6.2 0 0 0 5 11a6.2 6.2 0 0 0 2.36 4.76 1 1 0 0 0 1.4-.12 1 1 0 0 0-.12-1.4A4.28 4.28 0 0 1 7 11a4.28 4.28 0 0 1 1.64-3.24 1 1 0 0 0 .12-1.4Z"
      fill="#fff"
    />
    <Path
      d="M19.14 4.23a1.001 1.001 0 1 0-1.28 1.54A6.87 6.87 0 0 1 20.5 11a6.87 6.87 0 0 1-2.64 5.23 1.001 1.001 0 0 0 1.28 1.54A8.84 8.84 0 0 0 22.5 11a8.84 8.84 0 0 0-3.36-6.77Z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent