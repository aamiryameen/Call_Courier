import React, {Component} from 'react';
//import react in our project
import {
  TextInput,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Button
} from 'react-native';
//import basic react native components
import DateTimePicker from 'react-native-modal-datetime-picker';
import SearchIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Dropdown} from 'react-native-material-dropdown';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import TableData from '../../src/Screens/TableData';
import {Icon} from 'native-base';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import {ListItem, SearchBar} from 'react-native-elements';
import ModalTableData from './ModalTableData';
var radio_props = [
  {label: 'IsApproved', value: 0},
  {label: 'Pending', value: 1},
];
const documentData = [
  {
    label: 'CPV --- Cash Payment',
    value: 'CPV',
  },
  {
    label: 'BPV --- Bank Payment ',
    value: 'US',
  },
];
const accountData = [
  {
    label: 'MCB-1914+1 MDK A/C',
    value: 'MCB',
  },
  {
    label: '1061-1 MCB LHR A/C',
    value: '1061',
  },
];
class ExpandableItemComponent extends Component {
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
      menuItems: [],
      isDateTimePickerVisible: false,
      selecteddate: '',
      date: '15-05-2018',
      value: 0,
      text: '',
    };
  }
  search = valuetext => {
    this.setState({
      text: valuetext,
    });
  };
  _showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = pickeddate => {
    day = pickeddate.getDate();
    month = pickeddate.getMonth();
    year = pickeddate.getFullYear();
    console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    exdate = day + '-' + month + '-' + year;
    this.setState({selecteddate: day + '-' + month + '-' + year});
    this._hideDateTimePicker();
  };

  onFocus = () => {
    this._handleDatePicked();
  };
uploadMoad()
{
  this.setState({isModalVisible:true})
}
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', margin: 20}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.props.onClickFunction}
              style={styles.header}>
              {/* <Text style={styles.headerText}>{this.props.item.category_name}</Text> */}
              <SearchIcon
                name="arrow-down-bold"
                size={26}
                color="#000"
                style={{paddingRight: 12}}
              />
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {this.props.item.date}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Type :
                    </Text>
                    <Text style={{marginLeft: 2, flex: 5}}>
                      {this.props.item.type}
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Code :
                    </Text>
                    <Text style={{marginLeft: 2, flex: 5}}>
                      {this.props.item.code}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Amount :
                    </Text>
                    <Text style={{marginLeft: 2, flex: 5}}>
                      {this.props.item.amount}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Account :
                </Text>
                <Text style={{marginLeft: 2, flex: 5}}>
                  {this.props.item.account}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Remarks :
                </Text>
                <Text style={{marginLeft: 2, flex: 5}}>
                  {this.props.item.remarks}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {this.props.item.subcategory.map((item, key) => (
            <View
              style={{
                marginRight: 30,
                marginLeft: 30,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 5,
                padding: 20,
                borderColor: 'grey',
              }}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                    Account :
                  </Text>
                  <Text style={{flex: 1.5, marginLeft: 2}}>{item.account}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                    Comments:
                  </Text>
                  <Text style={{marginLeft: 2, flex: 1.5}}>
                    {item.comments}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                    Debit Amt :
                  </Text>
                  <Text style={{marginLeft: 2, flex: 1.5}}>{item.dAmount}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                    Credit Amt :
                  </Text>
                  <Text style={{marginLeft: 2, flex: 1.5}}>{item.cAmount}</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default class PaymentVoucherDetail extends Component {
  //Main View defined under this Class
  constructor(props) {
    super(props);
    this.uploadMoad=this.uploadMoad.bind(this)
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {listDataSource: CONTENT, menuItems: [],      isModalVisible: false,
    };
  }
  uploadMoad()
  {
    this.setState({isModalVisible:true})
  }
  componentWillMount() {
    var menuItemsArray = [];
    menuItemsArray.push(<MenuItem>Download as PDF</MenuItem>);
    menuItemsArray.push(<MenuItem>Download as CSV</MenuItem>);
    this.setState({
      menuItems: menuItemsArray,
    });
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
 

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false),
    );
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };
  hideMenu() {
    this.setState({visibleDialog: false});
  }
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };

  render() {
    const {checked} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => this._menu.show()}
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'transparent',
              paddingLeft: 20,
              paddingRight: 20,
              zIndex: 3,
              marginTop: -30,
            }}>
            <Icon name="md-more" style={{size: 25, color: 'blue'}} ref="menu" />
            <Menu ref={this.setMenuRef}>{this.state.menuItems}</Menu>
          </TouchableOpacity>

          <View style={{paddingBottom: 20}}>
            <Dropdown
              containerStyle={{}}
              inputContainerStyle={{
                borderColor: '#d7d7d7',
                marginLeft: 20,
                marginRight: 20,
              }}
              style={{}}
              label="Document Type"
              data={documentData}
              textColor="#7aa6ef"
              selectedItemColor="#7aa6ef"
              value={this.state.text}
              textColor="#7aa6ef"
              onChangeText={
                // this._saveLang(value);
                this.search
              }
              baseColor="#7aa6ef"
            />
            <Dropdown
              containerStyle={{}}
              inputContainerStyle={{
                marginLeft: 20,
                marginRight: 20,
              }}
              label="Account Level"
              data={accountData}
              textColor="#7aa6ef"
              selectedItemColor="#7aa6ef"
              textColor="#7aa6ef"
              // value={this,this.state.lang}
              // onPress={this.saveUserData}
              onChangeText={value => {
                // this._saveLang(value);
              }}
              baseColor="#7aa6ef"
            />

           
          </View>
          <Modal animationIn="slideInUp"
