export default function buycar (state = [
    0, // default number for buy
    {} // array have all information about buy and prodect

], action ) {

    if (action.type == "buyCarnNewData"){  
        state = action.data;
        return state;
    }

    if (action.type == "AddToCar") {
        if (state[1][action.tag] == undefined) {
            state[1][action.tag] = action.tagValue
        }
        return state;
    }

    if (action.type == "addOneOrder") {
        state[0] += 1;
        state[1][action.id][0] += 1;

        console.log(state);

        return state;
    }

    if (action.type == "restBuyCar") {
        state[0] = 0;
        for (i in state[1]) {
            state[1][i][0] = 0;
        }
        return state;

    }

    
    if (action.type == "deleteOneOrder") {

        if (state[1][action.id][0] > 0){
            state[0] -= 1;
            state[1][action.id][0] -= 1;

        }
        return state;
    }


    return state;

}