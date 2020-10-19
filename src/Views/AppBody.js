import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types';
import DashboardScreen from '../Screens/DashboardScreen'
import FinancialYear from '../../src//Screens/FinancialYear'
import BankDefinationList from '../../src/Screens/BankDefinationList'
import OpeningBalancesList from '../../src/Screens/OpeningBalancesList'
import AddTaxType from '../../src/Screens/AddTaxType'
import TaxScheduleMainList from '../../src/Screens/TaxScheduleMainList'
import PaymentVoucherDetail from '../../src/Screens/PaymentVoucherDetail'
import ReceiptVoucherDetail from '../../src/Screens/ReceiptVoucherDetail'
import ChartOfAccount from '../../src/Screens/ChartOfAccount'
import JournalDebitVoucher from '../../src/Screens/JournalDebitVoucher'
import JournalCreditVoucher from '../../src/Screens/JournalCreditVoucher'
import ContraVoucherDetail from '../../src/Screens/ContraVoucherDetail'
import ApprovalDashboard from '../Screens/ApprovalDashboard';
import ApprovalDashboardDetail from '../Screens/ApprovalDashboardDetails'
// import Logout from '../Screen/Logout';

export default class AppBody extends React.Component {

  constructor(props) {
    super(props)
  }
  static propTypes = {
    headerTitle: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    queryToShow: PropTypes.object.isRequired
  };
  render() {
    var playThis;
    if (this.props.queryToShow === "DashboardScreen") {
        playThis = <DashboardScreen></DashboardScreen>
      }
if(this.props.queryToShow==="FinancialYear"){
  playThis=<FinancialYear></FinancialYear>
}
if(this.props.queryToShow==="BankDefinationList"){
  playThis=<BankDefinationList></BankDefinationList>
}
    if (this.props.queryToShow === "OpeningBalancesList") {
      playThis = <OpeningBalancesList> </OpeningBalancesList>
    }
    if (this.props.queryToShow === "AddTaxType") {
      playThis = <AddTaxType ></AddTaxType>
    }
    else if (this.props.queryToShow === "TaxScheduleMainList") {
      playThis = <TaxScheduleMainList context={this.props.context}></TaxScheduleMainList>
    }
    else if (this.props.queryToShow === "PaymentVoucherDetail") {
      playThis = <PaymentVoucherDetail context={this.props.context}></PaymentVoucherDetail>
    }
    else if (this.props.queryToShow === "ApprovalDashboard") {
      playThis = <ApprovalDashboard context={this.props.context}></ApprovalDashboard>
    }
    else if (this.props.queryToShow === "ReceiptVoucherDetail") {
      playThis = <ReceiptVoucherDetail context={this.props.context}></ReceiptVoucherDetail>
    }
    else if (this.props.queryToShow === "ChartOfAccount") {
      playThis = <ChartOfAccount context={this.props.context}></ChartOfAccount >
    }
    else if (this.props.queryToShow === "JournalDebitVoucher") {
      playThis = <JournalDebitVoucher context={this.props.context}></JournalDebitVoucher >
    }
    else if (this.props.queryToShow === "JournalCreditVoucher") {
      playThis = <JournalCreditVoucher context={this.props.context}></JournalCreditVoucher >
    }
    else if (this.props.queryToShow === "ApprovalDashboardDetails") {
      playThis = <ApprovalDashboardDetail context={this.props.context}></ApprovalDashboardDetail >
    }
    else if (this.props.queryToShow === "ContraVoucherDetail") {
      playThis = <ContraVoucherDetail context={this.props.context}></ContraVoucherDetail >
    }
    else if (this.props.queryToShow === "Logout") {
      playThis = <LoginScreen context={this.props.context}> </LoginScreen>
    }
    return (
      <Container>
        {playThis}
      </Container>
    );
  }
}