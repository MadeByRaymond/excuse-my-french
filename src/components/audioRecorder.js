import AudioRecorderPlayer, { 
  AVEncoderAudioQualityIOSType,
  AVEncodingOption, 
  AudioEncoderAndroidType,
  // AudioSet,
  AudioSourceAndroidType, 
 } from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setVolume(1.0);

export const onStartRecord = async () => {
  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: 10,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
  };
  const result = await audioRecorderPlayer.startRecorder('sdcard/temp.mp4',audioSet);
  audioRecorderPlayer.addRecordBackListener((e) => {
    // this.setState({
    //   recordSecs: e.current_position,
    //   recordTime: audioRecorderPlayer.mmssss(
    //     Math.floor(e.current_position),
    //   ),
    // });
    // return;
  });
  console.log('Start Result ==> ',result);
};

export const onStopRecord = async () => {
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  // this.setState({
  //   recordSecs: 0,
  // });
  console.log('Stop Result ==> ',result);
};

export const onStartPlay = async () => {
  console.log('onStartPlay');
  const msg = await audioRecorderPlayer.startPlayer('sdcard/temp.mp4');
  console.log('Play Result ==> ',msg);
  // audioRecorderPlayer.addPlayBackListener((e) => {
  //   this.setState({
  //     currentPositionSec: e.current_position,
  //     currentDurationSec: e.duration,
  //     playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
  //     duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
  //   });
  //   return;
  // });
};

export const onPausePlay = async () => {
  await audioRecorderPlayer.pausePlayer();
};

export const onStopPlay = async () => {
  console.log('onStopPlay');
  audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
};