import React, { useState } from "react";
import cn from "classnames";
import "./Main.css";
import { rooms } from "../../data/rooms";
import { Row } from "./Row/Row";

export function Main() {
  const hours = Array.from({ length: 24 }, (_, i) => i).filter(x => x > 7);
  const [date, setDate] = useState(new Date());
  const floors = rooms.map(room => room.floor);
  const uniqFloors = [...new Set(floors)];
  const changeDate = event => {
    const { target } = event;
    const direction = Number(target.dataset.direction);
    setDate(prev => {
      const date = prev.getDate();
      const copy = new Date(prev);
      copy.setDate(date + direction);
      return copy;
    });
  };
  const today = new Date();
  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();

  return (
    <div className="main">
      <div className="main__date">
        <div className="date">
          <button
            data-direction="-1"
            className="date__prev"
            onClick={changeDate}
          ></button>
          <span className="date__current">
            {date
              .toLocaleString("ru", { day: "numeric", month: "short" })
              .split("")
              .filter(x => x !== ".")
              .join("")}
            {isToday && <span className="date__today">Сегодня</span>}
          </span>
          <button
            data-direction="1"
            className="date__next"
            onClick={changeDate}
          ></button>
        </div>
        <div className="hours">
          {hours.map(hour => (
            <span
              className={cn("hours__hour", {
                hours__hours_past: hour < today.getHours()
              })}
            >
              {hour}
            </span>
          ))}
        </div>
      </div>
      <div className="main__schedule">
        {uniqFloors.map((floor,idx) => {
          return (
            <div key={idx}>
              <span className="floor">{floor} этаж</span>
              {rooms
                .filter(room => room.floor === floor)
                .map(room => (
                  <Row room={room} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
