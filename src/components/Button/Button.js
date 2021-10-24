import React from 'react';
import './Button.css'
export function Button({children, onClick, type = 'button', disabled, design, id}) {
    return (
        <button className='button' type={type} id={id}>{children}</button>
    )
}
