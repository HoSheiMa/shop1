import React, { Component } from 'react'
import { View, Text, TextInput, Dimensions, ImageBackground, Button} from 'react-native';
import FirebaseApp from '../assets/FirebaseApp';
import { Actions } from 'react-native-router-flux';


fh = Dimensions.get('window').height
fw = Dimensions.get('window').width
export default class LogInAdmin extends Component {
    state = {
        user: '',
        pass: '',
        error : false,

    }
    login = () => {
        FirebaseApp.firestore().collection('Login').where('User', '==', this.state.user).where('Password', '==', this.state.pass).onSnapshot((d)=> {
            if(d.empty == false) {
                Actions.Admin();
                this.setState({
                    error: false,
                })
            } else {
                this.setState({
                    error: true,
                })
            }

        })

    }
    errormsg = () => {
        
        if (this.state.error == true) {
            return (
                <Text style={{
                    color : 'red',
                    fontSize : 18,
                    margin: 12,
                    backgroundColor : '#fff',
                    borderRadius : 6,
                    padding: 8,
                }}> خطأ في التسجيل ,قد يكون الاسم او كلمة السر خطأ </Text>
            )
        }
    }
  render() {
    return (
        <ImageBackground style={{
            width: fw,
            height: fh,

        }} source={require('../Images/bg2.jpg')}>




        
            <View style={{
                margin: 12,
                marginTop: fh * .2,

            }}>

            <Text style={{
                fontSize: 32,
                color: '#fff',

            }}>تسجيل دخول</Text>

<TextInput onChange={(value) =>  { this.state.user = value.nativeEvent.text; }} style ={{
            borderWidth : 1,
            borderRadius: 6,
            fontSize: 18,
            margin : 3,
            borderColor :'#fff',
            backgroundColor: '#fff',

            color: '#000',
            marginTop: 20,


        }} placeholder="اسم المستخدم"></TextInput>
        <TextInput secureTextEntry={true} password={true} onChange={(value) =>  { this.state.pass = value.nativeEvent.text; }} style ={{
            borderWidth : 1,
            borderRadius: 6,
            borderColor :'#fff',
            backgroundColor: '#fff',
            textAlign: 'right',
            color: '#000',
            fontSize: 18,
            margin : 3,
            marginTop: 20,
         


        }} placeholder="كلمة السر"></TextInput>
            <View style={{
                    marginTop : 20,

            }}> 



                <Button color="orange" onPress={this.login} style={{
                    borderRadius: 6,

                }} title="تسجيل دخول"></Button>
            </View>


               {this.errormsg()}
           

            </View>
      </ImageBackground>
    )
  }
}
