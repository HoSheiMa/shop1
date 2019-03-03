import React, { Component } from 'react'

import {WebView} from 'react-native';


export default class Payment extends Component {
  render() {
    return (
        <WebView
        source={{uri: 'https://qandil-afa.000webhostapp.com/Pay-mobile/index.php?cost='+ this.props.cost +'.0'}}
        
      />
        )
  }
}
