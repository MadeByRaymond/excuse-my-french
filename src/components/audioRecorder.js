import AudioRecorderPlayer, { 
  AVEncoderAudioQualityIOSType,
  AVEncodingOption, 
  AudioEncoderAndroidType,
  // AudioSet,
  AudioSourceAndroidType, 
 } from 'react-native-audio-recorder-player';
 import {Platform} from 'react-native';
 import RNFetchBlob from 'rn-fetch-blob'

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setVolume(1.0).catch(e => { if (__DEV__) console.log('Error: Cannot set recorder volume ==> ', e);});

const path = Platform.select({
  ios: 'excuse_my_french_rec_temp.m4a',
  android: `${RNFetchBlob.fs.dirs.CacheDir}/excuse_my_french_rec_temp.mp4`,
})

export const onStartRecord = async () => {
  try {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    
    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => { });
    // console.log('Start Result ==> ',result);
  } catch (error) {
    // if (__DEV__) console.log('Error ==> ', error);
    throw error
  }
};

export const onStopRecord = async () => {
  try {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener((e) => { });
    
    // console.log('Stop Result ==> ',result);
    return path
  } catch (error) {
    // if (__DEV__) console.log('Error ==> ', error);
    throw error
  }
};

// export const onStartPlay = async () => {
//   try {
//     console.log('onStartPlay ==> ', path);
//     const msg = await audioRecorderPlayer.startPlayer(path);
//     console.log('Play Result ==> ',msg);
//     // audioRecorderPlayer.addPlayBackListener((e) => {
//     //   this.setState({
//     //     currentPositionSec: e.current_position,
//     //     currentDurationSec: e.duration,
//     //     playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
//     //     duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
//     //   });
//     //   return;
//     // });
//   } catch (error) {
//     if (__DEV__) console.log('Error ==> ', error);
//   }
// };

// export const onPausePlay = async () => {
//   await audioRecorderPlayer.pausePlayer();
// };

// export const onStopPlay = async () => {
//   console.log('onStopPlay');
//   audioRecorderPlayer.stopPlayer();
//   audioRecorderPlayer.removePlayBackListener();
// };