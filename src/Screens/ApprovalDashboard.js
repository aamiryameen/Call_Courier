import React from "react";
import { Alert, TouchableOpacity, Image, StyleSheet, StatusBar, View, Text, FlatList, ScrollView, AsyncStorage, ImageBackground } from "react-native";
import { Card, CardItem, Icon, Button } from 'native-base';
import constants from "./constants";
import LinearGradient from 'react-native-linear-gradient';


var profileData;
var token;
export default class ApprovalDashboard extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      viewToShow: <View></View>,
      isTokensScreen: false,
      isProgressHudVisible: false,
      btnRedeemText: "redeem",
      profileData: '',
      dataSource: ''
    }
  }

 
  renderItem(item, index) {
    return (
      <TouchableOpacity onPress={()=>this.props.context.props.navigation.navigate("ApprovalDashboardDetails")} 
      style={styles.buttonStyle}>



< ImageBackground   source={item.backImg}    style={styles.backgroundImg} >
 
  
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
         
         <Text
           style={styles.name}>
           {item.name}</Text>
       </View>
       <View style={{ flexDirection:"column-reverse", alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom:5}}>
         <Text
           style={styles.value}>
           {item.value}</Text>
       </View>

</ImageBackground>




          

        
        
      </TouchableOpacity>
    )

  }



  async componentWillMount() {
    this.setState({dataSource:[{name:"Bank Payments",value:15,backImg: require("../Images/Group22.png") },
    { name:"Journal-Dr Payments",value:15,backImg: require("../Images/Group23.png") } ,{name:"Cash Payments",value:15,
    backImg: require("../Images/Group24.png") } ,
    {name:"Journal-Cr Payments",value:15, backImg: require("../Images/Group25.png")},{name:"Bank Receipt",value:15,
    backImg: require("../Images/Group26.png") } ,
    {name:"Debit Note",value:15, backImg: require("../Images/Group27.png")},{name:"Credit Note",value:15,
    backImg: require("../Images/Group28.png") } ,
    {name:"Debit Note",value:15, backImg: require("../Images/Group29.png")},{name:"Credit Note",value:15,
    backImg: require("../Images/Group30.png") } ]})
  }


  render() {
    return (
      <View style={styles.container}>
<View style={styles.cardBg}>
      <FlatList
            style={{}}
            data={this.state.dataSource}
            numColumns={2}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          /> 
      </View>
      </View>
      
    );
  }
}



// define your styles

const styles = StyleSheet.create({
  container:{
flex:1,
backgroundColor:"#ebebeb",
  },
  cardBg:{
    flex: 0.96,
    flexDirection: 'column',
    backgroundColor:"#ebebeb",
    elevation:5,
    marginLeft:10,
    marginRight:10,
    marginTop:20,
    paddingTop:20,
    borderRadius:10

    
  },
  listItem: {

    elevation: 1,
    borderRadius: 30,
    flex: 1,
    // flexDirection: 'row',  // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 6,

    // borderBottomWidth: 1,
    // marginRight:10, marginLeft:10
  },
  coupenText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  attributeHeading: {
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 10,
    flex: 1
  },
  attributeHeadingValue: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 10,
    flex: 2
  },
  submitButton: {
    backgroundColor: '#2980b6',
    paddingVertical: 15
  },
  disclaimerButton: {
    justifyContent: 'flex-end',
    flex: 1,
    height: 30,
    width: 50,
    marginTop: 10,
  },
  disclaimerImage: {
    height: 40,
    width: 40,
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  backgroundImg:{
    height:100,
      width:"110%",
      borderRadius:20,
    },
    name:{
      textAlign:'center', fontFamily: constants.FontFamilyRegular, fontSize: 16,color:'white',
      fontWeight:'bold'
    },
    value:{
      fontSize: 16,color:'white',fontFamily: constants.FontFamilyRegular , alignItems: 'flex-end', justifyContent: 'flex-end' 
    },
    buttonStyle:{
      paddingLeft:10,paddingRight:20,flex:1,
      marginLeft:5,marginRight:20, marginTop:15,borderRadius:30,
    }
  
});