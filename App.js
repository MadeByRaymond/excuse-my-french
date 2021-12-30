import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity, Dimensions, Switch, Image, TouchableWithoutFeedback, Linking, Share, PermissionsAndroid, Animated, StatusBar} from 'react-native'
// import Pulse from 'react-native-pulse'
import SystemNavigationBar from "react-native-system-navigation-bar";
import NavigationBar from 'react-native-navbar-color'
import Sound from 'react-native-sound';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Pulse from './src/UI/PulseUI/pulse';
import { 
  wavesSVG as WavesSVG, 
  creditSVG as Credits, 
  donateSVG as DonateSVG,
  settingsSVG as SettingsSVG
} from './src/UI/svgUI';

import * as ModeStyles from './src/components/styles'
import * as audioRecorder from './src/components/audioRecorder'
import MorseCodeModal from './src/components/morserModal';
import ChangeSoundModal from './src/components/changeSoundModal';

let soundFile = require('./src/assets/files/sounds/censor_beep_1.mp3');
let soundFile_high = require('./src/assets/files/sounds/censor_beep_2_high.mp3');
let soundFile_low = require('./src/assets/files/sounds/censor_beep_3_low.mp3');
let soundFile_dog_12200hz = require('./src/assets/files/sounds/Dog-whistle-sound-12.200-Hz.mp3');
let soundFile_dog_16000hz = require('./src/assets/files/sounds/Dog-whistle-sound-16.000-Hz.mp3');
let playIcon = {uri: 'play_icon'};
let pauseIcon = {uri: 'pause_icon'};
let cancelIcon = {uri: 'cancel_icon'};

let dWidth = Dimensions.get('window').width;
let dHeight = Dimensions.get('window').height;

// Enable playback in silence mode
Sound.setCategory('Playback');

const firstSeekerArray = ['👀', '😳', '🙄', '😟'];
const secondSeekerArray = ['😱', '😖', '🙀', '😫'];
const thirdSeekerArray = ['🙉', '🤬', '🤯', '😡'];
const finalSeekerArray = ['😅', '😒', '😇'];

export default class App extends Component {
  censorPlayback = new Sound(soundFile);

  state = {
    isPressed : false,
    morseCodeModal: false,
    changeSoundModal: false,
    pulseNumber: 0,

    censorPlaybackShow: false,
    censorPlaybackCurrentTime: 0,
    censorPlaybackIsPlaying: false,

    attentionSeekerJSX: (
      <Text style={styles.attentionSeekerText}></Text>
    ),
    buttonAnimation:{
      animation: 'pulse',
      duration: 2000
    },

    displayDropdown: null,
    playFromPopUp: false,
    darkMode: false,
    soundFiles: {
      files:{
        normal: soundFile,
        low: soundFile_low,
        high: soundFile_high,
        dog_whistle_12200Hz: soundFile_dog_12200hz,
        dog_whistle_16000Hz: soundFile_dog_16000hz
      },
      activeSound: 'normal'
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('com.excusemyfrench:darkmode').then((value)=>{
      this.setState({darkMode: value.trim() == 'true'})
    }).catch(()=>{
      this.setState({darkMode: false});
      AsyncStorage.setItem('com.excusemyfrench:darkmode','false')
    })

    AsyncStorage.getItem('com.excusemyfrench:soundFile').then((value)=>{
      if (value) {
        this.beepSound = new Sound(this.state.soundFiles.files[value], (error) => {
          if (error) {
            if (__DEV__) console.log('failed to load the sound', error);
            // return;
          }else{
            this.setState(prevState => ({soundFiles:{...prevState.soundFiles,activeSound: value}}))
          }
        });
      }else{
        throw 'No value saved'
      }
    }).catch(()=>{
      AsyncStorage.setItem('com.excusemyfrench:soundFile',this.state.soundFiles.activeSound)
    })
  }

  componentWillUnmount(){
    this.censorPlayback.release();
    this.beepSound.release();
  }

  checkPermission = async() => {
    if (Platform.OS !== 'android') {
        return Promise.resolve(true);
    }
    let result;
    try {
        result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, { title:'Microphone Permission', message:'"Excuse My French" app needs access to your microphone so we can replay your sound.', buttonNeutral: 'Ask Me Later', buttonNegative: 'Cancel', buttonPositive: 'Ok' });
    } catch(error) {
      if(__DEV__)  console.error('failed getting permission, result:', result);
      // throw `failed getting permission, result: ${result}`;
    }
    if(__DEV__)  console.log('permission result:', result);
    return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
  }

