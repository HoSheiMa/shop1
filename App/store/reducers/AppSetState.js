
initState = {
    
}


export default function AppSetState (state = initState, action ) {

    if (action.type == "addState"){  
        state[action.tag] = action.tagValue;
        return state;
    }
    return state;

}