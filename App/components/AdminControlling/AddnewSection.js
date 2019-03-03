import React, { Component } from 'react'
import {View, Button, TextInput} from 'react-native';

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



export default class AddnewSection extends Component {
   
    
    state = {
        updatingimage : '',
        UpdatingNameSection : '',
        updatingCostOrder : 1,
        sectionForAddNewFoodIn: '',
        UpdatingInfoSection : '',


    }
  
    uploadingNewSectionOrderNow = () => {
   
        FirebaseApp.firestore().collection('sections').add({
          'Name' : this.state.UpdatingNameSection,
          'Id' :  "id_" + Math.floor(Math.random() * 10000),
          'ImageUrl' : this.state.updatingimage,
          'Info' : this.state.UpdatingInfoSection,

        });
        Store.dispatch({
            type : 'addState' ,
            tag : 'addNewSectionOrOrder',
            tagValue  : {
            updatingNewSectionOrderVisable: false,
            updatingNewOrderVisable : false,
            }
        })
        this.setState({})

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
                    onPress={this.uploadingNewSectionOrderNow}
                    />
                    </DialogFooter>
            }
                visible={Store.getState().AppSetState.addNewSectionOrOrder.updatingNewSectionOrderVisable}
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
         <TextInput onChange={(value) =>  { this.state.UpdatingInfoSection = value.nativeEvent.text; }} style ={{
            borderWidth : 1,
            borderRadius: 6,
            fontSize: 18,
            margin : 3,
            marginTop: 8,
            textAlign: 'right'


        }} placeholder="اسم تعريف للقسم"></TextInput>
                
                <View style={{marginTop: 8,}} ><Button title="اختر صورة القسم" onPress={this.updatingNewFoodImage}></Button></View>

                </View>
                
                
                </DialogContent>
                </Dialog>
      </View>
    )
  }
}
