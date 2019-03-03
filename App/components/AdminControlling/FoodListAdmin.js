import React, { Component } from 'react'
import { View , Text} from 'react-native';
import { Icon } from 'react-native-elements'
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import EditSectionAdmin from './EditSectionAdmin';



export default class FoodListAdmin extends Component {


    state = {
      
        
    }
    
  render() {
    return (
        <View >
        <View style={{
            backgroundColor : '#fff',
            margin :6,
            borderRadius : 12,
            shadowColor: '#000000',
            shadowRadius : 5,
            shadowOpacity : 1.0,
            paddingBottom : 12,
  
  
  
          }}>
  
          
          <Text style={{
                    fontSize : 22,
                    margin: 10,
  
  
          }}>الوجبات</Text>
          {Store.getState().foods.map((item)=>{
  
  
            return (
              <View key={item['key']} style={{
                flexDirection: 'row',
                justifyContent : 'space-between', 
                padding : 10,
                backgroundColor : '#f6f6f6',
                borderRadius: 12,
                margin : 10,
                marginTop : 0,
                marginBottom : 4,
              }}>
  
              <View style={{
                justifyContent : 'flex-start',
  
              }}>
              <View style={{ flexDirection :'row'}}>
             <View style={{
               margin: 3,
             }}>
             <Icon
              
              name='edit'
              type='font-awesome'
              color='blue'
              onPress={() => {


                Store.dispatch({
                        type : 'addState' ,
                        tag : 'EditFood',
                        tagValue  : {
                        FoodId: item['key'],
                        ShowEditFood: true,
                        }
                    })
                    Store.getState().AppSetState.adminApp();



              }} />
             </View>
             <View style={{
               margin: 3,
             }}>
              <Icon
              
              name='trash'
              type='font-awesome'
              color='red'
              onPress={() =>{

                Store.dispatch({
        type : 'addState' ,
        tag : 'removeFood',
        tagValue  : {
          FoodId: item['key'],
          ShowRemoveFood : true,
        }
      })
      Store.getState().AppSetState.adminApp();





              }} />
              </View>
              </View>
              </View>
                <View>
                  <Text style={{
                    fontSize : 18,
                  }}>{item['Name']}</Text>
                </View>
              </View>
  
            );
          })}
  
  
          </View>

          </View>
    )
  }
}
