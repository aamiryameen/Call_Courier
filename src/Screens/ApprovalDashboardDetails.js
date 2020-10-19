import React, { Component } from 'react';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,

  FlatList
} from 'react-native';
//import basic react native components
import constants from "./constants";
import {
  Header,
  Left,
  Button,
  Icon,
  Right,
  Body,
  Title,
  Card,
  CardItem,
} from 'native-base';
// import { CheckBox } from 'react-native-elements'
// import CheckBox from 'react-native-check-box'
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckboxFormX from 'react-native-checkbox-form';
import CheckBox from '@react-native-community/checkbox';


const mockData = [
  {
    label: 'update',
    value: 'one'
  },

];
export default class ApprovalDashboardDetails extends Component {



  constructor() {

    super();
    this.state = {
      mockData: [
        {
          label: 'update',
          value: false
        },

      ],

      headerCheckbox: false,
      dataSource: [
        {
          key: "3344423", date: "22 May,220", ammount: "Amount", account: "Account", ammountNum: "53249534", Journal: "Journal",
          type: "Type", isChecked: false, index: false,
          remarks: "Remarks", image: require("../Images/approve.png")

        },
        {
          key: "3344423", date: "22 May,220", ammount: "Amount", account: "Account", ammountNum: "53249534", Journal: "Journal", type: "Type", isChecked: false
          , index: false, remarks: "Remarks", image: require("../Images/approve.png")

        },
        {
          key: "3344423", date: "22 May,220", ammount: "Amount", account: "Account", ammountNum: "53249534", Journal: "Journal", type: "Type", isChecked: false
          , index: false, remarks: "Remarks", image: require("../Images/approve.png")

        },
        {
          key: "3344423", date: "22 May,220", ammount: "Amount", account: "Account", ammountNum: "53249534", Journal: "Journal", type: "Type",
          index: false, isChecked: false
          , remarks: "Remarks", image: require("../Images/approve.png")

        },
        {
          key: "3344423", date: "22 May,220", ammount: "Amount", account: "Account", ammountNum: "53249534", Journal: "Journal", type: "Type", isChecked: false
          , index: false, remarks: "Remarks", image: require("../Images/approve.png")

        },
        {
          key: "3344423", date: "22 May,220", ammount: "Amount", account: "Account", ammountNum: "53249534", Journal: "Journal", type: "Type", isChecked: false
          , index: false, remarks: "Remarks", image: require("../Images/approve.png")

        },
        {
          key: "3344", date: "22 May,220", ammount: "Amount", account: "Accoun", ammountNum: "532495", Journal: "Journal", type: "Type", isChecked: false
          , index: 6, remarks: "Remarks", image: require("../Images/approve.png")

        }
      ]

    };
  }

  _onSelect = (item) => {
    this.setState({ value: true })
  };


  renderSeparator = () => {
    return (
      <Image source={require('../../src/Images/Line.png')} style={{ width: "100%", height: 1, marginTop: 10 }} />
    );
  };
  onPressCheckBox = (item) => {
    if (item.item.isChecked) {
      !item.item.isChecked
    }
    else {
      item.item.isChecked
    }
  }
  handleToggleChangeFromFlatlist(index)
  
  {
    var checkedDS = []
    for (i = 0; i<this.state.dataSource.length; i++) {
      var element=this.state.dataSource[i];
      if(index==i)
      { 
        element.isChecked =!element.isChecked 
      }
      checkedDS.push(element);
    }
    
    this.setState({ dataSource: checkedDS},()=>{
      this.unCheckedHeaderBox()
    })
  }
  unCheckedHeaderBox(){
   this.state.dataSource.map(element=>{
    if (element.isChecked==false){
      this.setState({headerCheckbox:false})
          }
   })
   
        
      
      

    }

  

  //   var checkedDS = []
  //   for (i = 0; i < this.state.dataSource.length; i++) {
  //     var element=this.state.dataSource[i];
    

  //     {
  //       element.isChecked = !element.isChecked

       
       
  //     checkedDS.push(element);
  //   }
    
  //   this.setState({ dataSource: checkedDS })

  // }