  handlePressIn = () =>{
    this.beepSound.play();

    if(this.censorPlayback.isPlaying()){
      this.censorPlayback.pause(() => this.setState({censorPlaybackIsPlaying: false}));
      clearInterval(this.censorPlaybackTimeout);
    }
    
    this.checkPermission().then(hasPermissions => {
      if (hasPermissions) {
        audioRecorder.onStartRecord().catch((e)=>{
          if(__DEV__) console.log(e);
        });
      }
    })

    this.firstSeeker = setTimeout(() =>{
      this.setState({
        attentionSeekerJSX: (
          <Animatable.Text animation="flash" delay={2000} duration={1000} easing="ease-out" iterationCount={1} style={styles.attentionSeekerText}>{firstSeekerArray[Math.floor(Math.random() * Math.floor(4))]}</Animatable.Text>
        )
      })
    }, 5500);
    this.secondSeeker = setTimeout(() =>{
      this.setState({
        attentionSeekerJSX: (
          <Animatable.Text animation="pulse" duration={600} easing="ease-out" iterationCount="infinite" style={styles.attentionSeekerText}>{secondSeekerArray[Math.floor(Math.random() * Math.floor(4))]}</Animatable.Text>
        )
      })
    }, 10000);
    this.thirdSeeker = setTimeout(() =>{
      this.setState({
        attentionSeekerJSX: (
          <Animatable.Text animation="shake" duration={50} easing="ease" iterationCount="infinite" style={styles.attentionSeekerText}>{thirdSeekerArray[Math.floor(Math.random() * Math.floor(4))]}</Animatable.Text>
        )
      })
    }, 15000);
    this.setState({
      isPressed: true,
      displayDropdown: null,
      buttonAnimation:{
        animation: null,
        duration: 6000
      }
    });
  }

