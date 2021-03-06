/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import SpInAppUpdates, {
    NeedsUpdateResponse,
    IAUUpdateKind,
    StartUpdateOptions,
  } from 'sp-react-native-in-app-updates';

import InAppReview from 'react-native-in-app-review';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {PERMISSIONS} from 'react-native-permissions';

// if (Platform.OS === 'android') {
    
//       PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ]).then(()=>{
//         console.log('write external stroage', grants);
  
//         if (
//             grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//             PermissionsAndroid.RESULTS.GRANTED &&
//             grants['android.permission.READ_EXTERNAL_STORAGE'] ===
//             PermissionsAndroid.RESULTS.GRANTED &&
//             grants['android.permission.RECORD_AUDIO'] ===
//             PermissionsAndroid.RESULTS.GRANTED
//         ) {
//             console.log('Permissions granted');
//         } else {
//             console.log('All required permissions not granted');
//             return;
//         }
//       }).catch((err) => {
//         console.warn(err);
//         return;
//       })
//   }

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


  const inAppUpdates = new SpInAppUpdates(
    false // isDebug
  );
  // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
  inAppUpdates.checkNeedsUpdate({ curVersion: '1.1.0' }).then((result) => {
    if (result.shouldUpdate) {
      let updateOptions = {};
      if (Platform.OS === 'android') {
        // android only, on iOS the user will be prompted to go to your app store page
        updateOptions = {
          updateType: IAUUpdateKind.FLEXIBLE,
        };
      }
      inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
    }
  }).catch((e) =>{
      if(__DEV__) console.log("Error ==> ", e);
  }).finally(async () =>{
    if (InAppReview.isAvailable()) {
      let openCount = parseInt(await AsyncStorage.getItem('com.excusemyfrench:appOpenCount'))
      
      openCount = (typeof openCount == 'number') ? isNaN(openCount) ? 0 : openCount : 0;
      
      if ((openCount == 5 || openCount == 15 || openCount == 64 || openCount == 256 || openCount == 1024 || openCount == 4096)) {
        InAppReview.RequestInAppReview()
        .catch((e) => {
          if(__DEV__) console.log("InApp Review Error ==> ", e);
        })
      }
      
      await AsyncStorage.setItem('com.excusemyfrench:appOpenCount', `${openCount + 1}`)
    }
  });
