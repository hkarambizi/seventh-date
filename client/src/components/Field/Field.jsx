import React from "react";
import styled from "styled-components";

const Field = ({ className, field, type }) => {
    return (
      <div className="fieldset">
        <label htmlFor={field}>{field}</label>
        <input
          className={className}
          type={type}
          name={field}
          id={field}
          max="99"
        />
      </div>
    );
  };

 export const EditableProfileField = styled(Field)`
    background-color: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
    border-bottom: 2px dashed black;
    width: 50%;
    font-size: 2em;
    font-family: "Homemade Apple", cursive;
    color: black;
    text-align: center;
    display: block;
    margin: 1em auto;
    padding-bottom: 0em;
  `;

