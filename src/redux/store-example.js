const redux = require('redux');
// import redux from 'redux';

// console.log(redux);
const { createStore } = redux;

const initialState = [{
    id: 1,
    name: 'Max'
}];

const reducer = (state, action) => {
    if (action.type === 'ADD_PERSON') {
        const { name, id } = action;
        return [...state, { name, id }];
    }
    if(action.type === 'CHANGE_PERSON_NAME') {
        return state.map(x => x.id === action.id ? { ...x, name: action.name } : x);
    }
    if(action.type === 'CLEAR_ALL') {
        return []
    }
    if(action.type === 'REMOVE_PERSON') {
        return state.filter((x) => x.id !== action.id);
    }
    return state;
}

const store = createStore(reducer, initialState); // flux
store.subscribe(() => console.log(store.getState()));

const List = React.memo(({ persons }) => (
    <ul>
        {persons.map(x => <li>{x.name}</li>)}
    </ul>
));

// react-redux
function connect(Component) {
    return function() {
        const [state, setState] = useState(store.getState());

        useEffect(() => {
            store.subscribe(() => setState(store.getState()));
        }, []);

        return <Component persons={state} />;
    }
}

const ConnectedList = connect(List);

<ConnectedList />


// add
const addPerson = (name, id) => ({
    type: 'ADD_PERSON',
    name,
    id
})

// remove by id -- action creator
const removePerson = id => ({
    type: 'REMOVE_PERSON',
    id
});


// clear all

const clearAll = () => ({
    type: 'CLEAR_ALL'
});

// change name by id

const changePersonName = (id, name) => ({
    type: 'CHANGE_PERSON_NAME',
    id,
    name
});

store.dispatch(addPerson('Steven', 5));
store.dispatch(addPerson('Bob', 50));
store.dispatch(addPerson('Alex', 15));
store.dispatch(removePerson(1));
store.dispatch(removePerson(15));
store.dispatch(changePersonName(50, 'Obobo'));
store.dispatch(clearAll());
store.dispatch(addPerson('Steven', 5));



// setTimeout(() => {
//     store.dispatch({ type: 'ADD_PERSON', name: 'Steven' });
// }, 1000);

// setTimeout(() => {
//     store.dispatch({ type: 'ADD_PERSON', name: 'Bob' });
// }, 3000);

// setTimeout(() => {
//     store.dispatch({ type: 'ADD_PERSON', name: 'Alex' });
// }, 2000);


