import React from 'react';

export const Input = ({ id, value, type, label, onChange }) => (
  <div className="field">
    <label className="label" htmlFor={id}>{label}</label>
    <div className="control">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="input"
        required
      />
    </div>
  </div>
);

