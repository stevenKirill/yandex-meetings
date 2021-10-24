import React, { useState, useEffect, useRef } from 'react';
import './AutoSuggest.css';
import { Input } from '../Input/Input';
import  { persons } from '../../data/persons';


export const AutoSuggest = ({ onChange }) => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [query, setQuery] = useState('');

    const autosuggestRef = useRef(null); 

    useEffect(() => {
        function handleClick(event) {
          const target = event.target;
          if (checkParent(autosuggestRef.current,target)) { 
            setVisible(false);
          }
        }
        document.body.addEventListener('click', handleClick);
        return function() {
          document.body.removeEventListener('click', handleClick);
        };
    }, [])

    useEffect(() => {
      onChange(selectedIds);
    }, [selectedIds]);

    function handleAddPerson(event) {
        const { id } = event.currentTarget.dataset;
        setSelectedIds(prevState => prevState.includes(id) ? prevState : [...prevState, id]);
        setVisible(false);
        setQuery('')
    }
    function handleRemovePerson (event) {
        const target = event.currentTarget.dataset.id;
        setSelectedIds(prevState => prevState.filter(x => x !== target));
    }
    function handleChange(event) {
      const value = event.target.value;
      setQuery(value);
    }
    
    return (
        <div ref={autosuggestRef} className="autosuggest">
            <Input
                label='Участники'
                type='text'
                placeholder='введите имя'
                width="100%"
                value={query}
                onChange={handleChange}
                onFocus={() => setVisible(true)}
            />
            {visible && (
              <div  className="autosuggest__list">
              <ul className="autosuggest__list-inner">
                  {persons
                    .filter((person) => person.name.toLowerCase().startsWith(query.toLowerCase()))
                    .map(({ name, photo, floor, id}) => {
                      return (
                        <li data-id={id} onClick={handleAddPerson} className="person">
                            <img src={photo} className="person__avatar" alt={name}/>
                            <span className="person__name">{name}</span>
                            <span className="person__floor">{floor} этаж</span>
                        </li>
                      )
                  })}
              </ul>
            </div>
            )}
            {selectedIds.length > 0 && (
              <div>
                <ul className="selectedPerson">
                  {selectedIds.map((element) => {
                    const { name, photo, id } = persons.find(x => x.id === element);

                    return (
                        <li data-id={id} className="selectedPerson__item" onClick={handleRemovePerson}>
                            <img src={photo} className="selectedPerson__avatar" alt={name}/>
                            <span className="selectedPerson__name">{name}</span>
                        </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
    )
}

function checkParent(parent,child) {
    if(!parent.contains(child)) {
      return true;
    }
    return false;
}
