// We do this here so we can over-ride this file when in react-native
// with the jwtDecode-reactNative.ts file.
// See the 'react-native' property in package.json
export { jwtDecode } from 'jwt-decode'
