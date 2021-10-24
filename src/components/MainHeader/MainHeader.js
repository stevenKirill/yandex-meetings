import React from 'react';
import './MainHeader.css';
import { Button } from '../Button/Button';
import logo from './resources/logo.svg';
import { Link } from 'react-router-dom';


export const MainHeader = () => {
    return (
    <div className="main__header">
        <Link to="/main">
            <img src={logo} alt="Яндекс.Переговорки" width=""/>
        </Link>
        <Link to="/meetings">
            <Button onClick={() => {}} design='primary'>Создать встречу</Button>
        </Link>
    </div>
    )
}