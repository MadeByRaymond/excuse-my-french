import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableNativeFeedback, View, TouchableOpacity } from 'react-native'

import Modal from "react-native-modal";

import Sound from 'react-native-sound';

import Svg, { Path } from "react-native-svg"

import * as ModeStyles from './styles';


let dWidth = Dimensions.get('window').width;

export default function changeSoundModal(props) {
    let testSound = new Sound(props.soundFiles.files[props.soundFiles.activeSound]);
    let stopTimeout = setTimeout(() => { }, 1000);
    let mode = props.darkMode ? ModeStyles['darkModeStyles'] : ModeStyles['lightModeStyles'];

    let soundItems = [];
    let soundItemsIndex = 0;

    for (const key in props.soundFiles.files) {
        // if (Object.hasOwnProperty.call(object, key)) {
        //     const element = object[key];
            
        // }
        // console.log(props.soundFiles.activeSound);
        soundItemsIndex += 1;

        soundItems.push(
            <TouchableNativeFeedback key={soundItemsIndex} onPress={() => {props.setActiveSound(key)}}>
                <View style={[styles.selectItem, {backgroundColor: (key == props.soundFiles.activeSound) ? '#FFC477' : 'transparent'}]}>
                    <Text style={[styles.selectItemText, (key == props.soundFiles.activeSound) ? {color: '#3B455A'} : mode.textColor]}>Sound {soundItemsIndex} - {key.substring(0,1).toUpperCase() + key.substring(1).replace('_', ' ')}</Text>
                    <TouchableOpacity activeOpacity={0.6} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
                        onPress={() => {
                            testSound.isPlaying ? testSound.stop() : null;
                            clearTimeout(stopTimeout);
                            testSound = new Sound(props.soundFiles.files[key], (error)=>{
                                if(error){
                                    //Do nothing
                                }else{
                                    testSound.play();
                                    stopTimeout = setTimeout(() => {
                                        testSound.isPlaying ? testSound.stop() : null;
                                    }, 2000);
                                }
                            });
                        }}
                    >
                        <Svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                            d="M1.5 11.22V6.78c0-.43.336-.78.75-.78h2.69a.735.735 0 0 0 .53-.229l2.25-2.54C8.192 2.737 9 3.086 9 3.781v10.436c0 .7-.818 1.046-1.287.544l-2.242-2.527A.735.735 0 0 0 4.934 12H2.25c-.414 0-.75-.35-.75-.78ZM12 6.375c1 1.333 1 3.916 0 5.25M14.25 3.75c2.991 2.856 3.009 7.663 0 10.5"
                            stroke={(key == props.soundFiles.activeSound) ? "#3B455A" : "#EB7630"}
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
        )
    }

    return (
        <Modal 
          isVisible={props.isVisible}
          onBackdropPress={() => {props.closeModalFunc(null); testSound.isPlaying ? testSound.stop() : null;}}
          onSwipeComplete={() => {props.closeModalFunc(null); testSound.isPlaying ? testSound.stop() : null;}}
          onBackButtonPress={() => {props.closeModalFunc(null); testSound.isPlaying ? testSound.stop() : null;}}
          swipeDirection="down"
          style={{justifyContent:'flex-end', margin: 0}}
        >
            <View 
                style={[styles.modalBg, mode.modalBg]}
            >
                <View style={styles.nudgeWrapper}>
                <View style={styles.nudge}></View>
                </View>

                <Text style={[styles.modalTitle, mode.textColor]}>Change Sound</Text>

                <View>
                    {soundItems}
                </View>
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBg:{
        // backgroundColor: '#fff',
        minHeight: 358,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: 'hidden',
        width: dWidth,
        paddingHorizontal: 26,
        paddingBottom: 50,
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

    selectItem:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 15,
    },
    selectItemText:{
        fontSize: 16,
        fontWeight: "400"
    }
})
