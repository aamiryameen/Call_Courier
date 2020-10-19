



import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button,ScrollView ,TextInput,Picker,Image,ImageBackground,
     Platform,
    TouchableWithoutFeedback,} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/dist/AntDesign';
import EditIcon from 'react-native-vector-icons/AntDesign'
import Downarrow from 'react-native-vector-icons/Ionicons'
import constants from './constants'
import CheckBox from 'react-native-check-box'
// import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from "prop-types";
import { I18nManager } from 'react-native';
// import { TextInput } from 'react-native-paper';
import InputOutline from 'react-native-input-outline';
// import DropdownMenu from 'react-native-dropdown-menu';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize';
import { Chevron } from 'react-native-shapes';
import Ionicons  from "react-native-vector-icons/Ionicons";
// import DropDownItem from 'react-native-drop-down-item';
import { Dropdown } from 'react-native-material-dropdown';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';


const translationGetters = {
    en: () => require('../../src/locales/en.json'),
    // nl: () => require('./src/translations/nl.js'),?
    ur: () => require('../../src/locales/ur.json')
}
const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
)
const data = [  {

    label: "Federal income tax",
    value: 'FT',
}, {
    label: "State and local income taxes ",
    value: 'ST',
},
{
    label: "Progressive taxes ",
    value: 'PT',
}
];


export default class JournalCreditVoucher extends Component {
    constructor(props) {
        super(props);
        
  
      
        this.state = {
            isChecked: true,
            checked: true,
            visibleModal: null,
           
            startPeriod: '',
            endPeriod: '',
            pageRefresh: false,
            country: "",
            Code:"",
            data: {},
        }
          

        constants.env = this;
        
      
    }
  
   

