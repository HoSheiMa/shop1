

import React, { Component } from 'react'

import {View , Text, Image, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback, Animated} from 'react-native';

import Store from '../../store/store';



export default class TopSections extends Component {

    state = {
        loading : true,

        active : null,

        

    }

    animationList =   {};
    componentWillMount () {


        if (Store.getState().sections.length != 0 ) {
            this.setState({
                loading : false,
            })
        }


        
    }

    componentWillUpdate () {
        // console.log('updeted');
        if (Store.getState().sections.length != 0) {
            this.state.loading = false;

        }
        
    }

    animationIn =  (anim, id) => {

        this.state.active = id;


        Store.dispatch({
            type : 'updateActiveSections',
            data : id,

        });

        Store.dispatch({
            type : 'updatingStateCards',
            data : true,
            
        })

        Store.getState().AppSetState.cardSetState();




        Animated.spring(anim,{
            toValue : 0.7,
            friction: 3,

            
        }).start();
    }

    animationOut =  (anim) => {
        Animated.spring(anim,{
            toValue : 1,
            friction: 3,

        }).start();
    }
    
  

    avaterSections (object) {

        this.animationList[object.Id] = new Animated.Value(1);
        // console.log(this.animationList[object.Id] );

        return (
            
            <TouchableWithoutFeedback
            key={object.Id}
            
            onPressIn={() => this.animationIn(this.animationList[object.Id], object.Id)}
            onPressOut={() => this.animationOut(this.animationList[object.Id])}

            
            
            >
                        <Animated.View style={[{
                flexDirection : 'row',
                backgroundColor:  this.state.active === object.Id ?  '#A1C6EA' : '#f6f6f6',
                width: 230,
                height: 80,
                borderRadius: 10,
                margin: 4,
                // justifyContent : 'center',

                // paddingTop  : 10,
            }, {
                transform: [
                    { scale : (this.animationList[object.Id]) }
                ]
            }]}>
                <Image source={{
                    uri : object.ImageUrl
                }}
                    style={{
                        width : 80,
                        height: 80,
                        position : 'relative',
                        // top: 12,
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12,
                        


                    }}
                 />

                 <View style={{
                     flexDirection : 'column',
                     justifyContent: 'center',
                    //  padding: 6,

                 }}>
               
                 <Text style={{
                    //  marginTop: 2,
                    margin: 5,
                    color:  this.state.active === object.Id ?  '#FFF' : '#000',
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,

                 }}>{object.Name}</Text>

<Text style={{
                
                    color:  this.state.active === object.Id ?  '#FFF' : '#000',

                     margin: 5,
                     width: 140,
            

                 }}>{object.Info}</Text>
                 </View>
                 
                 
            </Animated.View>
            </TouchableWithoutFeedback>

        )
    }

    sectionsrender () {
        if (this.state.loading == true) {
            return (
            <View style={styles.center}>


                <Image 
                source={require('../../loadingAssets/loading.gif')}
                resizeMode='contain'
                style={styles.loadingImage}
                />

            </View>);
        }
    
        

        return (


            <ScrollView horizontal="true">
            <View style={styles.TopSectionView}>
            {
                
                Store.getState().sections.map((e)=> {

                    
                    return this.avaterSections(e)
                })

            }
            </View>
            </ScrollView>

);
}

render() {
    // console.log('====================================');
    // console.log(this.animationList);
    // console.log('====================================');



    return (
      <View>

        {this.sectionsrender()}
        
      </View>
    )
  }

 
}


var fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    loadingImage : {
        width: 100,
        height: 60,
      },
      center : {
          flex : 1,
          width : '100%',
          height : 200,
          flexDirection: 'row',
          justifyContent: 'center',
      },

      TopSectionView : {
        height : 100,

        backgroundColor: '#fff',
        alignSelf: 'stretch',
        minWidth : fullWidth,
        flexDirection : 'row',
        textAlign: 'center',
        overflow: 'scroll',
        padding: 5,
    }
  })
