import React, { Component } from 'react'
import {View, Text, Button, TextInput} from 'react-native';

import FirebaseApp from '../../assets/FirebaseApp';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';


import Store from '../../store/store';

export default class RemoveFood extends Component {

    removeSectionfun = () => {
        FirebaseApp.firestore().collection('food').doc(Store.getState().AppSetState.removeFood.FoodId).delete();

        Store.dispatch({
            type : 'addState' ,
            tag : 'removeFood',
            tagValue  : {
            FoodId: null,
            ShowRemoveFood : false,
            }
        })

          this.setState({})
    }
  render() {
    return (
        <View>
        <Dialog
          footer={
              <DialogFooter>
                  <DialogButton
                  text="الغاء"
                  onPress={() => { 
                    Store.dispatch({
                            type : 'addState' ,
                            tag : 'removeFood',
                            tagValue  : {
                            FoodId: null,
                            ShowRemoveFood : false,
                            }
                        })

                          this.setState({})

                  }}
                  />
                  <DialogButton
                  text="مسح"
                  onPress={this.removeSectionfun}
                  />
                  </DialogFooter>
          }
              visible={Store.getState().AppSetState.removeFood.ShowRemoveFood}
              dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
              })}
          >
              <DialogContent>
              <View style={{
                  justifyContent : 'center'
              }}>
              <Text style={{ 

                  fontSize: 22,
                  color: 'red',
                  margin : 12,


              }}>هل تريد مسح هذا, فد لا يمكن استرجاعها</Text>
              </View>
              </DialogContent>
              </Dialog>
    </View>
    )
  }
}
