import React, {Component} from 'react';
import {I18nManager} from 'react-native';
import {
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  YellowBox,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import WebServicesManager from '../Managers/WebServicesManager';
import Accordion from 'react-native-collapsible/Accordion';

import MaterialIcon from 'react-native-vector-icons/AntDesign';
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
import MainScreen from './MainScreen';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import constants from './constants';

const translationGetters = {
  en: () => require('../../src/locales/en.json'),
  // nl: () => require('./src/translations/nl.js'),?
  ur: () => require('../../src/locales/ur.json'),
};
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
export default class DashboardScreen extends Component {
  WebServicesManager = new WebServicesManager();

  constructor(props) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this.setI18nConfig = this.setI18nConfig.bind(this);
    this.setI18nConfigDefault = this.setI18nConfigDefault.bind(this);
    // this.renderContent = this.renderContent.bind(this);
    this.state = {
      accordionDataSource: [],
      activeSections: [],
      iconSet: [
        'creditcard',
        'cloudupload',
        'clouddownload',
        'piechart',
        'export2',
        'bank',
      ],
      colorSet: [
        '#FB4D3D',
        '#03CEA4',
        '#CA1551',
        '#345995',
        '#EAC435',
        '#00A3AD',
      ],
    };
    constants.env = this;
  }

  componentWillMount() {
    var dataToInsert = {
      VoucherDateT: '2020-03-15T00:46:41.9868608-05:00',
      VoucherDateF: '2017-03-15T00:46:41.9868608-05:00',
      CompanyId: 13,
      FinancialYearId: 11,
      OrganizationId: 9,
      AccountTypeId: 6,
      ObDebit: 7.0,
      CurrDebit: 8.0,
      CurrCredit: 9.0,
      ClDebit: 10.0,
      AccountType: 'sample string 11',
    };
    this.WebServicesManager.postApiCall(
      {dataToInsert: dataToInsert, endPoint: 'Dashboard/GetAccountDashboard'},
      (statusCode, response) => {
        var sectionArray = [];
        response.forEach(element => {
          sectionArray.push({
            AccountType: element.AccountType,
            AccountTypeId: element.AccountTypeId,
            ClDebit: element.ClDebit,
            CompanyId: element.CompanyId,
            CurrCredit: element.CurrCredit,
            CurrDebit: element.CurrDebit,
            FinancialYearId: element.FinancialYearId,
            ObDebit: element.ObDebit,
            OrganizationId: element.OrganizationId,
            VoucherDateF: element.VoucherDateF,
          });
        });
        this.setState({accordionDataSource: sectionArray});

        this.setState({accordionDataSource: response});
      },
    );
  }

  setSections = sections => {
    if (sections.includes !== undefined) {
      this.setState({
        activeSections: sections.includes(undefined) ? [] : sections,
      });
    } else {
      this.setState({
        activeSections: sections,
      });
    }
    if (Number.isInteger(sections) || sections.length > 0) {
      var accordionItem = this.state.accordionDataSource[sections];
      this.state.accordionDataSource[sections].status = '1';
    }
  };

  setI18nConfig(lang) {
    const fallback = {languageTag: 'en', isRTL: false};

    const {languageTag, isRTL} =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
    translate.cache.clear();
    I18nManager.forceRTL(isRTL);
    i18n.translations = {[lang]: translationGetters[lang]()};
    i18n.locale = lang;
    this.setState({pageRefresh: true});
  }
  setI18nConfigDefault() {
    const fallback = {languageTag: 'en', isRTL: false};

    const {languageTag, isRTL} =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
    translate.cache.clear();
    I18nManager.forceRTL(isRTL);
    if (languageTag == 'en' || languageTag === 'ur') {
      i18n.translations = {[languageTag]: translationGetters[languageTag]()};
      i18n.locale = languageTag;
    } else {
      i18n.translations = {
        [config.defaultLanguage]: translationGetters[config.defaultLanguage](),
      };
      i18n.locale = config.defaultLanguage;
    }

    this.setState({pageRefresh: true});
  }
  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
    this.checkLang();
  }
  handleLocalizationChange = () => {
    this.setI18nConfigDefault();
    this.forceUpdate();
  };
  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }
  setLanguage(value) {
    this.setI18nConfig(value);
  }
  checkLang = async () => {
    try {
      const langSelected = await AsyncStorage.getItem('selectLang');
      if (langSelected !== null) {
        this.setLanguage(langSelected);
        this.setState({lang: langSelected});
      } else {
        this.setI18nConfigDefault();
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  _renderHeader(section, index, isActive, sections) {
    return (
      <View
        style={{
          marginTop: 20,
          marginRight: 20,
          marginLeft: 20,
          backgroundColor: constants.colorWhite,
          padding: 15,
        }}>
        <View>
          <Card
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingBottom: 20,
              paddingTop: 20,
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: this.state.colorSet[index],
                  padding: 25,
                  borderRadius: 6,
                }}>
                <MaterialIcon
                  name={this.state.iconSet[index]}
                  style={{fontSize: 35, color: 'white'}}
                />
              </View>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18}}> {section.CurrCredit}</Text>
              <Text style={{marginTop: 10}}> {section.AccountType}</Text>
            </View>
          </Card>
        </View>
      </View>
    );
  }

  _renderContent = section => {
    return (
      <View style={{ marginRight: 30,
        marginLeft: 30,}}>
        <Card
          style={{
            
          
          backgroundColor: constants.colorWhite,
          padding: 15,
          }}>
          <View
            style={{ justifyContent: 'center', alignItems: 'center',flexDirection:'row'}}>
            <View style={{flex: 1, marginLeft: 8, padding: 10}}>
              <Text style={{color: '#1b6bd4'}}>{translate('Opening')}</Text>
              <Text style={{color: '#1b6bd4'}}>
                {translate('CurrentDebit')}
              </Text>
              <Text style={{color: '#1b6bd4'}}>
                {translate('CurrentCredit')}
              </Text>
              <Text style={{color: '#1b6bd4'}}>{translate('Banlance')}</Text>
            </View>

            <View style={{flex: 1, padding: 20}}>
              <Text>{section.CurrCredit}</Text>
              <Text>{section.CurrDebit}</Text>
              <Text>{section.ClDebit}</Text>
              <Text>{section.CurrDebit}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  render() {
    const {multipleSelect, activeSections} = this.state;

    return (
      // main view
      <View style={styles.container}>
        {/* Header style view */}

        <ScrollView>
          <Accordion
            underlayColor={'white'}
            sections={this.state.accordionDataSource}
            activeSections={activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this.setSections}
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = new StyleSheet.create({
  Headerstyle: {
    height: 50,
  },
  container: {
    flex: 1,
    marginBottom: 10,
  },
});
