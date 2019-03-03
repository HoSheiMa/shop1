export default function sections (state = [], action ) {

    if (action.type == "updateSections"){  
        state = action.data;
        return state;
    }
    

    return state;

}