    setI18nConfig(lang) {
        const fallback = { languageTag: "en", isRTL: false };

        const { languageTag, isRTL } =
            RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
            fallback;
        translate.cache.clear();
        I18nManager.forceRTL(isRTL);
        i18n.translations = { [lang]: translationGetters[lang]() };
        i18n.locale = lang;
        this.setState({ pageRefresh: true })
    };
    setI18nConfigDefault() {
        const fallback = { languageTag: "en", isRTL: false };

        const { languageTag, isRTL } =
            RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
            fallback;
        translate.cache.clear();
        I18nManager.forceRTL(isRTL);
        if (languageTag == "en" || languageTag === "ur") {
            i18n.translations = { [languageTag]: translationGetters[languageTag]() };
            i18n.locale = languageTag;
        }
        else {
            i18n.translations = { [config.defaultLanguage]: translationGetters[config.defaultLanguage]() };
            i18n.locale = config.defaultLanguage;
        }

        this.setState({ pageRefresh: true })
    };
    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
        this.checkLang();
    }
    handleLocalizationChange = () => {
        this.setI18nConfigDefault();
        this.forceUpdate();
    };
    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }
    setLanguage(value) {
        this.setI18nConfig(value);
    }
    checkLang = async () => {
        try {
            const langSelected = await AsyncStorage.getItem('selectLang');
            if (langSelected !== null) {
                this.setLanguage(langSelected)
                this.setState({ lang: langSelected })
            }
            else {
                this.setI18nConfigDefault();
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    handleCountry = (text) => {
        this.setState({ country: text })
    }
    handleStartPeriod = (text) => {
        this.setState({ startPeriod: text })
    }
    handleCode = (text) => {
        this.setState({ code: text })
    }
    handleEndPeriod = (text) => {
        this.setState({ endPeriod: text })
    }
    login = (code, startPeriod, endPeriod) => {
        alert('code: ' + code + '  StartPeriod: ' + startPeriod + "EndPeriod:" + endPeriod)
    }
    static propTypes = {
        headerTitle: PropTypes.object.isRequired,
        headerContext: PropTypes.object.isRequired,
        parentContext: PropTypes.object.isRequired,
    }
    
  _saveLang = async (country) => {

    
    this.setState({
      lang: lang,
    });
    try {
      await AsyncStorage.setItem('selectLang', lang).then((value) => {
        this.setLanguage(lang);
        
      })

    } catch (error) {
      // Error saving data
    }
    constants.env.setI18nConfig(lang);
    constants.env1.setI18nConfig(lang);
    // this.props.parentContext.getSidebarProps(lang);
  }
    _renderButton = (text, onPress) => (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>

            <TouchableOpacity onPress={onPress} style={{ width: 190, height: 70 }} >
                <View style={styles.button}>
                    <Text style={{ color: "#fff" }}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={{ color: "#2b7de9", fontSize: 20,fontWeight:"bold" }}>{translate("AddTaxSchedule")}</Text>
            <View style={{width:"90%",paddingTop:10}}> 
            
            
               <Text style={{ marginLeft:3,color:"#2b7de9"}}>{translate("ScheduleCode")}</Text>
            <View style={{flexDirection:"row",alignItems:"center",paddingLeft:15,
    height:45,width:270,backgroundColor:"white",marginBottom:20,borderBottomWidth:0.7,borderColor:"#2b7de9",
      borderRadius:10}}>
   
        <TextInput placeholder= {translate("typeHere")} placeholderTextColor="#e0dbdb"  keyboardType="number-pad" 
          style={{paddingLeft:10
          }}/>
    </View>
           
    
    <Text style={{ marginLeft:3,color:"#2b7de9"}}>{translate("TaxType")}</Text>
            <View style={{flexDirection:"row",alignItems:"center",paddingLeft:15,
    height:45,width:270,backgroundColor:"white",marginBottom:20,borderBottomWidth:0.7,borderColor:"#2b7de9",
      borderRadius:10}}>
   
        <TextInput placeholder={translate("typeHere")} placeholderTextColor="#e0dbdb"  keyboardType="number-pad" 
          style={{paddingLeft:10
          }}/>
    </View>


<View/>


{/* and iOS onUpArrow/onDownArrow toggle example */}
{/* <Text style={{ marginLeft:3,color:"#2b7de9",marginTop:15}}>Type</Text> */}
<View >
<Text style={{ marginLeft:3,color:"#2b7de9",marginTop:4}}>{translate("EffectedDate")}</Text>
<Dropdown
baseColor="#2b7de9"
textColor="#2b7de9"
selectedItemColor="#2b7de9"
borderBottomWidth={0}
        label={translate("typeHere")}
        data={data} />
</View>


   
<Text style={{ marginLeft:3,color:"#2b7de9",marginTop:10}}>{translate("TaxPercent")}</Text>
            
            
            <View style={{flexDirection:"row",paddingLeft:15,paddingLeft:10,
     }}>
   <View style={{justifyContent:"flex-start",}}>
   <TextInput placeholder={translate("typeHere")} placeholderTextColor="#e0dbdb"  keyboardType="number-pad" 
          style={{paddingLeft:10 ,borderBottomWidth:0.7,borderBottomColor:"#2b7de9",width:100,
          }}/>
   </View>
     <View  style={{justifyContent:"flex-end",paddingLeft:30,marginLeft:20}}>
     <TouchableOpacity style={{width:110,height:30,backgroundColor:"#2b7de9", borderRadius: 20,justifyContent:"flex-end",
     justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"white",}}>
              {translate("AddNewRow")}
              </Text>
          </TouchableOpacity>
     </View>
    
    </View>

<View  />
  


     
            </View>


            {this._renderButton(translate('SaveChanges'), () => this.setState({ visibleModal: null }))}
            {this._renderButton(translate('Close'), () => this.setState({ visibleModal: null }))}
        </View>
    );

    render() {
        return (
            <View style={styles.container}>

                {/* <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
                    {this._renderButton(translate('ApproveVoucher'), () => this.setState({ visibleModal: 2 }))}
                    {this._renderButton(translate('Close'), () => this.setState({ visibleModal: 2 }))}
                </View> */}


                {/* <Modal isVisible={this.state.visibleModal === 1}>
                    {this._renderModalContent()}
                </Modal> */}
                <Modal
                    isVisible={this.state.visibleModal === 2}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                >
                    {this._renderModalContent()}
                </Modal>
                <View style={{flexDirection:"row",justifyContent:"flex-end",marginRight:5,height:40,margin:10}}>
                <TouchableOpacity style={{backgroundColor:"#2b7de9",width:"30%",justifyContent:"center",alignItems:"center",borderRadius:20,marginRight:5}}>
    <Text style={{color:"white"}}>{translate("Close")}</Text>
</TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"#2b7de9",width:"40%",justifyContent:"center",alignItems:"center",borderRadius:20}}>
    <Text style={{color:"white"}}> {translate("ApproveVoucher")}</Text>
</TouchableOpacity>
                </View>
         
                {/* Blue Box style 1 */}

<View style={{ backgroundColor: "#2b7de9", height:250 ,marginTop:15,flexDirection:"column",justifyContent:"center",}}>

                    
<View style={{ flexDirection: "column" ,justifyContent:"center",paddingTop:20,marginRight:10,flex:0.5,paddingRight:20,justifyContent:"center"}} >
        <View style={{ flexDirection: "row",paddingRight:10 ,flex:0.5,marginTop:2}}>
            <View style={{flexDirection:"row",justifyContent:"flex-start",flex:1,marginTop:4,marginLeft:2}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("Type")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
           
            <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:30,marginRight:10,marginTop:4}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("ChequeNumber")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
      
      
        </View>
        <View style={{ flexDirection: "row",paddingRight:10 ,flex:0.5,marginTop:4}}>
            <View style={{flexDirection:"row",justifyContent:"flex-start",flex:1,marginTop:4,marginLeft:2}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("Code")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
           
            <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:30,marginRight:10,marginTop:4}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("Amount")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
      
      
        </View>
        <View style={{ flexDirection: "row",paddingRight:10 ,flex:0.5,marginTop:4}}>
            <View style={{flexDirection:"row",justifyContent:"flex-start",flex:1,marginTop:4,marginLeft:2}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("Date")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
           
            <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:30,marginRight:10,marginTop:4}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("Bank")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
      
      
        </View>
        <View style={{ flexDirection: "row",paddingRight:10 ,flex:0.5,marginTop:4}}>
            <View style={{flexDirection:"row",justifyContent:"flex-start",flex:1,marginTop:4,marginLeft:2}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
            {translate("Remarks")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
           
            <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:30,marginRight:10,marginTop:4}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("Approved")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
      
      
        </View>
        <View style={{ flexDirection: "row",paddingRight:10 ,flex:0.5,marginTop:4}}>
            <View style={{flexDirection:"row",justifyContent:"flex-start",flex:1,marginTop:4,marginLeft:2}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("Amount")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
           
            <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:30,marginRight:10,marginTop:4}}>
            <Text style={{ color: "white", fontSize: 12 ,marginStart:5}}>
                {translate("Type")}</Text>

            <Text style={{ color: "white", fontSize: 12,marginStart:2}}>:</Text>
            </View>
      
      
        </View>

<View>

</View>

    </View>
    <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:30,marginRight:10,flex:0.3}}>
<Downarrow  style={{ paddingRight:10,}}
name="ios-arrow-down" size={28} color="white"/>
</View>
</View>


{/* box 2  */}

<View style={{ height: 100, backgroundColor: "white", margin:0.2 ,borderBottomWidth:1,borderBottomColor:"#d9d9d9",height:100}}>
<View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
<Image source={require('../Images/left.png')} style={{ height: 100, width: 20 }} />
<View style={{flexDirection:"column",flex:1}}>
    <View style={{flexDirection:"row",}}>
    <View  style={{flexDirection:"row",justifyContent:"flex-start",}} >
<Text style={{ color: "#1b6bd4" ,marginLeft:5}}>{translate("Amount")}</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:2}}>:</Text>

