// ButtonComponent.js - Just a button to be used
import React from "react";

const ButtonComponent = ({ label, onClick }) => (
  <button className="menu-button" onClick={onClick}>
    {label}
  </button>
);

export default ButtonComponent;
