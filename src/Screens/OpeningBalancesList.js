



import React, { Component } from 'react';
import {
    Text, TouchableOpacity, StyleSheet, View, Button, ScrollView, TextInput, Picker,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';
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
import Ionicons from "react-native-vector-icons/Ionicons";
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
const data = [{

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


export default class OpeningBalancesList extends Component {
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
            Code: "",
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


    render() {
        return (
            <View style={styles.container}>

                <ScrollView >

                 
                  
                

                       {/* Blue Box style 1 */}
                       <View style={{
                        backgroundColor: "#ebebeb", height: 150, flexDirection: "column",
                        borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 10
                    }}>



                        <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, }} >
                            <View style={{ flexDirection: "row", marginLeft: 4 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("AccountTitle")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("MCB-1914+1 MDK A/C")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.47 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Debit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("FinancialYearCode")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.48 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Credit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("StartYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.35 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Action")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>

                                </View>
                            </View>


                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("EndYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 1, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>

                            </View>
                        </View>

                    </View>



                    {/* Blue Box style 2 */}

                    <View style={{
                        backgroundColor: "#ebebeb", height: 150, flexDirection: "column",
                        borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 10
                    }}>



                        <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, }} >
                            <View style={{ flexDirection: "row", marginLeft: 4 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("AccountTitle")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("MCB-1914+1 MDK A/C")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.47 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Debit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("FinancialYearCode")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.48 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Credit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("StartYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.35 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Action")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>

                                </View>
                            </View>


                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("EndYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 1, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>

                            </View>
                        </View>

                    </View>


                    {/* Blue Box style 3 */}

                    <View style={{
                        backgroundColor: "#ebebeb", height: 150, flexDirection: "column",
                        borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 10
                    }}>



                        <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, }} >
                            <View style={{ flexDirection: "row", marginLeft: 4 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("AccountTitle")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("MCB-1914+1 MDK A/C")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.47 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Debit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("FinancialYearCode")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.48 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Credit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("StartYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.35 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Action")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>

                                </View>
                            </View>


                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("EndYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 1, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>

                            </View>
                        </View>

                    </View>


                    {/* Blue Box style 4 */}

                    <View style={{
                        backgroundColor: "#ebebeb", height: 150, flexDirection: "column",
                        borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 10
                    }}>



                        <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, }} >
                            <View style={{ flexDirection: "row", marginLeft: 4 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("AccountTitle")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("MCB-1914+1 MDK A/C")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.47 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Debit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("FinancialYearCode")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.48 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Credit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("StartYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.35 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Action")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>

                                </View>
                            </View>


                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("EndYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 1, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>

                            </View>
                        </View>

                    </View>


                    {/* Blue Box style 5 */}
                    <View style={{
                        backgroundColor: "#ebebeb", height: 150, flexDirection: "column",
                        borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 10
                    }}>



                        <View style={{ flexDirection: "column", justifyContent: "center", paddingTop: 20, }} >
                            <View style={{ flexDirection: "row", marginLeft: 4 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("AccountTitle")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("MCB-1914+1 MDK A/C")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.47 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Debit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("FinancialYearCode")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.48 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Credit")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, fontSize: 13, marginStart: 4, marginTop: 2, }}> {translate("115053")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("StartYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 10, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 0.35 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, }}>
                                        {translate("Action")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 3 }}>:</Text>

                                </View>
                            </View>


                            <View style={{ flexDirection: "row", marginLeft: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", flex: 0.49 }}>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>
                                        {translate("EndYear")}</Text>
                                    <Text style={{ color: "#2b7de9", fontSize: 12, marginStart: 2 }}>:</Text>
                                    <Text style={{ color: "#4d4e4f", fontSize: 1, marginStart: 2, marginTop: 2 }}> {translate("2018-19")}</Text>
                                </View>

                            </View>
                        </View>

                    </View>
                </ScrollView>
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
})