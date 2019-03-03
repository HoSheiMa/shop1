export default function foods (state = [], action ) {

    if (action.type == "updateFoods"){  
        state = action.data;
        return state;
    }
    

    return state;

}