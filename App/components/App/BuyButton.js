import React, { Component } from 'react'
import { View, Animated, Easing} from 'react-native';
import { Icon, Badge } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

console.disableYellowBox = true;

import Store from '../../store/store';


export default class BuyButton extends Component {

  buyBtnSetState = () => {
    this.setState({});

  }

  componentWillMount () {

    Store.dispatch({
      type : 'addState',
      tag : 'buyBtnSetState',
      tagValue : [ this.buyBtnSetState, this.clickanimation],

    })
    this.AnimationBtn = new Animated.Value(0);
  }

  clickanimation = () => {
  
    this.AnimationBtn.setValue(0);

    Animated.timing(this.AnimationBtn , {
      toValue : 6,
      duration: 400,

    }).start();
  }

  render() {

    this.interpolateBtn = this.AnimationBtn.interpolate({
      inputRange : [0, 1, 2, 3, 4, 5, 6],
      outputRange: [10, 20, 0, 20, 0, 20, 10],
    });



    const styleAnimation = {
      left : this.interpolateBtn
    }

    
    
    return (
        <Animated.View elevation={5} style={[{
            justifyContent : 'center',          
              width: 60,
              height: 60,
              borderRadius: 30,
              position : 'absolute',
              bottom : 70,
              // left: 10,
              backgroundColor : '#fff',
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowRadius: 5,
              shadowOpacity: 1.0

              

              
            }, styleAnimation] }>
            
            <Icon
        name='cart-plus'
          type='font-awesome'
                    
              color='#517fa4'
              onPress={
                // this.clickanimation
                (Store.getState().buycar[0] == 0) ? this.clickanimation : () => Actions.Pay()
              }
              
             
            />
            <View style={{
              position: 'absolute',
              top : 0,
              left: 35,
            }}><Badge value={Store.getState().buycar[0]} status="error" /></View>
  
</Animated.View>
    )
  }
}
