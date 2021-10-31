import React, { useState, useEffect } from "react";
import "./Meetings.css";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { AutoSuggest } from "../../components/AutoSuggest/AutoSuggest";
import { Rooms } from "../../components/Rooms/Rooms";
import { DateRange } from "./components/DateRange";
import { connect } from "react-redux";
import { store } from '../../redux/store';
import { useHistory } from "react-router";

const Meetings_ = ({ handleAddEvent }) => {
  const [formValues, setFormValues] = useState({});
  const [visible, setVisible] = useState(true);
  const [error,setError] = useState(false);
  const history = useHistory();
  function setValue(name) {
    return function(value) {
      setFormValues(prev => ({ ...prev, [name]: value }));
    };
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      },2000)
    }
  },[error]);

  function handleSumbit(event) {
    event.preventDefault();
    const { name = '', daterange = [], persons = [], roomId = null } = formValues;
    if (name !== '' && daterange.length !== 0 && persons.length !== 0 && roomId !== null) {
      handleAddEvent(formValues);
      history.push('/main');
    } else {
      setError(true);
    };
  };

  function handleVisible() {
    setVisible(!visible);
  };

  return (
    <>
      {error && <h2 style={{ color: 'red', marginLeft: '80px' }}>Ошибка заполнения формы</h2>}
      <form className="form" onSubmit={handleSumbit}>
        <header className="form__header">
          <h1 className="form__title">Новая встреча</h1>
          <button
            className={`${visible ? "form__closeButton" : "form__openButton"}`}
            type="button"
            onClick={handleVisible}
          >
            Закрыть форму
          </button>
        </header>
        {visible && (
          <div>
            <main className="form__content">
              <div className="form__content-first">
                <Input
                  label="Тема"
                  type="text"
                  placeholder="О чем будем говорить?"
                  onChange={event => setValue("name")(event.target.value)}
                  width="420px"
                />
                <DateRange onChange={setValue("daterange")} />
              </div>
              <div className="form__content-second">
                <AutoSuggest onChange={setValue("persons")} />
                <Rooms onChange={setValue("roomId")} />
              </div>
            </main>
            <hr/>
            <footer className="form__footer">
              <Button design="default" type="button" onClick={() => {
                setVisible(false);
              }}>
                Отмена
              </Button>
              <Button design="primary" type="submit" id="button_ml">
                Создать встречу
              </Button>
            </footer>
          </div>
        )}
      </form>
    </>
  );
};

const addEvent = event => ({
  type: "ADD_EVENT",
  payload: event
});

const mapDispatchToProps = dispatch => {
  return {
    handleAddEvent: data => dispatch.call(store,addEvent(data))
  };
};

export const Meetings = connect(null, mapDispatchToProps)(Meetings_);
