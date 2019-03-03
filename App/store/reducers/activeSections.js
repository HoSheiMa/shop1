export default function activeSections (state = null, action ) {

    if (action.type == "updateActiveSections"){  
        state = action.data;
        return state;
    }
    return state;

}