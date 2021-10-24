export const reducer = (state, action) => {
    if(action.type === 'ADD_EVENT') {
        return {
            ...state,
            events: [...state.events, action.payload]
        }
    };

    if(action.type === 'ADD_ROOM') {
        return {
            ...state,
            rooms: [...state.rooms, action.payload]
        }
    };
    
    return state;
}