// We do this here so we can over-ride the jwtDecode.ts file
// with this file when in react-native.
// See the 'react-native' property in package.json
// And we override so we can shim in the atob function,
// which is required by jwtDecode, but not available in react-native
import "core-js/stable/atob";
import { jwtDecode as decode } from 'jwt-decode'

export const jwtDecode = (token:string) => {
    return decode(token);
}  
