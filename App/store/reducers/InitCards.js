export default function InitCards (state = [], action ) {

    if (action.type == "updatingCards"){  
        state = action.data;
        return state;
    }
    return state;

}