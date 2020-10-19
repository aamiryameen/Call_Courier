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
export default class ExampleOne extends Component {
  _serch() {}
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        '',
        'colorCode',
        'Type',
        'Code ',
        'Date ',
        'Amount',
        'Account',
        'Bank',
        'IsApproved',
      ],
      widthArr: [60, 0, 50, 150, 200, 80],
      tableData: [
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#BA5536',
          'CPV ',
           59,
          '31 MARCH 2020',
          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',
          'FALSE'
        ],
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#F0810F',
          ' CPV ',
          60,
          '31 MARCH 2020',
          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',

          'FALSE'
        ],
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#F0810F',
          ' CPV ',
          60,
          '31 MARCH 2020',

          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',

          'FALSE'
        ],
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#F0810F',
          ' CPV ',
          60,
          '31 MARCH 2020',

          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',

          'FALSE'
        ],
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#F0810F',
          ' CPV ',
          60,
          '31 MARCH 2020',

          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',

          'FALSE'
        ],
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#F0810F',
          ' CPV ',
          60,
          '31 MARCH 2020',
          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',

          'FALSE'
        ],
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#F0810F',
          ' CPV ',
          60,
          '31 MARCH 2020',
          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',

          'FALSE'
        ],
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#6EB5C0',
          ' BPV ',
          60,
          '31 MARCH 2020',
          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',
          'FALSE'
        ],
        [
          <TouchableOpacity onPress={()=>this.handlePress()}>
          <Entypo name="arrow-down" size={20} style={styles.downIcon} />
          </TouchableOpacity>,
          '#BA5536',
          ' BPV ',
          60,
          '31 MARCH 2020',
          '2,34,45O0',
          'CASH IN HAND A/C',
          ' ',
          'FALSE'
        ],
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
                  style={{backgroundColor: rowData[1], height: 50}}
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
    color:'white'
  },
});
