import React, { useState,useEffect } from 'react';
import { Input } from '../../../components/Input/Input';

export function DateRange({ onChange }) {
    const [date,setDate] = useState('');
    const [start,setStart] = useState('');
    const [end,setEnd] = useState('');

    useEffect(() => {
        if(date === '' || start === '' || end === '') {
            return;
        }
        const [year, month, day] = date.split('-');
        const [startHours, startMinutes] = start.split(':');
        const [endHours, endMinutes] = end.split(':');
        onChange([new Date(year,month,day,startHours,startMinutes),new Date(year,month,day,endHours,endMinutes)]);
    }, [date, start, end]);

    return (
        <div className="form__datetime">
            <Input label='Дата' type='date' placeholder = 'дата' onChange={(event) => setDate(event.target.value)} width={138}/>
            <Input label='Начало' type='time' placeholder = 'время' onChange={(event) => setStart(event.target.value)} width={122} additionalClassName="start-time"/>
            <Input label='Конец' type='time' placeholder = 'время' onChange={(event) => setEnd(event.target.value)} width={122} additionalClassName="end-time"/>
        </div>
    );
}