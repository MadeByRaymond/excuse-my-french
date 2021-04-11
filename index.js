/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Permissions for write access',
//           message: 'Give permission to your storage to write a file',
//           buttonPositive: 'ok',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the storage');
//       } else {
//         console.log('permission denied');
//         return;
//       }
//     } catch (err) {
//       console.warn(err);
//       return;
//     }
//   }
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title: 'Permissions for write access',
//           message: 'Give permission to your storage to write a file',
//           buttonPositive: 'ok',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the camera');
//       } else {
//         console.log('permission denied');
//         return;
//       }
//     } catch (err) {
//       console.warn(err);
//       return;
//     }
//   }

AppRegistry.registerComponent(appName, () => App);
