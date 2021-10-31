import { createStore } from './redux';
import { reducer } from './reducer';

const initialState = {
    events: [],
    rooms: []
};

export const store = createStore(reducer, initialState);

