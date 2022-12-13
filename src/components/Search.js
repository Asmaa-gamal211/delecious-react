import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <Form onSubmit={SubmitHandler}>
      <FaSearch />
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        value={input}
      />
    </Form>
  );
};

const Form = styled.form`
  margin: 1rem 0rem;
  position: relative;
  width: 100%;
  input {
    border: none;
    outline: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.3rem;
    color: white;
    padding: 0.5rem 3rem;
    border-radius: 1rem;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(50%, -50%);
    color: white;
  }
`;

export default Search;