  handlePressOut = () =>{
    this.beepSound.stop();

    this.checkPermission().then(hasPermissions => {
      audioRecorder.onStopRecord().then((soundFile)=>{
        // audioRecorder.onStartPlay();
        // console.log('my sound, ==> ', soundFile);
        if (hasPermissions) {
          this.censorPlayback = new Sound(soundFile, Sound.CACHES, (error) => {
            if (error) {
              if (__DEV__) console.log('failed to load the sound', error);
            }else{
              this.censorPlayback.setNumberOfLoops(0);
              this.censorPlayback.getCurrentTime(sec => {
                this.setState({
                  censorPlaybackShow: true,
                  censorPlaybackCurrentTime: sec,
                });
              })
              
            }
          });
        }
      }).catch((e)=>{
        if(__DEV__) console.log(e);
      })
      
    })
    
    clearTimeout(this.firstSeeker);
    clearTimeout(this.secondSeeker);
    clearTimeout(this.thirdSeeker);
    this.setState({
      isPressed: false,
      displayDropdown: null,
      buttonAnimation:{
        animation: 'pulse',
        duration: 2000
      },
      attentionSeekerJSX: (
        <Animatable.Text animation="fadeOut" duration={3000} easing="ease-out" iterationCount={1} style={styles.attentionSeekerText}>{finalSeekerArray[Math.floor(Math.random() * Math.floor(3))]}</Animatable.Text>
      )
      // attentionSeekerJSX: 
    });
  }

  


// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
beepSound = new Sound(this.state.soundFiles.files[this.state.soundFiles.activeSound], (error) => {
  if (error) {
    if (__DEV__) console.log('failed to load the sound', error);
    return;
  }
  // // loaded successfully
  // console.log('duration in seconds: ' + beepSound.getDuration() + 'number of channels: ' + beepSound.getNumberOfChannels());

  // // Play the sound with an onEnd callback
  // beepSound.play((success) => {
  //   if (success) {
  //     console.log('successfully finished playing');
  //   } else {
  //     console.log('playback failed due to audio decoding errors');
  //   }
  // });
});

 
  render() {
    // alert(mbrSVG)
    this.beepSound.setNumberOfLoops(-1);
    let Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    let pulseNumber = this.state.pulseNumber;

    let mode = this.state.darkMode ? ModeStyles['darkModeStyles'] : ModeStyles['lightModeStyles'];

    
    NavigationBar.setColor(mode.containerColor.backgroundColor);
    SystemNavigationBar.lightNavigationBar(this.state.darkMode);
   

    // console.log('Status ==> ',this.state.censorPlaybackCurrentTime);
    
    return (
      <View style={[styles.container, mode.containerColor]}>
        <MorseCodeModal 
          isVisible={this.state.morseCodeModal}
          closeModalFunc = {(cb) => this.setState({morseCodeModal: false}, cb)}
          beepSound = {this.beepSound}
          darkMode = {this.state.darkMode}
        />

        <StatusBar animated={true} backgroundColor={mode.containerColor.backgroundColor} barStyle={this.state.darkMode ? "light-content" : "dark-content"} />

        <ChangeSoundModal
          isVisible={this.state.changeSoundModal}
          closeModalFunc = {(cb) => this.setState({changeSoundModal: false}, cb)}
          darkMode = {this.state.darkMode}

          soundFiles = {this.state.soundFiles}
          setActiveSound = {(soundKey) => {
            this.beepSound = new Sound(this.state.soundFiles.files[soundKey], (error) => {
              if (error) {
                if (__DEV__) console.log('failed to load the sound', error);
                // return;
              }else{
                this.setState(prevState => ({soundFiles:{...prevState.soundFiles,activeSound: soundKey}}))
                AsyncStorage.setItem('com.excusemyfrench:soundFile', soundKey);
              }
            });
          }}
        />

        <TouchableWithoutFeedback 
          onPress={()=>this.setState({displayDropdown: null})}
        >
          <View style={styles.touchableContainer}></View>
        </TouchableWithoutFeedback>

        <View style={styles.attentionSeeker}>{this.state.attentionSeekerJSX}</View>

        <TouchableWithoutFeedback 
          onPress={()=>this.setState({displayDropdown: null})}
        >
          <View style={styles.actionWrapper}>
            <View style={[styles.actionButtonWrapper, {alignItems: 'flex-start'}]}>
              <View style={styles.actionButton}>
                <TouchableOpacity onPress={() => this.setState((prevState) => ({displayDropdown: prevState.displayDropdown == 'settings' ? null : 'settings'}))}>
                  <View>
                    <SettingsSVG height={38} />
                    <View><Text style={[styles.actionButtonText, mode.actionButtonTextColor]}>Settings</Text></View>
                  </View>
                </TouchableOpacity>
              </View>
              { this.state.displayDropdown == 'settings' ? (
              <Animatable.View animation='fadeInUp' duration={200} easing="ease-out" style={[styles.actionsDropdown, mode.actionsDropdownColor, {marginLeft: -10}]}>
                <View style={styles.actionsDropdownItem}>
                  <Touchable onPress={()=> this.setState({morseCodeModal: true, displayDropdown: null})}>
                    <View><Text style={[styles.actionsDropdownItemText, mode.actionsDropdownItemTextColor]}>Morse Code</Text></View>
                  </Touchable>
                </View>
                <View style={[styles.actionsDropdownItemDivider, mode.actionsDropdownItemDividerColor]}></View>
                <View style={styles.actionsDropdownItem}>
                <Touchable onPress={()=> this.setState({changeSoundModal: true, displayDropdown: null})}>
                    <View><Text style={[styles.actionsDropdownItemText, mode.actionsDropdownItemTextColor]}>Change Sound</Text></View>
                  </Touchable>
                </View>
                {/* <View style={[styles.actionsDropdownItemDivider, mode.actionsDropdownItemDividerColor]}></View>
                <View style={styles.actionsDropdownItem}>
                  <Touchable
                    onPress={()=>this.setState((prevState)=>({playFromPopUp: !prevState.playFromPopUp}))}
                  >
                    <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingRight:1}}>
                      <View><Text style={[styles.actionsDropdownItemText, mode.actionsDropdownItemTextColor, {minWidth:0,paddingRight:40}]}>Play from Pop-Up</Text></View> 
                      <View>
                        <Switch
                          trackColor={{ false: "#FFEEB8", true: "#EAA678" }}
                          thumbColor={this.state.playFromPopUp ? "#FAF0F2" : "#F9CD9A"}
                          ios_backgroundColor="#FFEEB8"
                          onValueChange={() => this.setState((prevState)=>({playFromPopUp: !prevState.playFromPopUp}))}
                          value={this.state.playFromPopUp}
                        />
                      </View>
                    </View>
                  </Touchable>
                </View> */}
                <View style={[styles.actionsDropdownItemDivider, mode.actionsDropdownItemDividerColor]}></View>
                <View style={styles.actionsDropdownItem}>
                  <Touchable
                    onPress={()=>{
                      this.setState((prevState)=>({darkMode: !prevState.darkMode}),()=>AsyncStorage.setItem('com.excusemyfrench:darkmode', `${this.state.darkMode.toString()}`));
                    }}
                  >
                    <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingRight:1}}>
                      <View><Text style={[styles.actionsDropdownItemText, mode.actionsDropdownItemTextColor, {minWidth:0,paddingRight:40}]}>Dark Mode</Text></View> 
                      <View>
                        <Switch
                          trackColor={{ false: "#FFEEB8", true: "#EAA678" }}
                          thumbColor={this.state.darkMode ? "#FAF0F2" : "#F9CD9A"}
                          ios_backgroundColor="#FFEEB8"
                          onValueChange={() => this.setState((prevState)=>({darkMode: !prevState.darkMode}),()=>AsyncStorage.setItem('com.excusemyfrench:darkmode', `${this.state.darkMode.toString()}`))}
                          value={this.state.darkMode}
                        />
                      </View>
                    </View>
                  </Touchable>
                </View>
                <View style={[styles.actionsDropdownItemDivider, mode.actionsDropdownItemDividerColor]}></View>
                <View style={styles.actionsDropdownItem}>
                  <Touchable
                    onPress={()=>{
                      this.setState({displayDropdown: null});
                      Share.share({
                        message: 'Play around with the “Excuse My French” app. Get it now on play store https://play.google.com/store/apps/details?id=com.madebyraymond.excusemyfrench',
                        title: 'Download the “Excuse My French” app'
                      },{dialogTitle: 'Share via...'}).catch((e)=>{
                        if (__DEV__) console.log('Error Sharing The App ==> ', e);
                      });
                    }}
                  >
                    <View><Text style={[styles.actionsDropdownItemText, mode.actionsDropdownItemTextColor]}>Share with a Friend</Text></View>
                  </Touchable>
                </View>
              </Animatable.View>) : null
              }
            </View>
            <View style={[styles.actionButtonWrapper, {alignItems: 'flex-end'}]}>
              <View style={styles.actionButton}>
                <TouchableOpacity onPress={() => this.setState((prevState) => ({displayDropdown: prevState.displayDropdown == 'donate' ? null : 'donate'}))}>
                  <View>
                    <DonateSVG height={38} />
                    <View><Text style={[styles.actionButtonText, mode.actionButtonTextColor]}>Support</Text></View>
                  </View>
                </TouchableOpacity>
              </View>
              { this.state.displayDropdown == 'donate' ? (
              <Animatable.View animation='fadeInUp' duration={200} easing="ease-out" style={[styles.actionsDropdown, mode.actionsDropdownColor, {marginRight: -10}]}>
                <View style={styles.actionsDropdownItem}>
                  <Touchable
                    onPress={()=>{this.setState({displayDropdown: null}); Linking.openURL('https://www.buymeacoffee.com/MadeByRaymond')}}
                  >
                    <View><Text style={[styles.actionsDropdownItemText, mode.actionsDropdownItemTextColor]}>Support the Developers</Text></View>
                  </Touchable>
                </View>
                <View style={[styles.actionsDropdownItemDivider, mode.actionsDropdownItemDividerColor]}></View>
                <View style={styles.actionsDropdownItem}>
                  <Touchable
                    onPress={()=>{this.setState({displayDropdown: null}); Linking.openURL('https://donate.givedirect.org/?cid=710')}}
                  >
                    <View><Text style={[styles.actionsDropdownItemText, mode.actionsDropdownItemTextColor]}>Support a Charity ❤️</Text></View>
                  </Touchable>
                </View>
              </Animatable.View>) : null
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
        
        <Animatable.View animation={this.state.buttonAnimation.animation} duration={this.state.buttonAnimation.duration} easing="ease-out" iterationCount="infinite" style={styles.soundButton}>
          <Touchable background={Touchable.Ripple('#C06A46', true)} style={{borderRadius:0, backgroundColor: 'red'}} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut} >
            <View style={styles.soundButton}>
              <WavesSVG />
            </View>
          </Touchable>
        </Animatable.View>

