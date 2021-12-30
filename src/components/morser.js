
const morseCode = {
  // Letters
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
  // Digits
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
  // Punctuation Marks
    "&": "._...",
    "'": ".____.",
    "@": ".__._.",
    ")": "_.__._",
    "(": "_.__.",
    ":": "___...",
    ",": "__..__",
    "=": "_..._",
    "!": "_._.__",
    ".": "._._._",
    "-": "_...._",
    "*": "_.._",
    "%": "______.._._____",
    "+": "._._.",
    "\"": "._.._.",
    "?": "..__..",
    "/": "_.._.",
  // Accented Letters
    "à": ".__._",
    "å": ".__._",
    "ä": "._._",
    "ą": "._._",
    "æ": "._._",
    "ć": "_._..",
    "ĉ": "_._..",
    "ç": "_._..",
    "ch": "____",
    "ĥ": "____",
    "š": "____",
    "đ": ".._..",
    "é": ".._..",
    "ę": ".._..",
    "è": "._.._",
    "ł": "._.._",
    "ĝ": "__._.",
    "ĵ": ".___.",
    "ń": "__.__",
    "ñ": "__.__",
    "ó": "___.",
    "ö": "___.",
    "ø": "___.",
    "ś": "..._...",
    "ŝ": "..._.",
    "þ": ".__..",
    "ü": "..__",
    "ŭ": "..__",
    "ź": "__.._.",
    "ż": "__.._",
  // Prosigns
    " ": " ",
}


export const morser = (text = "") => {
    // setText(text)

    let textArray = text.split("")

    let morseEq = ""

    if (text) {
      textArray.forEach(char => {
        let val = morseCode[char.toLowerCase()];
        morseEq += (val) ? val + '~' : ''
      });
    }
// console.log(morseEq);
    return morseEq;

    // setMorse(morseEq)
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 export const morserPlayer = async (array, audio, isPlaying, indicatorColor, timelineWidth, fullTimelineWidth) => {
   
  audio.play();
  // console.log('array ==> ', array);
    for (let i = 0; i < array.length ; i++) {
      if(!isPlaying){
        break;
      }
      //  console.log(array[i]);
       timelineWidth(((i+1) / array.length) * fullTimelineWidth)
       switch (array[i]) {
        case '.':
          indicatorColor('#EFE0E3');
          audio.play();
          await sleep(120);
          audio.stop();
          indicatorColor('#FAF0F2');
        break;
      
        case '_':
          indicatorColor('#EFE0E3');
          audio.play();
          await sleep(360);
          audio.stop();
          indicatorColor('#FAF0F2');
        break;
      
        case '~':
          await sleep(10);
        break;
      
        case ' ':
          await sleep(400);
        break;
       
         default:
           break;
       }

       await sleep(30);
    }
    
    audio.stop();
    indicatorColor('#FAF0F2');
    timelineWidth(1)
 }