/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import AppRoute from './App/AppRoute';
import {name as appName} from './app.json';



AppRegistry.registerComponent(appName, () => AppRoute);
