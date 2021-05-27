import React from "react";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";


export const SplittedDatePicker = ({ date, setDate }) => {
  const setDatePart = (name) => (value) => {
    setDate((date) => ({ ...date, [name]: value }));
  };

  return (
    <div id="dropdown-date">
      <div id="dropdown-month" className="container-class">
        <MonthPicker
          defaultValue={"Month"}
          short // default is full name
          year={date.year} // mandatory
          required={true} // default is false
          value={date.month} // mandatory
          onChange={setDatePart('month')}
          id={"month"}
          name={"month"}
        />
      </div>
      <div id="dropdown-day" className="container-class">
        <DayPicker
          defaultValue={"Day"}
          year={date.year} // mandatory
          month={date.month} // mandatory
          required={true} // default is false
          value={date.day} // mandatory
          onChange={setDatePart('day')}
          id={"day"}
          name={"day"}
        />
      </div>
      <div id="dropdown-year" className="container-class">
        <YearPicker
          defaultValue={"Year"}
          required={true} // default is false
          value={date.year} // mandatory
          onChange={setDatePart('year')}
          id={"year"}
          name={"year"}
        />
      </div>
  </div>
  );
};