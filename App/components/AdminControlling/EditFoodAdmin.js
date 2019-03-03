import React, { Component } from 'react'
import { View , Text, TextInput, Button, Image, Picker} from 'react-native';
import { Icon } from 'react-native-elements'
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import FirebaseApp from '../../assets/FirebaseApp';
import Store from '../../store/store';
import ImagePicker from 'react-native-image-picker';


const options = {
    title: 'اختر صورة',
    quality: 0.6,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
  };

export default class EditFoodAdmin extends Component {

    state = {
        Name : null,
        ImageSrc: null,  
        Cost: null,
        IdSection : null,

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

                this.state.ImageSrc = dataimage;
                // console.log(dataimage);
            }
          });
    }


        componentWillUpdate() {
            
        if (Store.getState().AppSetState.EditFood.FoodId != null) {
            console.log('Here setstaing againg!')
            if (this.state.Name == null ||
                this.state.ImageSrc == null ||
                this.state.Cost == null ||
                this.state.IdSection == null
                
                ){

                    FirebaseApp.firestore().collection('food').doc(Store.getState().AppSetState.EditFood.FoodId).onSnapshot((d) => {
                        
                        
                        value = d._document.value();
                        Name  = value['Name'];
                        ImageSrc  = value['ImageUrl'];
                        Cost  = value['Cost'];
                        IdSection  = value['IdSection'];
                        
                        this.setState({
                            Name: Name,
                            ImageSrc : ImageSrc,
                            Cost: Cost,
                            IdSection: IdSection,
                    })


                    
                    
                })
                
            }
            }
    };
    
    EditSectionFun = () => {

        FirebaseApp.firestore().collection('food').doc(Store.getState().AppSetState.EditFood.FoodId).update({
            Name: this.state.Name,
            ImageUrl : this.state.ImageSrc,
            Cost: this.state.Cost,
            IdSection: this.state.IdSection,
        }).catch((d) => {
            console.log(d);

        })
  Store.dispatch({
                              type : 'addState' ,
                              tag : 'EditFood',
                              tagValue  : {
                                FoodId: null,
                              ShowEditFood : false,
                              }
                          })

                          Store.dispatch({
                            type : 'updateFoods' ,
                            data : [],

                            
                        })

                          

                          this.setState({
                            Name : null,
                            ImageSrc: null,  
                            Cost: null,
                            IdSection: null,
                          })

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
                              tag : 'EditFood',
                              tagValue  : {
                                FoodId: null,
                              ShowEditFood : false,
                              }
                          })

                          this.setState({
                            Name : null,
        ImageSrc: null,  
        Info: null,
                          })

                  }}
                  />
                  <DialogButton
                  text="تحديث"
                  onPress={this.EditSectionFun}
                  />
                  </DialogFooter>
          }
              visible={Store.getState().AppSetState.EditFood.ShowEditFood}
              dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
              })}
          >
              <DialogContent>
              <View  style={{   width : fw * .8,}}>
              <TextInput
              defaultValue = {this.state.Name}
              editable={true}

               onChange={(value) =>  { this.state.Name = value.nativeEvent.text; }} style ={{
          borderWidth : 1,
          borderRadius: 6,
          fontSize: 18,
          margin : 3,
          marginTop: 8,
          textAlign: 'right'


      }} placeholder="اسم القسم"></TextInput>

<TextInput
              defaultValue = {this.state.Cost}
              editable={true}
              keyboardType='number-pad'
               onChange={(value) =>  { this.state.Cost = value.nativeEvent.text; }} style ={{
          borderWidth : 1,
          borderRadius: 6,
          fontSize: 18,
          
          margin : 3,
          marginTop: 8,
          textAlign: 'right'


      }} placeholder="الثمن"></TextInput>
       <Picker
                    selectedValue={this.state.IdSection}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({IdSection: itemValue})
                    }
                    >
                    {Store.getState().sections.map((item)  => {
                      return (

                      <Picker.Item key={item['Id']} label={item['Name']} value={item['Id']} />
                        

                      );
                    })}
                  </Picker>

              <View style={{marginTop: 8,}} ><Button title="اختر صورة" onPress={this.updatingNewFoodImage}></Button></View>

              </View>
              
              </DialogContent>
              </Dialog>
    </View>
    )
  }
}
