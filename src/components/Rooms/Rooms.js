import React, { useState, useEffect } from 'react';
import { rooms } from '../../data/rooms';
import './Rooms.css';

export const Rooms = ({ onChange }) => {
    const [roomId, setRoomId] = useState(null);
    function handleChange(event) {
        setRoomId(Number(event.currentTarget.value));
    }
    function handleClick() {
        setRoomId(null);
    }

    useEffect(() => {
        onChange(roomId)
    },[roomId]);

    if (roomId) {
        const room = rooms.find((x) => roomId === x.id);
        return (
            <div className="rooms">
                <h3>Ваша переговорка</h3>
                <button onClick={handleClick} className="rooms__button">
                    <span className="rooms__time">16:00 -- 16:30</span>
                    <span className="rooms__name">{room.name}</span>
                    <span className='rooms__floor'>{room.floor} этаж</span>
                </button>
            </div>
        )
    }

    return (
        <div className="rooms">
            <h1 className="rooms__title">Рекомендованные переговорки</h1>
            {rooms.map((room,idx) => {
                return (
                    <label className="rooms__item" key={idx}>
                        <input type="radio" value={room.id} name="room" className="rooms__input" onChange={handleChange}/>
                        <span className="rooms__time">16:00 -- 16:30</span>
                        <span className="rooms__name">{room.name}</span>
                        <span className='rooms__floor'>{room.floor} этаж</span>
                    </label>
                )
            })}

        </div>
    );
}