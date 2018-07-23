import React from 'react';
import{Text,TouchableOpacity,Image} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';


  const Button=({onPress})=>{
   const {buttonStyle}=style;
    return (
      <TouchableOpacity onPress={onPress} >


    </TouchableOpacity>);


  }
  const style={
    buttonStyle:{

       width:150,
       height:50,

      backgroundColor:'#fff',
      borderRadius:10,
      borderWidth:1,
      borderColor:'#007aff',
      marginLeft:5,
      marginRight:5

    }

  };
  export default Button;
