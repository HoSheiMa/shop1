export default function AppCardsLoading (state = false, action ) {

    if (action.type == "updateAppCardsLoading"){  
        state = action.data;
        return state;
    }
    return state;

}