'use strict';
import React, {Component} from 'react';

export default class WebServicesManager extends React.Component {
  baseUrl = 'https://webapi.skaysoft.net/api/';
  constructor(props) {
    super(props);
  }

  callPostMethod(apiURL, params, callback) {
    var apiURL = apiURL + params.endPoint;
    var body=JSON.stringify(params.dataToInsert);
    fetch(apiURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:body ,
    })
      .then(response => response.json())
      .then(responseJson => {
        let statusCode = responseJson.returnStatus;
        callback(statusCode, responseJson);
      })
      .catch(error => {
          
        // 
      });
  }


  postApiCall(params, callback) {
    return this.callPostMethod(this.baseUrl, params, callback);
  }
}
