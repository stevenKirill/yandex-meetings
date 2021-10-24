import React, { useState } from "react";
import "./Meetings.css";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { AutoSuggest } from "../../components/AutoSuggest/AutoSuggest";
import { Rooms } from "../../components/Rooms/Rooms";
import { DateRange } from "./components/DateRange";
import { connect } from "react-redux";

const Meetings_ = ({ handleAddEvent }) => {
  const [formValues, setFormValues] = useState({});
  const [visible, setVisible] = useState(true);
  function setValue(name) {
    return function(value) {
      setFormValues(prev => ({ ...prev, [name]: value }));
    };
  }

  function handleSumbit(event) {
    event.preventDefault();
    handleAddEvent(formValues);
  }

  function handleVisible() {
    setVisible(!visible);
  }

  return (
    <form className="form" onSubmit={handleSumbit}>
      <header className="form__header">
        <h1 className="form__title">Новая встреча</h1>
        <button
          className="form__closeButton"
          type="button"
          onClick={handleVisible}
        >
          Закрыть форму
        </button>
      </header>
      {visible && (
        <div>
          <main className="form__content">
            <Input
              label="Тема"
              type="text"
              placeholder="О чем будем говорить?"
              onChange={event => setValue("name")(event.target.value)}
              width="420px"
            />
            <DateRange onChange={setValue("daterange")} />
            <AutoSuggest onChange={setValue("persons")} />
            <Rooms onChange={setValue("roomId")} />
          </main>
          <footer className="form__footer">
            <Button design="default" type="button">
              Отмена
            </Button>
            <Button design="primary" type="submit" id="button_ml">
              Создать встречу
            </Button>
          </footer>
        </div>
      )}
    </form>
  );
};

const addEvent = event => ({
  type: "ADD_EVENT",
  payload: event
});

const mapDispatchToProps = dispatch => {
  return {
    handleAddEvent: data => dispatch(addEvent(data))
  };
};

export const Meetings = connect(null, mapDispatchToProps)(Meetings_);
