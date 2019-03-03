import React, { Component } from 'react'
import {View,  Button, TextInput, Picker} from 'react-native';

import FirebaseApp from '../../assets/FirebaseApp';

import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';

import ImagePicker from 'react-native-image-picker';

import Store from '../../store/store';


const options = {
  title: 'اختر صورة',
  quality: 0.6,
  storageOptions: {
      skipBackup: true,
      path: 'images'
  },
};

export default class AddnewOrder extends Component {

    state = {
        updatingimage : '',
        UpdatingNameSection : '',
        updatingCostOrder : 1,
        sectionForAddNewFoodIn: '',


    }
  


    updatingNewFoodImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                var nameImage = `image_${Math.floor(Math.random() * 100000)}_${response.fileName}`;
                var dataimage = `data:${response.type};base64,${response.data}`;

                this.state.updatingimage = dataimage;
            }
          });
    }

    uploadingNewOrderNow = () => {
   
        FirebaseApp.firestore().collection('food').add({
          'Name' : this.state.UpdatingNameSection,
          'IdSection' : this.state.sectionForAddNewFoodIn,
          'key' :  "key_" + Math.floor(Math.random() * 10000),
          'ImageUrl' : this.state.updatingimage,
          'Cost' : this.state.updatingCostOrder,
          
  
             });

             Store.dispatch({
                type : 'addState' ,
                tag : 'addNewSectionOrOrder',
                tagValue  : {
                updatingNewSectionOrderVisable: false,
                updatingNewOrderVisable : false,
                }
            });

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
                                tag : 'addNewSectionOrOrder',
                                tagValue  : {
                                updatingNewSectionOrderVisable: false,
                                updatingNewOrderVisable : false,
                                }
                            })
                            this.setState({})
                        
                        }}
                    />
                    <DialogButton
                    text="رفع"
                    onPress={this.uploadingNewOrderNow}
                    />
                    </DialogFooter>
            }
                visible={Store.getState().AppSetState.addNewSectionOrOrder.updatingNewOrderVisable}
                dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
                })}
            >
                <DialogContent>


                <View  style={{   width : fw * .8,}}>
                <TextInput onChange={(value) =>  { this.state.UpdatingNameSection = value.nativeEvent.text; }} style ={{
            borderWidth : 1,
            borderRadius: 6,
            fontSize: 18,
            margin : 3,
            marginTop: 8,
            textAlign: 'right'


        }} placeholder="اسم المنتج"></TextInput>
        <TextInput keyboardType="number-pad" onChange={(value) => this.state.updatingCostOrder = value.nativeEvent.text} style ={{
            borderWidth : 1,
            borderRadius: 6,
            fontSize: 18,
            margin : 3,
            marginTop: 8,
            textAlign: 'right'



        }} placeholder="الثمن"></TextInput> 

                  <Picker
                    selectedValue={this.state.sectionForAddNewFoodIn}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({sectionForAddNewFoodIn: itemValue})
                    }
                    >
                    {Store.getState().sections.map((item)  => {
                      return (

                      <Picker.Item key={item['Id']} label={item['Name']} value={item['Id']} />
                        

                      );
                    })}
                  </Picker>

                
                <View style={{marginTop: 8,}} ><Button title="اختر صورة للوجبة" onPress={this.updatingNewFoodImage}></Button></View>

                </View>
                
                </DialogContent>
                </Dialog>
        
      </View>
    )
  }
}
