import React from "react";
import { DatePicker } from "antd";

const DateComponent = ({ value, onChange, placeholder, style }) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
    />
  );
};

export default DateComponent;