  renderItemsData(item, index) {
    return (
      <View style={styles.cardBox}>
        <View style={styles.cardItems}>
          <Text style={styles.text}  >{item.item.key}</Text>
          <Text style={{ paddingTop: 20, paddingLeft: 10 }} >{item.item.ammount}</Text>
          <Text style={{ paddingTop: 5, paddingLeft: 10, color: "#d3d3d3" }} >{item.item.Journal}</Text>
          <Text style={{ paddingTop: 20, paddingLeft: 10 }} >{item.item.type}</Text>
          <Text style={{ paddingTop: 5, paddingLeft: 10, color: "#d3d3d3" }} >{item.item.Journal}</Text>
        </View>
        <View style={styles.cardItems}>
          <Text style={{ color: "#2eb725", paddingTop: 15 }}>{item.item.date}</Text>
          <Text style={{ paddingTop: 20, }} >{item.item.account}</Text>
          <Text style={{ paddingTop: 5, color: "#d3d3d3" }} >{item.item.ammountNum}</Text>
          <Text style={{ paddingTop: 20, }} >{item.item.remarks}</Text>
          <Text style={{ paddingTop: 5, color: "#d3d3d3" }} >{item.item.Journal}</Text>
        </View>
        <View style={{ justifyContent: "flex-end", flexDirection: "column", marginRight: 15, paddingRight: 10 }}>
          <CheckBox
            disabled={false}
            value={item.item.isChecked}
            onValueChange={() =>
              this.handleToggleChangeFromFlatlist(item.index)}/>
        </View>
      </View>

    )
  }
  toggleCheckBox() {

    this.setState({ headerCheckbox: !this.state.headerCheckbox },
      () => {
        var checkedDS = []
        this.state.dataSource.forEach(element => {
          if (this.state.headerCheckbox == true) {

            element.isChecked = true




          }

          else
            element.isChecked = false;
          checkedDS.push(element);
        });
        this.setState({ dataSource: checkedDS })
      })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: constants.skyBlue, flexDirection: 'row', padding: 10, }}>
          <Button onPress={() => this.props.navigation.goBack()} transparent>
            <AntDesign name={"arrowleft"} fontWeight={'bold'} size={30} color="white" style={{ paddingTop: 7 }} />
          </Button>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 5 }}>
            <Title style={{ color: constants.colorWhite, textAlign: 'center', }}>Payment Voucher Details</Title>
          </View>
          <View>
            
              <View style={{ marginTop:7 }}>
                <CheckBox
                  paddingLeft={20}
                  disabled={false}
                  onPress={() => { item.isChecked }}
                  tintColors={{ true: 'white', false: 'white' }}
                  value={this.state.headerCheckbox}
                  onValueChange={() => this.toggleCheckBox()}
                />
              </View>
           


          </View>
        </View>

        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItemsData.bind(this)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listItem: {

    elevation: 1,
    borderRadius: 2,
    flex: 1,
    // flexDirection: 'row', // main axis
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
  orderDetailTitleCell: {
    backgroundColor: constants.colorGreyBG, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: constants.colorGrey, borderRightColor: constants.colorGrey
  },
  orderDetailTitleText: {
    paddingTop: 12, paddingBottom: 12, fontSize: 12, color: 'white', fontFamily: constants.FontFamilyBold
  },
  orderDetailTitleBlack: {
    paddingTop: 12, paddingBottom: 12, fontSize: 14, fontFamily: constants.FontFamilyRegular, color: 'black'
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
  headerStyel: {
    flexDirection: "row",
    flex: 0.1,

    width: "100%",
    backgroundColor: "#2680eb",

    justifyContent: "space-between",
    alignItems: "center",


  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    flex: 0.8
  },
  cardBox: {

    marginTop: 10,
    backgroundColor: "#ffffff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.21,
    marginBottom: 10

  },
  cardItems: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10
  },
  text: {
    fontWeight: "bold",
    paddingTop: 15,
    paddingLeft: 10
  }
});
//Dummy content to show
//You can also use dynamic data by calling webservice
// const CONTENT = [
//   {
//     isExpanded: false,
//     category_name: 'Item 1',
//     subcategory: [{ id: 1, account: '1122', remarks: '2222', debit: '2222', credit: '2222' },],
//   }, {
//     isExpanded: false,
//     category_name: 'Item 9',
//     subcategory: [{ id: 1, account: '1122', remarks: '2222', debit: '2222', credit: '2222' },],
//   },
//   {
//     isExpanded: false,
//     category_name: 'Item 10',
//     subcategory: [{ id: 1, account: '1122', remarks: '2222', debit: '2222', credit: '2222' },],
//   },
//   {
//     isExpanded: false,
//     category_name: 'Item 11',
//     subcategory: [{ id: 1, account: '1122', remarks: '2222', debit: '2222', credit: '2222' },],
//   },
//   {
//     isExpanded: false,
//     category_name: 'Item 12',
//     subcategory: [{ id: 1, account: '1122', remarks: '2222', debit: '2222', credit: '2222' },],
//   },
// ];


