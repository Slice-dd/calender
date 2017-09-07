import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePickers';

const handleClick = (y,m,d) => {
    console.log(y,m,d);
};

ReactDOM.render(
    <DatePicker dateClick={handleClick} nowDate={new Date()} />,
    document.getElementById('root')
)