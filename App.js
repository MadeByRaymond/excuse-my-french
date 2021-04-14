import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity, Dimensions, Switch, Image, TouchableWithoutFeedback, Linking, Share} from 'react-native'
// import Pulse from 'react-native-pulse'

import Sound from 'react-native-sound';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Pulse from './src/UI/PulseUI/pulse';
import { 
  wavesSVG as WavesSVG, 
  creditSVG, 
  donateSVG as DonateSVG,
  settingsSVG as SettingsSVG
} from './src/UI/svgUI';

import * as ModeStyles from './src/components/styles'
import * as audioRecorder from './src/components/audioRecorder'
import { morser, morserPlayer } from "./src/components/morser";

let soundFile = require('./src/assets/files/sounds/censor_beep_1.mp3');
let soundFile_high = require('./src/assets/files/sounds/censor_beep_2_high.mp3');
let soundFile_low = require('./src/assets/files/sounds/censor_beep_3_low.mp3');
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
  state = {
    isPressed : false,
    pulseNumber: 0,
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
  }

  componentDidMount(){
    AsyncStorage.getItem('com.excusemyfrench:darkmode').then((value)=>{
      this.setState({darkMode: value.trim() == 'true'})
    }).catch(()=>{
      this.setState({darkMode: false});
      AsyncStorage.setItem('com.excusemyfrench:darkmode','false')
    })
  }


  handlePressIn = () =>{
    this.whoosh.play();
    audioRecorder.onStartRecord();
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
    this.whoosh.stop();
    audioRecorder.onStopRecord().then(()=>{
      audioRecorder.onStartPlay()
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
whoosh = new Sound(soundFile, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // // loaded successfully
  // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

  // // Play the sound with an onEnd callback
  // whoosh.play((success) => {
  //   if (success) {
  //     console.log('successfully finished playing');
  //   } else {
  //     console.log('playback failed due to audio decoding errors');
  //   }
  // });
});

 
  render() {
    // alert(mbrSVG)
    let Credits = creditSVG;
    this.whoosh.setNumberOfLoops(-1);
    let Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    let pulseNumber = this.state.pulseNumber;

    let mode = this.state.darkMode ? ModeStyles['darkModeStyles'] : ModeStyles['lightModeStyles']
    
    return (
      <View style={[styles.container, mode.containerColor]}>
        <TouchableWithoutFeedback 
          onPress={()=>this.setState({displayDropdown: null})}
        ><View style={styles.touchableContainer}></View></TouchableWithoutFeedback>
        {/* <Text>Donate with ads, Donate with money, change sound, record sound during audio</Text> */}
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
                  <Touchable
                    onPress={()=>{
                      let textArray = morser('Hello Works').split("");
                      console.log(textArray)
                      this.whoosh.play()
                      morserPlayer(textArray, this.whoosh).then((res)=>{
                        console.log(res)
                      })
                      // textArray.forEach((char, i) => {
                      //   if(textArray.length != (i+1)) {
                      //     if (char == '.') {
                      //       console.log(char)
                      //       this.whoosh.stop();
                      //       this.whoosh.release();
                      //     }else{
                      //       this.whoosh.play()
                            
                      //     }
                      //   }else{
                      //     this.whoosh.play();
                      //   }
                      // });
                    }}
                  >
                    <View><Text style={[styles.actionsDropdownItemText, mode.actionsDropdownItemTextColor]}>Change Sound</Text></View>
                  </Touchable>
                </View>
                <View style={[styles.actionsDropdownItemDivider, mode.actionsDropdownItemDividerColor]}></View>
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
                </View>
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
                      Share.share({
                        message: 'Play around with the “Excuse My French” app. Get it now on play store https://play.google.com/store/apps/details?id=com.madebyraymond.excusemyfrench',
                        title: 'Download the “Excuse My French” app'
                      },{dialogTitle: 'Share via...'}).catch((e)=>{
                        if (__DEV__) {
                          console.log('Error Sharing The App ==> ', e);
                        }
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

        <View style={{width: 250, backgroundColor:'#FFC477', borderRadius:10, overflow: 'hidden', position: 'absolute', top: (dHeight - (dHeight/4))}}>
          <View style={{width: 250, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:15, paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={playIcon} resizeMode='contain' style={{height:20, width: 20}} />
              <View><Text style={{color:'#3B455A', fontSize: 16, marginLeft: 10}}>Replay Sound</Text></View>
            </View>
            <View>
              <Image source={cancelIcon} resizeMode='contain' style={{height:20, width: 20}} />
            </View>
          </View>
        </View>
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