        {this.state.censorPlaybackShow ? (
          <View style={{width: 250, backgroundColor:'#FFC477', borderRadius:10, overflow: 'hidden', position: 'absolute', top: (dHeight - (dHeight/4))}}>
            <View style={{width: 250, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:15, paddingVertical: 15, zIndex: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} activeOpacity={0.5} onPress={() => {
                  if(__DEV__) console.log('Is Playing ==> ', this.censorPlayback.isPlaying())
                  if(this.censorPlayback.isPlaying()){
                    this.censorPlayback.pause(() => this.setState({censorPlaybackIsPlaying: false}));
                    clearInterval(this.censorPlaybackTimeout);
                  }else{
                    this.censorPlayback.play((success)=>{
                      this.censorPlayback.stop();
                      clearInterval(this.censorPlaybackTimeout);
                      this.setState({
                        censorPlaybackCurrentTime: this.censorPlayback.getDuration(),
                        censorPlaybackIsPlaying: false
                      })
                      // console.log(success)
                    });

                    this.censorPlaybackTimeout = setInterval(() => {
                      // console.log('still playing')
                      if(this.censorPlayback.isPlaying){
                        this.censorPlayback.getCurrentTime(sec => {
                          this.setState({
                            censorPlaybackCurrentTime: sec,
                            censorPlaybackIsPlaying: true
                          });
                        })
                      }else{
                        clearInterval(this.censorPlaybackTimeout);
                      }
                    }, 100);
                  }
                }}><Image source={this.state.censorPlaybackIsPlaying ? pauseIcon : playIcon} resizeMode='contain' style={{height:20, width: 20}} /></TouchableOpacity>
                <View><Text style={{color:'#3B455A', fontSize: 16, marginLeft: 10}}>Replay Sound</Text></View>
              </View>
              <TouchableOpacity hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} activeOpacity={0.5} onPress={() => {
                this.censorPlayback.isPlaying ? this.censorPlayback.stop() : null;
                clearInterval(this.censorPlaybackTimeout);
                this.setState({
                  censorPlaybackShow: false,
                  censorPlaybackCurrentTime: 0,
                  censorPlaybackIsPlaying: false
                })
              }}>
                <Image source={cancelIcon} resizeMode='contain' style={{height:20, width: 20}} />
              </TouchableOpacity>
            </View>
            <Animated.View
              style={{
                height: '100%',
                width: (250 * (this.state.censorPlaybackCurrentTime / this.censorPlayback.getDuration())),
                
                backgroundColor: "#EAA678",
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                zIndex: 0
              }}
            ></Animated.View>
          </View>
        ) : null}
        

