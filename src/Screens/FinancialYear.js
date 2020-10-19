



import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button } from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/dist/AntDesign';
import EditIcon from 'react-native-vector-icons/AntDesign'
import constants from '../Screens/constants'
import CheckBox from 'react-native-check-box'
import PropTypes from "prop-types";
import { I18nManager } from 'react-native';
import { TextInput } from 'react-native-paper';
import InputOutline from 'react-native-input-outline';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'


const translationGetters = {
    en: () => require('../../src/locales/en.json'),
    // nl: () => require('./src/translations/nl.js'),?
    ur: () => require('../../src/locales/ur.json')
}
const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
)
export default class FinancialYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: true,
            checked:true,
            visibleModal: null,
            code: '',
            startPeriod: '',
            endPeriod: '',
            pageRefresh: false,
            lang: "",
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
    handleCode = (text) => {
        this.setState({ code: text })
    }
    handleStartPeriod = (text) => {
        this.setState({ startPeriod: text })
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
            <Text style={{ color: "#2b7de9", fontSize: 20 }}>{translate("EditFinancialYear")}</Text>
            <View>
            <InputOutline
                placeholder={translate("Code")}
                // focusedColor='#2b7de9'
                // defaultColor="null"
                // style={{ width: "90%" }}
            />
            <InputOutline
                // style={{ width: "90%" }}
                placeholder={translate("StartPeriod")}
                // focusedColor='#2b7de9'
            //   defaultColor='grey'
            />
            <InputOutline
                // style={{ width: "90%" }}
                placeholder={translate("EndPeriod")}
                // focusedColor='#2b7de9'
            //   defaultColor='grey'
            />
            </View>
            

            {this._renderButton(translate('SaveChanges'), () => this.setState({ visibleModal: null }))}
            {this._renderButton(translate('Close'), () => this.setState({ visibleModal: null }))}
        </View>
    );

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: "row", backgroundColor: "#e8eaed", flex: 0.1, marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ padding: 10, color: "#2b7de9", fontSize: 20 }} >{translate("FinancialYearList")}</Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <SearchIcon name="search1" size={20} color="#000" style={{ justifyContent: "flex-end", padding: 12 }} />
                    </View>

                </View>
                {this._renderButton(translate('AddFinancialYear'), () => this.setState({ visibleModal: 2 }))}

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

                <View style={{ backgroundColor: "#2b7de9", flex: 0.2 }}>

                    
                <View style={{ flexDirection: "column" ,justifyContent:"center",paddingTop:20,marginLeft:20,marginRight:20}} >
                        <View style={{ flexDirection: "row",paddingRight:10 }}>
                            <Text style={{ color: "white", fontSize: 16 ,marginStart:5}}>
                                {translate("StartPeriod")}</Text>
                            <Text style={{ color: "white", fontSize: 16,marginStart:2}}>:</Text>
                            <Text style={{ color: "white", fontSize: 16, marginStart:5,marginEnd:5}}>02-10-2020</Text>
                        </View>
                        <View style={{  flexDirection: "row",paddingRight:10 }}>
                        <Text style={{ color: "white", fontSize: 16 ,marginStart:5}}>
                                {translate("EndPeriod")}</Text>
                            <Text style={{ color: "white", fontSize: 16, marginStart:2}}>:</Text>
                            <Text style={{ color: "white", fontSize: 16, marginStart:5,marginEnd:5 }}>02-10-2020</Text>
                        </View>

                 
                    </View>
<View style={{flexDirection:"column",justifyContent:"center",alignItems:"flex-end",flex:0.1,}}>
    <View style={{flexDirection:"row",marginBottom:15,paddingBottom:20}}>
    <CheckBox 
style={{}}
    checkBoxColor="white"
    checkedCheckBoxColor="white"
    onClick={() => {
        this.setState({
            isChecked: !this.state.isChecked
        })
    }}
    isChecked={this.state.isChecked}

/>


<TouchableOpacity style={{ paddingRight:10,marginBottom:15,paddingBottom:20,paddingLeft:5}}>
<EditIcon name="edit"   size={26} color="white"/>

</TouchableOpacity>
    </View>

</View>
                </View>

                {/* Blue Box style 2 */}
                <View style={{ backgroundColor: "#2b7de9", flex: 0.2, marginTop: 10 }}>

                <View style={{ flexDirection: "column" ,justifyContent:"center",paddingTop:20,marginLeft:20,marginRight:20}} >
                        <View style={{ flexDirection: "row",paddingRight:10 }}>
                            <Text style={{ color: "white", fontSize: 16 ,marginStart:5}}>
                                {translate("StartPeriod")}</Text>
                            <Text style={{ color: "white", fontSize: 16,marginStart:2}}>:</Text>
                            <Text style={{ color: "white", fontSize: 16, marginStart:5,marginEnd:5}}>02-10-2020</Text>
                        </View>
                        <View style={{  flexDirection: "row",paddingRight:10 }}>
                        <Text style={{ color: "white", fontSize: 16 ,marginStart:5}}>
                                {translate("EndPeriod")}</Text>
                            <Text style={{ color: "white", fontSize: 16, marginStart:2}}>:</Text>
                            <Text style={{ color: "white", fontSize: 16, marginStart:5,marginEnd:5 }}>02-10-2020</Text>
                        </View>

                 
                    </View>
<View style={{flexDirection:"column",justifyContent:"center",alignItems:"flex-end",flex:0.1,}}>
    <View style={{flexDirection:"row",marginBottom:15,paddingBottom:20}}>
    <CheckBox 
style={{}}
    checkBoxColor="white"
    checkedCheckBoxColor="white"
    onClick={() => {
        this.setState({
            isChecked: !this.state.isChecked
        })
    }}
    isChecked={this.state.isChecked}

/>


<TouchableOpacity style={{ paddingRight:10,marginBottom:15,paddingBottom:20,paddingLeft:5}}>
<EditIcon name="edit"   size={26} color="white"/>

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
        backgroundColor: '#e8eaed',
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
        margin: 15,
        height: 40,
        borderColor: '#2b7de9',
        borderWidth: 1,
        borderRadius: 10,
        width: "100%"

    },
});