import { createStore, combineReducers } from 'redux';


import sections from './reducers/sections';
import foods from './reducers/foods';
import activeSections from './reducers/activeSections';
import AppSetState from './reducers/AppSetState';
import InitCards from './reducers/InitCards';
import AppCardsLoading from './reducers/AppCardsLoading';
import reloadingCards from './reducers/reloadingCards';
import buycar from './reducers/buycar';



var allreduces = combineReducers({
    sections : sections,
    activeSections : activeSections, 
    AppSetState: AppSetState,
    InitCards :InitCards,
    AppCardsLoading: AppCardsLoading,
    reloadingCards: reloadingCards,
    buycar: buycar,
    foods: foods,

    


})


export default Store = createStore(
    allreduces,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

);


