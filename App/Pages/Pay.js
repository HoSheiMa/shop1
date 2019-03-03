import React, { Component } from 'react'
import {View, Text, TextInput, ScrollView, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Store from '../store/store';
import { Divider , Icon } from 'react-native-elements';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import {Actions} from 'react-native-router-flux';

fullWidth = Dimensions.get('window').width;

export default class Pay extends Component {

    state = {
        orderlist :[],
        cost : 0,
        name : '',
        address : '',
        phone : '',
        ordernote : '',
        doneDialog : false,
        errorDialog : false,




    }

    checking = () => {
        if (
            this.state.name.length == 0 ||
            this.state.address.length == 0 || 
            this.state.ordernote.length == 0 ||
            this.state.phone.length == 0 ) {
                
                
                this.setState({errorDialog : true});
            } else {

                Store.dispatch({type : 'restBuyCar'});
                Store.getState().AppSetState.buyBtnSetState[0]();
                Store.getState().AppSetState.cardSetState();

                this.setState({ doneDialog: true });

            }
    }
    componentWillMount() {

        var list = Store.getState().buycar;
        var orderlist = [];
        var cost = 0;


        for (item in list[1]){

        

            if (item[0] != 0) {
                orderlist.push([list[1][item][0], list[1][item][1].Name]);

                cost += ( parseInt(list[1][item][1].Cost) * list[1][item][0]);

            }
        }
        this.state.cost = cost;
        this.state.orderlist = orderlist;

    }
  render() {
    return (

<ScrollView>
      <View style={{
          padding: 8,
          paddingTop: 12,


      }}>

      <View
      style={{
        borderWidth : 1,
        borderRadius: 6,
        justifyContent: 'flex-end',
        backgroundColor:'#f6f6f6',
        padding: 6,

      }}
      >

      <Text style={{
            fontSize: 18,          
      }}>الفاتورة</Text>

      {
        this.state.orderlist.map((item) => {
          if (item[0] != 0) {

            return <Text style={{
            fontSize: 16
      }}>{item[0]}  {item[1]}</Text>
          } else {
            return <View></View>
          }
        })
      }

      <Divider style={{ backgroundColor: 'blue',marginBottom: 4, marginTop : 4}} />


      <Text style={{
            fontSize: 18
      }}>الحساب</Text>

      <Text style={{
            fontSize: 16,  
            color : '#E63946'        
      }}>{this.state.cost} ريال</Text>


        


      </View>

      <Divider style={{ backgroundColor: 'blue',marginBottom: 4, marginTop : 8}} />

<Text style={{
           fontSize: 18  
     }}>معلومات</Text>

    
      <TextInput
        editable = {true}
        maxLength = {40}
        onChange={(d) => this.setState({ name : d.nativeEvent.text })}
        placeholder="الاسم"
        style ={{
            borderWidth : 1,
            borderRadius: 6,
            fontSize: 18,
            margin : 3,
            marginTop: 8,
            textAlign: 'right'


        }}
      /> 
      <TextInput
        editable = {true}
        maxLength = {40}
        onChange={(d) => this.setState({ address : d.nativeEvent.text })}

        placeholder="العنوان"
        style ={{
            borderWidth : 1,
            borderRadius: 6,
            fontSize: 18,
            margin : 3,
            textAlign: 'right',

        }}
      />
       <TextInput
        editable = {true}
        onChange={(d) => this.setState({ phone : d.nativeEvent.text })}

        maxLength = {40}
        keyboardType='phone-pad'
        
        placeholder="رقم الهاتف"
        style ={{
            borderWidth : 1,
            borderRadius: 6,
            fontSize: 18,
            textAlign: 'right',
            margin : 3,
        }}
      />
         <TextInput
        editable = {true}
        onChange={(d) => this.setState({ ordernote : d.nativeEvent.text })}

        maxLength = {40}
        placeholder="ملاحظة عن الطلب"
        multiline={true}
        style ={{
            borderWidth : 1,
            borderRadius: 6,
            fontSize: 18,
            textAlign: 'right',
            margin : 3,
            height : 100,

        }}
      />
      <Divider style={{ backgroundColor: 'blue',marginBottom: 4, marginTop : 8}} />

 <Text style={{
            fontSize: 18,          
      }}>طرق الدفع</Text>

<TouchableWithoutFeedback 
    onPress ={() => Actions.Payment({cost : this.state.cost})}
>
<View style={{
    width : fullWidth * .9,
    marginTop: 4,
    padding: 10,
    marginLeft : fullWidth * .025,
    borderRadius: 6,
    flexDirection : 'row',
    justifyContent: 'center',
    textAlign : 'center',
    backgroundColor : '#fff',
    height: 40,
    shadowColor: '#000',
    shadowOffset:{width: 0, height: 3},
    shadowOpacity : 1.0,
    shadowRadius: 4,

}}>      
<Icon
  name='cc-paypal'
  type='font-awesome'
  color='#0d47a1'
  style={{margin : 2}}
  onPress={() => console.log('hello')} />
  <Icon
  name='cc-visa'
  style={{margin : 2}}

  type='font-awesome'
  color='#33b5e5'
  onPress={() => console.log('hello')} />
    <Icon
  name='cc-mastercard'
  style={{margin : 2}}

  type='font-awesome'
  color='#ffbb33'
  onPress={() => console.log('hello')} />
  <Text style={{color : '#000'}}>الدفع عن طريق </Text>
  </View>

  </TouchableWithoutFeedback>

  
<TouchableWithoutFeedback 
    onPress={this.checking}

>
<View style={{
    width : fullWidth * .9,
    marginTop: 4,
    padding: 10,
    marginLeft : fullWidth * .025,
    borderRadius: 6,
    flexDirection : 'row',
    justifyContent: 'center',
    textAlign : 'center',
    backgroundColor : '#33b5e5',
    height: 40,
    shadowColor: '#000',
    shadowOffset:{width: 0, height: 3},
    shadowOpacity : 1.0,
    shadowRadius: 4,

}}>      

  <Text style={{color : '#fff'}}>الدفع كاش </Text>
  </View>

  </TouchableWithoutFeedback>

      </View>

      <View >
      <View >
  <Dialog
    visible={this.state.doneDialog}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    footer={
      <DialogFooter>
       
        <DialogButton
          text="OK"
          onPress={ () => {Actions.pop(); this.setState({doneDialog : false})} }
        />
      </DialogFooter>
    }
  >
    <DialogContent >
    
      <Text style={{color : '#CC0000', marginTop : 12}}>تم اكمال العملة</Text>
    </DialogContent>
  </Dialog>
</View>
</View>
<View >
  <Dialog
    visible={this.state.errorDialog}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    footer={
      <DialogFooter>
       
        <DialogButton
          text="OK"
          onPress={() => this.setState({errorDialog : false,})}
        />
      </DialogFooter>
    }
  >
    <DialogContent >
    
      <Text style={{color : '#CC0000', marginTop : 12,}}>يرجي اكمال البينات</Text>
    </DialogContent>
  </Dialog>
</View>

      </ScrollView>
    )
  }
}
