import styled from "styled-components";

export const TH = styled.th`
  padding: 0.75em;
  height: 100%;
  background-color: black;
  border-collapse: collapse;
  border-bottom: 2px solid;
  border-bottom-color: black;
  color: white;
`;

export const TR = styled.tr`
  background-color: white;
`;

export const TD = styled.td`
  border-top: 1px solid #dee2e6;
  text-align: center;
  padding: 8px;
  background-color: white;
`;

export const Table = styled.table`
  table-layout: fixed;
  font-weight: 400;
  border-collapse: collapse;
  width: 100%;
  display: table;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: black;
  border-bottom: black;
  height: auto;
`;

export const Label = styled.label`
  width: 100%;
  height: 100%;
`;
