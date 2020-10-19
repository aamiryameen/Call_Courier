import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import PropTypes from "prop-types";
import {Table, Row, Rows} from 'react-native-table-component';
import Entypo from 'react-native-vector-icons/Entypo';
export default class ModalTableData extends Component {
  _serch() {}
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        'colorCode',
        'Account',
        '	Debit Amount ',
        'Credit Amount'
      ],
      widthArr: [0, 150, 150,150],
      tableData: [
        [
          // <Entypo name="arrow-down" size={20} style={styles.downIcon} />,
          '#BA5536',
          'M.YASIN SALARY A/C ',
          '5,220.00',
          '5,720.00',
        ],
        [
          // <Entypo name="arrow-down" size={20} style={styles.downIcon} />,
          '#F0810F',
          'M.YASIN SALARY A/C ',
         '5,220.00',
         '5,720.00',
        ],
        [
          // <Entypo name="arrow-down" size={20} style={styles.downIcon} />,
          '#6EB5C0',
          'CASH IN HAND A/C',
          '5,220.00',
          '5,720.00',
        ]
        ,
        [
          // <Entypo name="arrow-down" size={20} style={styles.downIcon} />,
          '#F0810F',
          'CASH IN HAND A/C',
          '5,220.00',
          '5,720.00',
        ]
        ,
        [
          // <Entypo name="arrow-down" size={20} style={styles.downIcon} />,
          '#6EB5C0',
          'CASH IN HAND A/C',
          '5,220.00',
          '5,720.00',
        ]
      ],
    };
  }

    static propTypes = {context: PropTypes.object.isRequired,
    };
  
  handlePress()
  {
    debugger
    this.props.context.uploadMoad();
  }
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.textHeadRow}
                widthArr={state.widthArr}
              />
              {/* <Rows

                data={state.tableData}
                textStyle={styles.textRows}
                widthArr={state.widthArr}
              /> */}
              {state.tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={state.widthArr}
                  style={{backgroundColor: rowData[0], height: 50}}
                  // style={ rowData[1]==59 && {backgroundColor: '#F7F6E7'}|| rowData[1]==60 && {backgroundColor: '#F7F000'}}
                  textStyle={styles.textRows}
                />
              ))}
            </Table>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  textHeadRow: {margin: 6, fontSize: 15, fontWeight: 'bold', color: '#1c469b'},
  textRows: {margin: 6, fontSize: 12, color: 'white', textAlign: 'center'},
  action: {
    height: 30,
    width: 40,
    backgroundColor: '#5297ec',
    margin: 6,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
  },
  downIcon: {
    marginLeft: 10,
    paddingLeft: 5,
  },
});
