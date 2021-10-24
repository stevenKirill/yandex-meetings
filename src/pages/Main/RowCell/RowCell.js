import React from 'react';
import { timeDifference } from '../../../utils/timeDifference';
import './RowCell.css';

export const RowCell = ({ event }) => {
    const {name, daterange} = event;
    const [startDate, endDate] = daterange;
    const duration = timeDifference(startDate,endDate);
    const offset = timeDifference(new Date(2019,10,30,8,0), startDate);
    const style = {
        left: `${offset/15 * 100}%`,
        width: `${duration/15 * 100}%`
    }
    return <div className="row__cell" style={style}>{name}</div>
}