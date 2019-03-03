import React, { Component } from 'react'
import { View , Text, TextInput, Button, Image} from 'react-native';
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

export default class EditSectionAdmin extends Component {

    state = {
        Name : null,
        ImageSrc: null,  
        Info: null,
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
            console.log('Here setstaing againg! up')
            
        if (Store.getState().AppSetState.EditSection.SectionId != null) {
            console.log('Here setstaing againg!')
            if (this.state.Name == null ||
                this.state.ImageSrc == null ||
                this.state.Info == null 
                
                ){

                    FirebaseApp.firestore().collection('sections').doc(Store.getState().AppSetState.EditSection.SectionId).onSnapshot((d) => {
                        
                        
                        value = d._document.value();
                        Name  = value['Name'];
                        ImageSrc  = value['ImageUrl'];
                        Info  = value['Info'];
                        
                        this.setState({
                            Name: Name,
                        ImageSrc : ImageSrc,
                        Info: Info
                        
                    })


                    
                    
                })
                
            }
            }
    };
    
    EditSectionFun = () => {

        FirebaseApp.firestore().collection('sections').doc(Store.getState().AppSetState.EditSection.SectionId).update({
            Name: this.state.Name,
            ImageUrl : this.state.ImageSrc,
            Info: this.state.Info,
        }).catch((d) => {
            console.log(d);

        })
  Store.dispatch({
                              type : 'addState' ,
                              tag : 'EditSection',
                              tagValue  : {
                                SectionId: null,
                              ShowEditSection : false,
                              }
                          })

                          Store.dispatch({
                            type : 'updateSections' ,
                            data : [],

                            
                        })

                          

                          this.setState({
                            Name : null,
                            ImageSrc: null,  
                            Info: null,
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
                              tag : 'EditSection',
                              tagValue  : {
                                SectionId: null,
                              ShowEditSection : false,
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
              visible={Store.getState().AppSetState.EditSection.ShowEditSection}
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
              defaultValue = {this.state.Info}
              editable={true}
              
               onChange={(value) =>  { this.state.Info = value.nativeEvent.text; }} style ={{
          borderWidth : 1,
          borderRadius: 6,
          fontSize: 18,
          margin : 3,
          marginTop: 8,
          textAlign: 'right'


      }} placeholder="اسم تعريف للقسم"></TextInput>
              
              <View style={{marginTop: 8,}} ><Button title="اختر صورة" onPress={this.updatingNewFoodImage}></Button></View>

              </View>
              
              </DialogContent>
              </Dialog>
    </View>
    )
  }
}
