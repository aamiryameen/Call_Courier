



import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button,ScrollView ,TextInput,Picker,
     Platform,
    TouchableWithoutFeedback,} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/dist/AntDesign';
import EditIcon from 'react-native-vector-icons/AntDesign'
import constants from '../Screens/constants'
import CheckBox from 'react-native-check-box'
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from "prop-types";
import { I18nManager } from 'react-native';
// import { TextInput } from 'react-native-paper';
import InputOutline from 'react-native-input-outline';
import DropdownMenu from 'react-native-dropdown-menu';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize';
import { Chevron } from 'react-native-shapes';
import Ionicons  from "react-native-vector-icons/Ionicons";
import DropDownItem from 'react-native-drop-down-item';
// import { Dropdown } from 'react-native-material-dropdown';
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

    label: "Pakistan",
    value: 'Pak',
}, {
    label: "America ",
    value: 'US',
},
{
    label: "China ",
    value: 'ch',
}
];


export default class FinancialYear extends Component {
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

            <TouchableOpacity onPress={onPress} style={{ width: 180, height: 70 }} >
                <View style={styles.button}>
                    <Text style={{ color: "#fff" }}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={{ color: "#2b7de9", fontSize: 20 }}>{translate("AddBankDefinition")}</Text>
            <View style={{width:"90%",paddingTop:10}}> 
            
            
               
             <View style={{flex:0.4}}>
               <Text style={{color:"#2b7de9",}}> {translate("BankCode")}:</Text>
               </View>
                 
            
           
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder ={translate("typeHere")} 
               fontSize={20}
               placeholderTextColor = "#e0dbdb"
               autoCapitalize = "none"
               onChangeText = {this.handleCode}/>
            
           
           
       
          
            
            
            <View style={{flex:0.4,paddingTop:10}}>
               <Text style={{color:"#2b7de9",}}>  {translate("BankDescription")}:</Text>
               </View>
                 
            
           
            
            <TextInput style = {styles.input}

               underlineColorAndroid = "transparent"
               placeholder = {translate("typeHere")}
               fontSize={20}
               placeholderTextColor = "#e0dbdb"
               autoCapitalize = "none"
               onChangeText = {this.handleCode}/>


<View   />


{/* and iOS onUpArrow/onDownArrow toggle example */}

<Dropdown
label={translate("Country")}
data={data}
textColor="#7aa6ef"
selectedItemColor='#7aa6ef'
textColor="#7aa6ef"
// value={this,this.state.lang}
// onPress={this.saveUserData}
onChangeText={value => {this._saveLang(value)}}
baseColor="#7aa6ef"
/>
{/* <View style={{borderBottomWidth:0.6,borderBottomColor:"#7aa6ef"}}></View> */}

<View  />
  


     
            </View>


            {this._renderButton(translate('SaveChanges'), () => this.setState({ visibleModal: null }))}
            {this._renderButton(translate('Close'), () => this.setState({ visibleModal: null }))}
        </View>
    );

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
                    {this._renderButton(translate('AddBankDefinition'), () => this.setState({ visibleModal: 2 }))}
                </View>


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
                {/* Blue Box style 1 */}

                <View style={{ backgroundColor: "#ebebeb", flex: 0.22, borderRadius: 10, marginLeft: 10, marginRight: 10 }}>


                    <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, marginLeft: 20, marginRight: 20 }} >
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("BankCode")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>      {translate("MCB")}</Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("BankDescription")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("MCBBankLTD")}</Text>

                        </View>
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("CountryName")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("Pakistan")}</Text>

                        </View>

                    </View>



                    <View style={{flexDirection:"column",justifyContent:"center",alignItems:"flex-end",flex:0.12}}>
    <View style={{flexDirection:"row",marginBottom:20,paddingBottom:20}}>
    


<TouchableOpacity style={{ paddingRight:10,marginBottom:20,paddingBottom:20,paddingLeft:5,marginRight:10,marginLeft:10}}>
<EditIcon name="edit"   size={26} color="#2b7de9"/>

</TouchableOpacity>
    </View>

</View>


                </View>

                {/* Blue Box style 2 */}
                <View style={{ backgroundColor: "#ebebeb", flex: 0.22, borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 8 }}>


                    <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, marginLeft: 20, marginRight: 20 }} >
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("BankCode")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}> {translate("MCB")}</Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("BankDescription")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("MCBBankLTD")}</Text>

                        </View>
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("CountryName")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("Pakistan")}</Text>

                        </View>

                    </View>



                    <View style={{flexDirection:"column",justifyContent:"center",alignItems:"flex-end",flex:0.12}}>
    <View style={{flexDirection:"row",marginBottom:20,paddingBottom:20}}>
    


<TouchableOpacity style={{ paddingRight:10,marginBottom:20,paddingBottom:20,paddingLeft:5,marginRight:10,marginLeft:10}}>
<EditIcon name="edit"   size={26} color="#2b7de9"/>

</TouchableOpacity>
    </View>

</View>



                </View>

                {/* Blue Box style 3 */}
                <View style={{ backgroundColor: "#ebebeb", flex: 0.22, borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 8 }}>


                    <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, marginLeft: 20, marginRight: 20 }} >
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("BankCode")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}> {translate("MCB")}</Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("BankDescription")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("MCBBankLTD")}</Text>

                        </View>
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("CountryName")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("Pakistan")}</Text>

                        </View>

                    </View>



                    <View style={{flexDirection:"column",justifyContent:"center",alignItems:"flex-end",flex:0.12}}>
    <View style={{flexDirection:"row",marginBottom:20,paddingBottom:20}}>
    


<TouchableOpacity style={{ paddingRight:10,marginBottom:20,paddingBottom:20,paddingLeft:5,marginRight:10,marginLeft:10}}>
<EditIcon name="edit"   size={26} color="#2b7de9"/>

</TouchableOpacity>
    </View>

</View>



                </View>

                {/* Blue Box style 4 */}
                <View style={{ backgroundColor: "#ebebeb", flex: 0.22, borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 8 }}>


                    <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, marginLeft: 20, marginRight: 20 }} >
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("BankCode")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("MCB")}</Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("BankDescription")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("MCBBankLTD")}</Text>

                        </View>
                        <View style={{ flexDirection: "row", paddingRight: 10 }}>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 5 }}>
                                {translate("CountryName")}</Text>
                            <Text style={{ color: "#2b7de9", fontSize: 16, marginStart: 2 }}>:</Text>
                            <Text style={{ color: "#4d4e4f", fontSize: 16, marginStart: 5, marginEnd: 5 }}>{translate("Pakistan")}</Text>

                        </View>

                    </View>



                    <View style={{flexDirection:"column",justifyContent:"center",alignItems:"flex-end",flex:0.12}}>
    <View style={{flexDirection:"row",marginBottom:20,paddingBottom:20}}>
    


<TouchableOpacity style={{ paddingRight:10,marginBottom:20,paddingBottom:20,paddingLeft:5,marginRight:10,marginLeft:10}}>
<EditIcon name="edit"   size={26} color="#2b7de9"/>

</TouchableOpacity>
    </View>

</View>



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
        flex: 1
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
        borderBottomWidth: 0.6,
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