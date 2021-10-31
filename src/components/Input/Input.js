import React from 'react';
import './Input.css'

const cn = (...args) => args.filter(s => typeof s === 'string').join(' ');

export function Input({ 
    label,
    type,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    width,
    additionalClassName
}) {
    const style = {
        width
    }

    const className = cn(
        'input',
        type === 'date' && 'input_date',
        additionalClassName
    );

    return (
        <label className={className} style={style}>
        <span className="input__label">{label}</span>
        <input
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            className='input__inner'  
        />
        </label>
    )
}