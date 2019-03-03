import React, { Component } from 'react';

import { View, Image, Dimensions, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Store from '../../store/store';

import FirebaseApp from '../../assets/FirebaseApp';


import { Icon } from 'react-native-elements'

var fullWidth = Dimensions.get('window').width;
var fullHeight = Dimensions.get('window').height;

styles = StyleSheet.create({

  nullTextStyle :{
    fontSize : fullWidth * .1,
    position: 'relative',
    top: -40,
    fontFamily: 'Laila-Light'

  },

  nullImageStyle : {
    width : fullWidth * .9,
    height : fullHeight * .45,
    borderRadius : 12,

}



})


export default class CardFood extends Component {


  cardSetState = ()  => {

    this.setState({});

    }


    addNewOrder = (id) => {

      Store.dispatch({
        type : 'addOneOrder',
        id : id,
        
      })

      // for animation

      Store.getState().AppSetState.buyBtnSetState[0]();
      Store.getState().AppSetState.buyBtnSetState[1]();
      Store.getState().AppSetState.cardSetState();

    }

    removeOneOrder = (id)  => {
      Store.dispatch({type : 'deleteOneOrder', id : id,})
      
      // for animation

      Store.getState().AppSetState.buyBtnSetState[0]();
      Store.getState().AppSetState.buyBtnSetState[1]();
      Store.getState().AppSetState.cardSetState();

    }

  componentDidMount() {
    Store.dispatch({
      type : 'addState',
      tag : 'cardSetState',
      tagValue : this.cardSetState,
    });

  }
  state  = {
    loading : false,
    activeSection : null,


  }
  cardRender (object) {


    var id = object.Key;

    Store.dispatch({
      type : 'AddToCar',
      tag : id,
      tagValue : [0, object],
    });


    return (


      <View key={object.Name} style={{
        flexDirection: 'row',
        backgroundColor : '#f6f6f6',
        borderRadius : 12,
        // padding : 4,
        width : fullWidth * .9,
        marginLeft: fullWidth * .05,
        height: 100,
        justifyContent: 'flex-end',
        position: 'relative',
        top: -230,

        


      }}>
      <View
      
      
      style={{
        flexDirection: 'column',

      }}>



        <Text
        style={{
          fontSize: 21,
          marginRight: 4,


        }}
        >{object.Name}</Text>
        <Text
        style={{
          fontSize: 16,
          marginRight: 4,
          color : '#E63946'


        }}
        > {object.Cost} ريال</Text>


      <View style={{ flexDirection : 'row' , justifyContent : 'flex-end', margin: 6,}}>


        <View style={{
          backgroundColor : "#ff4444",
          padding : 3,
          color : '#fff',
          borderRadius: 30,
          width: 30,
          marginRight: 3


        }}>
<Icon
  
  name='minus'
  type='font-awesome'
  // size={5}
  textStyle={{
    fontSize: 22,
  }}
  color='#fff'
  onPress={() => this.removeOneOrder(id)} />
</View>
      <TouchableWithoutFeedback onPress={() => this.addNewOrder(id)}><Text style={{
          backgroundColor : "#00C851",
          padding : 4,
          color : '#fff',
          borderRadius: 30,
          fontSize: 16,


        }}>+ {Store.getState().buycar[1][id][0]}</Text></TouchableWithoutFeedback>

      </View>
        
      </View>
        <Image source={{
          uri : object.ImageUrl,
        }} 
          style={{
            width: 100,
            height: 100,
            borderBottomRightRadius: 12,
            borderTopRightRadius: 12,

          }}
         />

      </View>

    )
  }

  renderView () {


    if (Store.getState().activeSections !== null) {

      
      Store.dispatch({
        type : 'updateAppCardsLoading',
        data : true,
      });


      if (Store.getState().reloadingCards == true) {

        
        
        var db = FirebaseApp.firestore();
        
        
        
        this.state.activeSection  = Store.getState().activeSections;
        
        
        
        
        
        
        db.collection('food').where('IdSection', "==", Store.getState().activeSections).onSnapshot((d) => {
          var cards = [];
          
          
          d.docs.map((d1)=> {
            cards.push(d1._document.value());
            
          });
          
           Store.dispatch({
             type : 'updateAppCardsLoading',
             data : false,
           });

           Store.dispatch({
            type : 'updatingStateCards',
            data : false,
            
        })
           

          
          Store.dispatch({
            type : 'updatingCards',
            data : cards,
            
          });
          Store.getState().AppSetState.cardSetState();
          
          
          
        })
      }
        return (
              <View style={{paddingTop : 100}}>
      
              
              { ( Store.getState().reloadingCards == false)  ? Store.getState().InitCards.map((item) => {
      
                return this.cardRender(item);
      
              }) : <Image
                style={{
                  width : fullWidth,
                  height : fullHeight - 120,
                 

                }}
               source={

                 require('../../loadingAssets/Tuuf.gif')

              } />}
      
              </View>
            );


    }

    return (
      <View style={{
        marginLeft: fullHeight * .025,
      }}>
        <Text 
        style={styles.nullTextStyle}
      >
      Best for today, We Love Food.

      </Text>
        <Image 
        style={styles.nullImageStyle}
        source={require('../../Images/foods-wallpaper.jpg')}
         />
      </View>
    );
  }
  render() {
    
    return (
      <View
      
      // style={{
      //     paddingLeft: fullHeight * .025,

      // }}
      >
      {
       this.renderView()
      }

      


      </View>
    )
  }
}
