import React, { Component } from 'react'

import { View, Text ,StyleSheet, Dimensions}  from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';


import { Actions } from 'react-native-router-flux';
fw = Dimensions.get('window').width
fh = Dimensions.get('window').height

const styles = StyleSheet.create({
    image: {
      width: fw * .8,
      height: fh ,
      resizeMode : 'contain'
    }
  });
  
  const slides = [
    {
      key: 'somethun',
      title: '\n\n\n\nتطبيق طيبة',
      text: ' نحن نقدم لك كل ما هو صحي \nو جميل في عالم الطعام\n\n\n\n',
      image: require('../Images/intro1.png'),
      imageStyle: styles.image,
      backgroundColor: '#27c7bb',
    },
    {
      key: 'somethun-dos',
      title: '\n\n\n\اخترنا لك افضل الافضل',
      text: 'دئما نختار لعملاءنا الطعام الافضل \n\n\n\n',
      image: require('../Images/intro2.png'),
      imageStyle: styles.image,
      backgroundColor: '#028090',
    },
    // {
    //   key: 'somethun1',
    //   title: '\n\n\n\nهتطلب اللي نفسك فيه',
    //   text: 'عملية الطلب بتتم اون لاين اوتوماتيك \nلتقليل نسبة الخطأ خلال الطلب \nومحاولات عرض منتجات تانية خلال طلبك لاوردر معين \n\n\n\n',
    //   image: require('../Images/intro3.png'),
    //   imageStyle: {
    //     width: fw ,
    //     height: fh ,
    //     resizeMode : 'contain'
    //   },
    //   backgroundColor: '#02C39A',
    // }
  ];
export default class IntroApp extends Component {

        state = {
        showRealApp: false
      }
      _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        Actions.root();
        return;

        this.setState({ showRealApp: true });
      }


  render() {
    return (
        <AppIntroSlider slides={slides} onDone={this._onDone}/>

    )
  }
}
