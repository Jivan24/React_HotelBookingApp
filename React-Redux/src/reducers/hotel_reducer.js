
const initialState = { 
    searchWord:"", hotel:[], bookings:[] 
}

export default function(state=initialState, action){
    switch(action.type){
        case 'SEARCH_HOTELS':
        return { ...state, searchWord:action.payload };
        
        case 'SEARCH_ALL_HOTELS':
        return { ...state, hotel:action.payload};

        case 'SEARCH_ALL_BOOKING':
            return {...state,bookings:action.payload.reverse()}
        
        default:
        return state;
    }
}