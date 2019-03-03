/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Scene, Router, Actions} from 'react-native-router-flux';
import App from './Pages/App';
import Pay from './Pages/Pay';
import Payment from './Pages/Payment';
import IntroApp from './Pages/IntroApp.js';
import AdminControlling from './Pages/AdminControlling';
import LogInAdmin from './Pages/LogInAdmin';


// console.reportErrorsAsExceptions = false;



export default class AppRoute extends Component {


  render() {
    return (
      <Router>
      <Scene>
      <Scene key="intro" hideNavBar={true}>

              <Scene key="introApp" component={IntroApp} hideNavBar={true}/>

      </Scene>
      <Scene key="AdminLogInRoot" hideNavBar={false} rightTitle="طيبة" onRight={() => false} rightButtonTextStyle={{color: 'orange'}}>

      <Scene key="LogInAdmin" component={LogInAdmin}  hideNavBar={true}></Scene>

      </Scene>

        <Scene key="root" hideNavBar={true}>

          <Scene key="App"  hideNavBar={false} component={App} titleStyle={{color : 'orange'}}  rightTitle="طيبة" rightButtonTextStyle={{ color : 'orange'}} onLeft={ ()=> {
              Actions.AdminLogInRoot()
          } } onRight={ () => false } leftTitle="تسجيل دخول" />
          <Scene key="Pay" hideNavBar={false} component={Pay} rightTitle="طيبة" onRight={() => false} rightButtonTextStyle={{color: 'orange'}}/>
          <Scene key="Payment" hideNavBar={false} component={Payment} rightTitle="طيبة" onRight={() => false} rightButtonTextStyle={{color: 'orange'}}/>
        </Scene>
      <Scene key="Admin" hideNavBar={true}>
      <Scene key="AdminControlling" component={AdminControlling} hideNavBar={true}></Scene>


      </Scene>



        </Scene>
     </Router>
    );
  }


  
}