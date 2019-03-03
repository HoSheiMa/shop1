export default function reloadingCards (state = false, action ) {

    if (action.type == "updatingStateCards"){  
        state = action.data;
        return state;
    }
    return state;

}