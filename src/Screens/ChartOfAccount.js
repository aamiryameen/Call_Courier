import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  ScrollView,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/dist/AntDesign';
import EditIcon from 'react-native-vector-icons/AntDesign';
import constants from '../Screens/constants';
import CheckBox from 'react-native-check-box';
import {Dropdown} from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
import {I18nManager} from 'react-native';
// import { TextInput } from 'react-native-paper';
import InputOutline from 'react-native-input-outline';
import DropdownMenu from 'react-native-dropdown-menu';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import {Chevron} from 'react-native-shapes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownItem from 'react-native-drop-down-item';
import GmailInput from 'react-native-gmailtype-textinput';
// import { Dropdown } from 'react-native-material-dropdown';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';

const translationGetters = {
  en: () => require('../../src/locales/en.json'),
  // nl: () => require('./src/translations/nl.js'),?
  ur: () => require('../../src/locales/ur.json'),
};
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
const data = [
  {
    label: 'Pakistan',
    value: 'Pak',
  },
  {
    label: 'America ',
    value: 'US',
  },
  {
    label: 'China ',
    value: 'ch',
  },
];
export default class ChartOfAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: true,
      checked: true,
      visibleModal: null,

      startPeriod: '',
      endPeriod: '',
      pageRefresh: false,
      country: '',
      Code: '',
      data: {},
      parent_account: '',
      code: '',
    };

    constants.env = this;
  }
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
  handleCountry = text => {
    this.setState({country: text});
  };
  handleStartPeriod = text => {
    this.setState({startPeriod: text});
  };
  handleCode = text => {
    this.setState({code: text});
  };
  handleEndPeriod = text => {
    this.setState({endPeriod: text});
  };
  login = (code, startPeriod, endPeriod) => {
    alert(
      'code: ' +
        code +
        '  StartPeriod: ' +
        startPeriod +
        'EndPeriod:' +
        endPeriod,
    );
  };
  static propTypes = {
    headerTitle: PropTypes.object.isRequired,
    headerContext: PropTypes.object.isRequired,
    parentContext: PropTypes.object.isRequired,
  };

  _saveLang = async country => {
    this.setState({
      lang: lang,
    });
    try {
      await AsyncStorage.setItem('selectLang', lang).then(value => {
        this.setLanguage(lang);
        ;
      });
    } catch (error) {
      // Error saving data
    }
    constants.env.setI18nConfig(lang);
    constants.env1.setI18nConfig(lang);
    // this.props.parentContext.getSidebarProps(lang);
  };
  render() {
    return (
      <View style={{flex: 1, marginBottom: 10, paddingBottom: 20}}>
        <ScrollView>
          <View style={{width: '95%'}}>
            <GmailInput
              label={translate('ParentAccount')}
              onChangeText={text => {
                this.setState({parent_account: text});
              }}
              hideLabel={this.state.parent_account !== ''}
            />
          </View>

          <View style={{width: '95%'}}>
            <GmailInput
              label={translate('ParentAccount')}
              onChangeText={text => {
                this.setState({parent_account: text});
              }}
              hideLabel={this.state.parent_account !== ''}
            />
          </View>

          <Dropdown
            containerStyle={{}}
            inputContainerStyle={{
              borderWidth: 0.7,
              size: 20,
              borderColor: '#d7d7d7',
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}
            label={translate('AccountLevel')}
            data={data}
            textColor="#7aa6ef"
            selectedItemColor="#7aa6ef"
            textColor="#7aa6ef"
            // value={this,this.state.lang}
            // onPress={this.saveUserData}
            onChangeText={value => {
              this._saveLang(value);
            }}
            baseColor="#7aa6ef"
          />

          <View style={{width: '95%'}}>
            <GmailInput
              label={translate('Code')}
              onChangeText={text => {
                this.setState({parent_account: text});
              }}
              hideLabel={this.state.parent_account !== ''}
            />
          </View>
          <View style={{width: '95%'}}>
            <GmailInput
              label={translate('AccountTitle')}
              onChangeText={text => {
                this.setState({parent_account: text});
              }}
              hideLabel={this.state.parent_account !== ''}
            />
          </View>

          <Dropdown
            containerStyle={{}}
            inputContainerStyle={{
              borderWidth: 0.7,
              size: 20,
              borderColor: '#d7d7d7',
              borderRadius: 10,
              margin: 10,
              padding: 10,
              justifyContent: 'center',
            }}
            label={translate('GroupDetail')}
            data={data}
            textColor="#7aa6ef"
            selectedItemColor="#7aa6ef"
            textColor="#7aa6ef"
            // value={this,this.state.lang}
            // onPress={this.saveUserData}
            onChangeText={value => {
              this._saveLang(value);
            }}
            baseColor="#7aa6ef"
          />
          <Dropdown
            containerStyle={{}}
            inputContainerStyle={{
              borderWidth: 0.7,
              size: 20,
              borderColor: '#d7d7d7',
              borderRadius: 10,
              margin: 10,
              padding: 10,
              justifyContent: 'center',
            }}
            label={translate('Company')}
            data={data}
            textColor="#7aa6ef"
            selectedItemColor="#7aa6ef"
            textColor="#7aa6ef"
            // value={this,this.state.lang}
            // onPress={this.saveUserData}
            onChangeText={value => {
              this._saveLang(value);
            }}
            baseColor="#7aa6ef"
          />
          <Dropdown
            containerStyle={{}}
            inputContainerStyle={{
              borderWidth: 0.7,
              size: 20,
              borderColor: '#d7d7d7',
              borderRadius: 10,
              margin: 10,
              padding: 10,
              justifyContent: 'center',
            }}
            label={translate('A/CAccount')}
            data={data}
            textColor="#7aa6ef"
            selectedItemColor="#7aa6ef"
            textColor="#7aa6ef"
            // value={this,this.state.lang}
            // onPress={this.saveUserData}
            onChangeText={value => {
              this._saveLang(value);
            }}
            baseColor="#7aa6ef"
          />
          <Dropdown
            containerStyle={{}}
            inputContainerStyle={{
              borderWidth: 0.7,
              size: 20,
              borderColor: '#d7d7d7',
              borderRadius: 10,
              margin: 10,
              padding: 10,
              justifyContent: 'center',
            }}
            label={translate('P/LAccount')}
            data={data}
            textColor="#7aa6ef"
            selectedItemColor="#7aa6ef"
            textColor="#7aa6ef"
            // value={this,this.state.lang}
            // onPress={this.saveUserData}
            onChangeText={value => {
              this._saveLang(value);
            }}
            baseColor="#7aa6ef"
          />
          <Dropdown
            containerStyle={{}}
            inputContainerStyle={{
              borderWidth: 0.7,
              size: 20,
              borderColor: '#d7d7d7',
              borderRadius: 10,
              margin: 10,
              padding: 10,
              justifyContent: 'center',
            }}
            label={translate('B/SNotes')}
            data={data}
            textColor="#7aa6ef"
            selectedItemColor="#7aa6ef"
            textColor="#7aa6ef"
            // value={this,this.state.lang}
            // onPress={this.saveUserData}
            onChangeText={value => {
              this._saveLang(value);
            }}
            baseColor="#7aa6ef"
          />
          <View style={{width: '95%'}}>
            <GmailInput
              label={translate('OpeningBalances')}
              onChangeText={text => {
                this.setState({parent_account: text});
              }}
              hideLabel={this.state.parent_account !== ''}
            />
          </View>

          <View style={{width: '95%'}}>
            <GmailInput
              label={translate('OtherERPCode')}
              onChangeText={text => {
                this.setState({parent_account: text});
              }}
              hideLabel={this.state.parent_account !== ''}
            />
          </View>

          <View style={{width: '95%'}}>
            <GmailInput
              label={translate('QRCode')}
              onChangeText={text => {
                this.setState({parent_account: text});
              }}
              hideLabel={this.state.parent_account !== ''}
            />
          </View>
          <CheckBox
            style={{
              padding: 10,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              margin: 10,
            }}
            checkBoxColor="#2b7de9"
            onClick={() => {
              this.setState({
                isChecked: !this.state.isChecked,
              });
            }}
            isChecked={this.state.isChecked}
          />
        </ScrollView>
      </View>
    );
  }
}
