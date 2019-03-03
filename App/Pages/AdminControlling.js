import React, { Component } from 'react'
import {View, Text, Button, Dimensions, ScrollView} from 'react-native';

import FirebaseApp from '../assets/FirebaseApp';
import Store from '../store/store';

import AddnewOrder from '../components/AdminControlling/AddnewOrder'
import AddnewSection from '../components/AdminControlling/AddnewSection'
import SectionAdmin from '../components/AdminControlling/SectionAdmin'
import RemoveSection from '../components/AdminControlling/RemoveSection'
import RemoveFood from  '../components/AdminControlling/RemoveFood'

import FoodListAdmin from '../components/AdminControlling/FoodListAdmin';
import { Icon } from 'react-native-elements'
import EditSectionAdmin from '../components/AdminControlling/EditSectionAdmin';
import EditFoodAdmin from  '../components/AdminControlling/EditFoodAdmin';


fw = Dimensions.get('window').width;
const options = {
    title: 'اختر صورة',
    quality: 0.6,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
  };
  
export default class AdminControlling extends Component {


    state = {
        updatingimage : '',
        UpdatingNameSection : '',
        updatingCostOrder : 1,
        sectionForAddNewFoodIn: '',


    }




    // updatingNewFoodImage = () => {
    //     ImagePicker.showImagePicker(options, (response) => {
    //         // console.log('Response = ', response);
          
    //         if (response.didCancel) {
    //           console.log('User cancelled image picker');
    //         } else if (response.error) {
    //           console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //           console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //           const source = { uri: response.uri };
          
    //           // You can also display the image using data:
    //           // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //             var nameImage = `image_${Math.floor(Math.random() * 100000)}_${response.fileName}`;
    //             var dataimage = `data:${response.type};base64,${response.data}`;

    //             this.state.updatingimage = dataimage;
    //         }
    //       });
    // }

    ShowDailog = (type)  => {

      if (type == 'newSection') {
        Store.dispatch({
          type : 'addState' ,
          tag : 'addNewSectionOrOrder',
          tagValue  : {
          updatingNewSectionOrderVisable: true,
          updatingNewOrderVisable : false,
          }
      });
      this.setState({})
      } else {
        Store.dispatch({
          type : 'addState' ,
          tag : 'addNewSectionOrOrder',
          tagValue  : {
          updatingNewSectionOrderVisable: false,
          updatingNewOrderVisable : true,
          }
      });
      this.setState({})
      }

    }
    reloadingAdminApp = () => {
      this.setState({});

    }
    componentWillMount () {

      Store.dispatch({
        type : 'addState' ,
        tag : 'addNewSectionOrOrder',
        tagValue  : {
          updatingNewSectionOrderVisable: false,
          updatingNewOrderVisable : false,
        }
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
        type : 'addState' ,
        tag : 'removeSection',
        tagValue  : {
          SectionId: null,
          ShowRemoveSection : false,
        }
      })


      Store.dispatch({
        type : 'addState' ,
        tag : 'EditFood',
        tagValue  : {
          SectionId: null,
          ShowEditFood : false,
        }
      })

      Store.dispatch({
        type : 'addState' ,
        tag : 'removeFood',
        tagValue  : {
          SectionId: null,
          ShowRemoveFood : false,
        }
      })
     
      Store.dispatch({
        type : 'addState' ,
        tag : 'adminApp',
        tagValue  : this.reloadingAdminApp,
      })

        var db = FirebaseApp.firestore();

        
        
        
        
        
        db.collection('sections').onSnapshot((d, next, error) => {
          var sections = [];          

            d.docs.map((d1)=> {
              console.log();
              sectioni = d1._document.value();
              sectioni['key'] = d1.id;


               sections.push(sectioni);

            });
            Store.dispatch({
                type : 'updateSections',
                data : sections,
            });

            this.setState({});
        });


        db.collection('food').onSnapshot((d, next, error) => {
          var foods = [];          

            d.docs.map((d1)=> {
              console.log();
              foodi = d1._document.value();
              foodi['key'] = d1.id;


              foods.push(foodi);

            });
            Store.dispatch({
                type : 'updateFoods',
                data : foods,
            });

            this.setState({});
        });

    }
  render() {
    return (
      <ScrollView>
  
      <View style={{
        flexDirection : 'row',
        width : fw ,
        // padding: 6,

      }}>
        <View style={{
        
        width : fw * .5,          
        }}>
        <Button style={{
              

        }} onPress={() => this.ShowDailog('newSection')} title="اضافة قسم جديدة"></Button>
        </View>

        <View style={{
        
        width : fw * .5,          
        }}>
        <Button  onPress={() => this.ShowDailog('newOrder')} title="اضافة وجبة جديدة"></Button>
        
        </View>
        </View>


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
  
  
          }}>الطلبات</Text>

          <View style={{ justifyContent : 'center',
          padding: 12,}}>

            <Text >لا يوجد طلبات حتي الان</Text>
          </View>
          </View></View>


       <SectionAdmin />


       <FoodListAdmin />


      <EditFoodAdmin />

      <AddnewOrder />

      <AddnewSection />

      <EditSectionAdmin />
      
      <RemoveSection />
      
      <RemoveFood />

      </ScrollView>
    )
  }
}