animationOut="slideOutLeft" isVisible={this.state.isModalVisible}>
          <ScrollView style={{marginTop:30,height:400}}>
          <ModalTableData  context={this} />

            <Button title="Hide" onPress={this.toggleModal} />
          </ScrollView>
        </Modal>
          
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.searchbtn}>
              <Text style={styles.searchtext}>Search</Text>
            </TouchableOpacity>
          </View>

          <TableData context={this} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  searchbtn: {
    backgroundColor: '#5297ec',
    borderRadius: 7,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchtext: {
    color: 'white',
    fontSize: 15,
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: 'white',
    // padding: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  radiobutton: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  dateText: {
    paddingLeft: 30,
    marginLeft: 5,
    fontSize: 14,
    paddingTop: 20,
    paddingBottom: 3,
    color: '#7aa6ef',
  },
});

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: true,
    category_name: 'Item 1',
    type: 'CPV',
    code: '60',
    date: '31 MARCH 2020',
    remarks: 'CASH PAID TO KHALIFA BASHIR',
    amount: '5,720.00',
    account: 'Account',
    Bank: '',
    subcategory: [
      {
        account: 'M.YASIN SALARY A/C',
        comments: 'CASH PAID TO KHALIFA BASHIR',
        dAmount: '5,220.00',
        cAmount: 5720,
      },
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    type: 'CPV',
    code: '59',
    date: '31 MARCH 2020',
    remarks: 'CASH PAID TO KHALIFA BASHIR',
    amount: '5,720.00',
    account: 'CASH IN HAND A/C',
    subcategory: [
      {
        account: 'TELEPHONE AND MOBILE EXP',
        comments: 'MOBILE PACKEGE MONTHLY',
        dAmount: '650',
        cAmount: 0,
      },
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    type: 'CPV',
    code: '59',
    date: '31 MARCH 2020',
    remarks: 'CASH PAID TO KHALIFA BASHIR',
    amount: '5,720.00',
    account: 'CASH IN HAND A/C',
    subcategory: [
      {
        account: 'TELEPHONE AND MOBILE EXP',
        comments: 'MOBILE PACKEGE MONTHLY',
        dAmount: '650',
        cAmount: 0,
      },
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    type: 'CPV',
    code: '59',
    date: '31 MARCH 2020',
    remarks: 'CASH PAID TO KHALIFA BASHIR',
    amount: '5,720.00',
    account: 'CASH IN HAND A/C',
    subcategory: [
      {
        account: 'TELEPHONE AND MOBILE EXP',
        comments: 'MOBILE PACKEGE MONTHLY',
        dAmount: '650',
        cAmount: 0,
      },
    ],
  },
  {
    isExpanded: false,
    category_name: 'Item 2',
    type: 'CPV',
    code: '59',
    date: '31 MARCH 2020',
    remarks: 'CASH PAID TO KHALIFA BASHIR',
    amount: '5,720.00',
    account: 'CASH IN HAND A/C',
    subcategory: [
      {
        account: 'TELEPHONE AND MOBILE EXP',
        comments: 'MOBILE PACKEGE MONTHLY',
        dAmount: '650',
        cAmount: 0,
      },
    ],
  },
];
