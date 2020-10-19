import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import UserIcon from 'react-native-vector-icons/FontAwesome5'
import EmailIcon from 'react-native-vector-icons/Fontisto'
import PasswordIcon from 'react-native-vector-icons/Fontisto'
export default class SignUp extends Component {

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
          <Text style={{fontSize:30,color:"#1a6cd8",fontWeight:'bold'}}>SIGNUP</Text>
          </View>
          </View>
        
       
       {/* input style */}
       <View  style={{flex:0.5}}>
       <View style={{flexDirection:"row",alignItems:"center",paddingLeft:15,
    height:45,width:350,backgroundColor:"white",marginBottom:20,borderWidth:0.7,borderColor:"#2b7de9",
      borderRadius:30}}>
        
        <UserIcon name="user" size={25} color="#2a7ce8"/>
        <TextInput placeholder="User Name" placeholderTextColor="#b7b2ae"  keyboardType="number-pad" 
        style={{ paddingLeft:10
        }}/>
    </View>

    <View style={{flexDirection:"row",alignItems:"center",paddingLeft:15,
    height:45,width:350,backgroundColor:"white",marginBottom:20,borderWidth:0.7,borderColor:"#2b7de9",
      borderRadius:30}}>
        <EmailIcon  name="email"  size={25} color="#2a7ce8" />
        <TextInput placeholder="Email" placeholderTextColor="#b7b2ae"  keyboardType="number-pad" 
        style={{paddingLeft:10
        }}/>
    </View>
        
    <View style={{flexDirection:"row",alignItems:"center",paddingLeft:15,
    height:45,width:350,backgroundColor:"white",marginBottom:20,borderWidth:0.7,borderColor:"#2b7de9",
      borderRadius:30}}>
          <PasswordIcon  name="locked"  size={25} color="#2a7ce8" />
        <TextInput placeholder="Password" placeholderTextColor="#b7b2ae"  keyboardType="number-pad" 
          style={{paddingLeft:10
          }}/>
    </View>
    <View style={{flexDirection:"row",alignItems:"center",paddingLeft:15,
    height:45,width:350,backgroundColor:"white",marginBottom:20,borderWidth:0.7,borderColor:"#2b7de9",
      borderRadius:30}}>
          <PasswordIcon  name="locked"  size={25} color="#2a7ce8" />
        <TextInput placeholder="Confirm Password" placeholderTextColor="#b7b2ae"  keyboardType="number-pad" 
          style={{paddingLeft:10
          }}/>
    </View>
       </View>
  <View style={{flex:0.2}}>
  <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('SignIn')}>
          <Text style={styles.signUpText}>SignUp</Text>
        </TouchableHighlight>
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
  }
});