        {
          this.state.isPressed ? 
          <Pulse color='rgba(192, 106, 70, 0.7)' numPulses={4} diameter={750} initialDiameter={200} speed={1} duration={1500} />
          : null
        }
        <View style={styles.creditWrapper}>
          <Credits />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(192, 106, 70, 0.1)'
  },
  touchableContainer:{
    height: dHeight,
    width: dWidth,
    position:'absolute',
    top: 0,
    left:0
  },
  soundButton:{
    height: 200,
    width: 200,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 1000,
    backgroundColor:'#C06A46'
  },
  creditWrapper:{
    alignItems:'center',
    position: 'absolute',
    bottom: 30
  },
  attentionSeeker:{
    position: 'absolute',
    top: 70,
    right: 70,
    transform: [{ rotate: '20deg'}],
    zIndex: 20
  },
  attentionSeekerText:{
    fontSize: 60,
  },


  actionWrapper:{
    position: 'absolute',
    top: 30,
    width: dWidth,

    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    paddingHorizontal: 25,
    zIndex: 19999999
  },
  actionButtonWrapper:{
    // alignItems: 'flex-end',
  },
  actionButton:{
    alignItems: 'center',
  },
  actionButtonText: {
    textAlign: 'center',
    // color: '#3B455A',
    fontSize: 13,

    marginTop: 5
  },


  actionsDropdown:{
    // backgroundColor: '#FFF7F8',
    borderWidth: 1.7,
    borderStyle: 'solid',
    // borderColor:'#F8DCCE',
    borderRadius: 10,
    // elevation: 4,
// box-shadow: 0px 0px 4px rgba(234, 166, 120, 0.15);

    marginTop: 10,
    maxWidth: dWidth / 1.5,
    overflow: 'hidden'
  },
  actionsDropdownItem:{
    overflow: 'hidden'
  },
  actionsDropdownItemDivider:{
    borderTopWidth: 1.7,
    borderStyle: 'solid',
    // borderTopColor:'#F8DCCE'
  },
  actionsDropdownItemText:{
    // color: '#3B455A',
    fontSize: 15,
    paddingHorizontal: 18,
    paddingVertical: 15,
    minWidth: 200
  }

})

