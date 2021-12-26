import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableNativeFeedback, Animated } from 'react-native';

import Modal from "react-native-modal";

import { morser, morserPlayer } from "./morser";
import {
  creditSVG as Credits, 
  transmissionSVG as TransmissionSVG
} from '../UI/svgUI';

import * as ModeStyles from './styles';


let dWidth = Dimensions.get('window').width;

function closeFunc(isPlaying, closeModalFunc, setMorseText){
    if(!isPlaying){
        closeModalFunc(null);
        setMorseText('');
    }
}

export default function morserModal(props) {
    let timelineWidth = dWidth - 26 - 26;
    let mode = props.darkMode ? ModeStyles['darkModeStyles'] : ModeStyles['lightModeStyles'];
    const [morseCodeIsPlaying, setMorseCodeIsPlaying] = useState(false);
    const [morseText, setMorseText] = useState('');
    const [morseIndicatorColor, setMorseIndicatorColor] = useState('#FAF0F2');
    const [morseTimelineWidth, setMorseTimelineWidth] = useState(1);
    

    useEffect(() => {
        if (morseCodeIsPlaying) {
            let textArray = morser(morseText).split("");
            morserPlayer(textArray, props.beepSound, morseCodeIsPlaying, setMorseIndicatorColor, setMorseTimelineWidth, timelineWidth).then((res)=>{
              // console.log('res ==> ', res)
              setMorseCodeIsPlaying(false);
            }) 
        }
    }, [morseCodeIsPlaying]);

    return (
        <Modal 
          isVisible={props.isVisible}
          onBackdropPress={() => closeFunc(morseCodeIsPlaying, props.closeModalFunc, setMorseText)}
          onSwipeComplete={() => closeFunc(morseCodeIsPlaying, props.closeModalFunc, setMorseText)}
          onBackButtonPress={() => closeFunc(morseCodeIsPlaying, props.closeModalFunc, setMorseText)}
          swipeDirection="down"
          style={{justifyContent:'flex-end', margin: 0}}
        >
          <View 
            style={[styles.modalBg, mode.modalBg]}
          >
            <View style={styles.nudgeWrapper}>
              <View style={styles.nudge}></View>
            </View>

            <Text style={[styles.modalTitle, mode.textColor]}>Morsecode Generator</Text>
            <View style={[styles.textInput_BtnWrapper, {opacity: morseCodeIsPlaying ? 0.6 : 1}]}>
                <TextInput 
                value={morseText} 
                placeholder='Enter text to morsecode'
                placeholderTextColor={props.darkMode ? "#ffffff33" : "#3B455A33"}
                selectionColor={'#FAF0F2'}
                maxLength={45}
                onChangeText={(val) => setMorseText(val)}
                onSubmitEditing={() => {
                    // playMorseCode(text, setMorseCodeIsPlaying)
                    setMorseCodeIsPlaying(true)
                }}
                editable={!morseCodeIsPlaying}

                style={[styles.textInput, mode.textColor]}
                />
                <TouchableNativeFeedback disabled={morseCodeIsPlaying} onPress={()=>{
                //   playMorseCode(morseText, setMorseCodeIsPlaying)
                    setMorseCodeIsPlaying(true)
                }} style={{flex: 1}}>
                    <View style={styles.generateButton}>
                        <TransmissionSVG />
                    </View>
                </TouchableNativeFeedback>
            </View>

            <View style={[styles.morseIndicatorWrapper, {backgroundColor: morseIndicatorColor}]}>
                <View style={styles.creditWrapper}>
                    <Credits width={65} height={(65*41) / 111} />
                </View>
                <Animated.View 
                    style={[styles.morseIndicatorTimeline, {width: morseTimelineWidth}]}
                ></Animated.View>
            </View>
          </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBg:{
        // backgroundColor: '#fff',
        minHeight: 400,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: 'hidden',
        width: dWidth,
        paddingHorizontal: 26,
    },
    nudgeWrapper:{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        flexDirection: 'row',

        marginBottom: 10
    },
    nudge:{
        height: 7,
        marginTop: 20,
        marginBottom: 20,
        maxWidth: 67,
        borderRadius: 1000,
        width: dWidth,
        backgroundColor: '#FFC477'
    },

    modalTitle:{
        fontSize: 18,
        fontWeight: "400",
        lineHeight: 18,
        textAlign: "center",
        // color: "#3B455A",

        marginBottom: 30
    },

    textInput_BtnWrapper:{
        flexDirection:'row',
        // maxWidth: dWidth
    },

    textInput:{
        flex: 1,
        width: '100%',
        height: 48,
        backgroundColor: "#FFC47712",
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(234, 166, 120, 0.59)",

        fontSize: 16,
        fontWeight: "400",
        // color: "#3B455A",

        paddingHorizontal: 10
    },

    generateButton:{
        width: 48,
        height: 48,
        backgroundColor: "#EAA678",

        justifyContent: 'center',
        alignItems: 'center'
    },


    morseIndicatorWrapper:{
        height: 146,
        borderRadius: 9,
        overflow: 'hidden',

        marginTop: 16,
    },

    morseIndicatorTimeline:{
        height: 146,
        backgroundColor: "#F3C8AA"
    },

    creditWrapper:{
        position: 'absolute',
        right: 15,
        bottom: 15,
        zIndex: 9999
    }
})
