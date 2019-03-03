import React, { Component } from 'react';
import {View , Text ,ScrollView, RefreshControl, Dimensions, Image } from 'react-native';

import TopSections from '../components/App/TopSections';

import FirebaseApp from '../assets/FirebaseApp';

import Store from '../store/store';

import { Scene, Router, Actions } from 'react-native-router-flux';

import BuyButton from '../components/App/BuyButton';

import { Icon, Badge } from 'react-native-elements';

import CardFood from '../components/App/CardFood';




var fullheight = Dimensions.get('window').height;
var fullWidth = Dimensions.get('window').width;

export default class App extends Component {


    state = {
      contentOffset : {x : 0, y: 0},

    }

   AppSetState = ()  => {

    this.setState({});

    }


    
    componentWillMount () {
      
      // Store.dispatch({
      //   type : 'AppSetState',
      //   data : this.AppSetState,
      // });

    
      var db = FirebaseApp.firestore();

        
      
      
      
      
      db.collection('sections').onSnapshot((d) => {
        var sections = [];
        

            d.docs.map((d1)=> {
               sections.push(d1._document.value());

            });

            Store.dispatch({
                type : 'updateSections',
                data : sections,
            });

            this.setState({});
        } )

      

    }

    _onRefresh = () => {
        // Actions.refresh();
        this.setState({})
        console.log('_onRefresh');
    }

    render() {
    return (
      <View style={{
        maxHeight : fullheight,
        overflow: 'hidden',
        

      }}>
             <TopSections />

        <ScrollView
        onScroll={(d) => {
          this.setState({
            contentOffset : d.nativeEvent.contentOffset
          })
        }}
         refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this._onRefresh}
              
            />}>
      
 
        

        <ScrollView style={{
          // alignSelf: 'stretch',
          backgroundColor : '#fff',
        }}>
        <View style={{
          height : fullheight - 120,
          flex: 1,
          justifyContent: 'center'
        }}>


        <CardFood />


        </View>


        </ScrollView>
 



        



      </ScrollView>
        <BuyButton /> 
      </View>
         
    )
  }
}