</View>
<View  style={{flexDirection:"row",justifyContent:"flex-end",flex:0.8}} >
<Text style={{ color: "#1b6bd4" ,marginLeft:5}}>{translate("DebitAmount")}</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:2}}>:</Text>

</View>
    </View>
    <View style={{flexDirection:"row",marginTop:5,}}>
    <View  style={{flexDirection:"row",justifyContent:"flex-start",flex:0.8}} >
<Text style={{ color: "#1b6bd4" ,marginLeft:5}}>{translate("Comment")}</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:2}}>:</Text>

</View>
<View  style={{flexDirection:"row",justifyContent:"flex-end"}} >
<Text style={{ color: "#1b6bd4" ,marginLeft:5}}>{translate("CreditAmount")}</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:2}}>:</Text>

</View>
    </View>
    <View  style={{flexDirection:"row",justifyContent:"flex-end",marginRight:15,paddingRight:48,marginTop:5}} >
<Text style={{ color: "#1b6bd4" ,}}>{translate("WHT")}</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:2}}>:</Text>

</View>

</View>
</View>



{/* <View style={{  padding: 10,flexDirection:"row",marginLeft:5,justifyContent:"flex-start",alignItems:"center" }} >
  <Text style={{ color: "#1b6bd4" ,marginLeft:5}}>{translate("TaxName")}</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:2}}>:</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:10}}>{translate("AamirYameen")}</Text>
</View> */}

{/* <View style={{ padding: 10,flexDirection:"row",marginLeft:5,justifyContent:"flex-start",alignItems:"center" }} >
  <Text style={{ color: "#1b6bd4" ,marginLeft:5}}>{translate("Percent")}</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:2}}>:</Text>
  <Text style={{ color: "#1b6bd4" ,marginLeft:10}}>{translate("12%")}</Text>
</View> */}

</View>
</View>
         


     
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    button: {
        backgroundColor: '#2b7de9',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        color: "white",
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        flex: 1,
        marginTop:10
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 22,
        // flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    input: {
        // margin: 15,
        // height: 40,
        borderColor: '#7aa6ef',
        borderWidth: 0.6,
        marginTop:5,
        // borderRadius: 10,
        width: "100%"

    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      scrollContainer: {
        flex: 1,
        paddingHorizontal: 15,
      },
      scrollContentContainer: {
        paddingTop: 40,
        paddingBottom: 10,
      },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth:0.5,
      borderColor: '#2b7de9',
      borderRadius: 4,
      color: '#2b7de9',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderBottomWidth:0.5,
      borderColor: '#2b7de9',
      borderRadius: 8,
      color: '#2b7de9',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });