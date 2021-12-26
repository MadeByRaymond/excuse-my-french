import { StyleSheet } from 'react-native'

export const lightModeStyles = StyleSheet.create({
    containerColor:{
      backgroundColor: '#FBF6F4'
    },
    actionButtonTextColor: {
      color: '#3B455A',
    },
  
  
    actionsDropdownColor:{
      backgroundColor: '#FFF7F8',
      borderColor:'#F8DCCE',
      // elevation: 4,
  // box-shadow: 0px 0px 4px rgba(234, 166, 120, 0.15);
    },
    actionsDropdownItemDividerColor:{
      borderTopColor:'#F8DCCE'
    },
    actionsDropdownItemTextColor:{
      color: '#3B455A',
    },
  
  
    modalBg:{
      backgroundColor: '#FFF7F8'
    },
    textColor:{
      color: '#3B455A'
    },
  
  });

export const darkModeStyles = StyleSheet.create({
    containerColor:{
      backgroundColor: '#192734'
    },
    actionButtonTextColor: {
      color: '#E3F1FC',
    },
  
  
    actionsDropdownColor:{
      backgroundColor: '#22303C',
      borderColor:'#FFFFFF',
      // elevation: 4,
  // box-shadow: 0px 0px 4px rgba(234, 166, 120, 0.15);
    },
    actionsDropdownItemDividerColor:{
      borderTopColor:'#FFFFFF'
    },
    actionsDropdownItemTextColor:{
      color: '#FFFFFF',
    },
  
  
    modalBg:{
      backgroundColor: '#22303C'
    },
    textColor:{
      color: '#fff'
    },
  
  });
