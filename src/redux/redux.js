 class Redux {
    //  #reducer; 
    //  #store;
    //  #listeners;
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this._state = initialState;
        this._listeners = [];
    }
    subscribe(listener) {
        this._listeners.push(listener)
        return {
            unsubscribe: () => {
                this._listeners = this._listeners.filter(item => item !== listener);
            }
        }
    }
    dispatch(action) {
        this._state = this.reducer(this._state, action);
        this._listeners.forEach(listener => listener());
        console.log(this)
    }
    getState() {
        return this._state;
    }
}

export const createStore = (reducer, initialState) => {
    return new Redux(reducer, initialState);
}