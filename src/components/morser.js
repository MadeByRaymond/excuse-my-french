import React, { useState } from 'react';

const morseCode = {
    "a": "._",
    "b": "_...",
    "c": "_._.",
    "d": "_..",
    "e": ".",
    "f": ".._.",
    "g": "__.",
    "h": "....",
    "i": "..",
    "j": ".___",
    "k": "_._",
    "l": "._..",
    "m": "__",
    "n": "_.",
    "o": "___",
    "p": ".__.",
    "q": "__._",
    "r": "._.",
    "s": "...",
    "t": "_",
    "u": ".._",
    "v": "..._",
    "w": ".__",
    "x": "_.._",
    "y": "_.__",
    "z": "__..",
    "0": "_____",
    "1": ".____",
    "2": "..___",
    "3": "...__",
    "4": "...._",
    "5": ".....",
    "6": "_....",
    "7": "__...",
    "8": "___..",
    "9": "____.",
}


export const morser = (text = "") => {
    // setText(text)

    let textArray = text.split("")

    let morseEq = ""

    if (text) {
      textArray.forEach(char => {
        let val = morseCode[char.toLocaleLowerCase()]
        morseEq += (val) ? val : ''
      });
    }

    return morseEq;

    // setMorse(morseEq)
}


// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//  }
//  async function Tutor() {
//     document.write('Hello Toturix');
//     for (let i = 1; i <20 ; i++) {        
//        await sleep(3000);
//        document.write( i +" "+"Welcome to tutorix" + " " + "</br>");
//     }
//  }
//  Tutor()