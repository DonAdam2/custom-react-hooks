import React from 'react';

const Backdrop = ({ show, click }) => (show ? <div className="backdrop" onClick={click} /> : null);

export default Backdrop;
