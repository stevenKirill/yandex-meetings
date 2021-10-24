import React from 'react';
import { connect } from 'react-redux';
import './Row.css';
import { RowCell } from '../../Main/RowCell/RowCell';

const Row_ = ({ events, room }) => {
    const {id,name, capacity} = room;
    return (
        <div className ="row">
            <div className="row__room">
                <span className="row__roomName">{name}</span>
                <span className="row__roomCapacity">до {capacity} человек</span>
            </div>
            <div className="row__timeline">
                {events.filter((event) => event.roomId === id).map((event) => <RowCell event={event}/>)}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        events: state.events
    }
}
// const sum = (a, b) => a + b; // sum(1, 2)
// const sum = a => b => a + b; // sum(1)(2) sum(1) === (b) => 1 + b

export const Row = connect(mapStateToProps)(Row_);

// const connect = (mapStateToProps) => Component => {
//     const { store } = useContext(ReduxContext);
//     const reduxProps = mapStateToProps(store.getState());
//     return (props) => (
//         <Component {...props} {...reduxProps} />
//     );
// }