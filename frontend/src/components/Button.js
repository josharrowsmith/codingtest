import styled from "styled-components";

const Btn = styled.button`
  background: ${props => props.background ? props.background : "linear-gradient(90deg ,#3FAFD7 0%,#8DCEE6 100%)"};
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top:  ${props => props.margin ? props.margin : "20px"};
  padding: 10px;
  font-size: 16px;
  font-weight: 100;
  border: 1px solid black;
`

const Button = styled(({ loading, ...rest }) => <Btn {...rest} />)``;

export default Button;
