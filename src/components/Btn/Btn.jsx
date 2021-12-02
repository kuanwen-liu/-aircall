import React from 'react';

import './Btn.css';

const Btn = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`btn ${props.btnGreen && 'btn-green'} ${
        props.btnBlack && 'btn-black'
      }`}
    >
      {props.children}
    </button>
  );
};

export default Btn;
