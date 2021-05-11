import styled from "styled-components";

export const Form = styled.form`
  width: 300px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  color: black;
  font-size: 14px;
  font-weight: 200;
`;

export const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid black;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
`

export const ErrorMessagePlaceholder = styled.div`
  height: 20px;
`;

