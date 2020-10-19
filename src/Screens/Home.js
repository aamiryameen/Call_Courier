import React, { Component } from 'react';
import { Image ,Button,View,Text,TouchableOpacity,StyleSheet} from 'react-native';
// import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View} from 'native-base';


// import Logout from '../Screen/Logout';

export default class HomeScreen extends React.Component {

render(){
    return(

        <View style={{flex:1}}>
<View style={{flex:0.3,justifyContent:"center",flexDirection:"row",alignItems:"center"}}>
    <Image source={source=require("../../src/Images/ecount.jpg")} style={{height:130,width:130}}/>
</View>
<View style={{justifyContent:"center",alignItems:"center",flex:0.5}}> 
<TouchableOpacity style={styles.button} title="Sign Up">
    <Text style={{color:"white",justifyContent:"center",alignItems:"center",textAlign:"center",flexDirection:"row",marginTop:8}}>Sign Up</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} title="Sign Up">
    <Text style={{color:"white",justifyContent:"center",alignItems:"center",textAlign:"center",flexDirection:"row",marginTop:8}}>Sign In</Text>
</TouchableOpacity>
</View>
           
        </View>
    )
}
}

const styles=StyleSheet.create({

    button:{
        backgroundColor:"#2577e3",
    color:"white",
    margin:10,
    width:"80%",
    borderRadius:20,
    height:40


    }
})