import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import UserIcon from 'react-native-vector-icons/FontAwesome5'
import EmailIcon from 'react-native-vector-icons/Fontisto'
import PasswordIcon from 'react-native-vector-icons/Fontisto'
import { } from 'react-native-gesture-handler';
export default class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    state = {
      fullName: '',
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>

          {/* iconc and text  */}
          <View style={{flex:0.4}}>
          <View style={{flex:0.8,justifyContent:"center"}}>
         <Image source= {require("../../src/Images/signupicon.jpg")} style={{width:100,height:100,marginTop:10}}/>
         </View>
            
          <View style={{}}>
          <Text style={{fontSize:30,color:"#1a6cd8",fontWeight:'bold'}}>SIGNIN</Text>
          </View>
          </View>
        
       
       {/* input style */}
       <View  style={{flex:0.2}}>
    

 
        
    <View style={{flexDirection:"row",alignItems:"center",paddingLeft:15,
    height:45,width:350,backgroundColor:"white",marginBottom:20,borderWidth:0.7,borderColor:"#2b7de9",
      borderRadius:30}}>
         <EmailIcon  name="email"  size={25} color="#2a7ce8" />
        <TextInput placeholder="Enter your Email" placeholderTextColor="#b7b2ae"  keyboardType="number-pad" 
        style={{paddingLeft:10
        }}/>
    </View>
  
       </View>
  <View style={{flex:0.1}}>
  <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('dashboard')}>
          <Text style={styles.signUpText}>Reset Password</Text>
        </TouchableOpacity> 
  
  </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   alignItems:"center"
 
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:350,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#1f71de",
  },
  signUpText: {
    color: 'white',
    fontSize:20
  }
});