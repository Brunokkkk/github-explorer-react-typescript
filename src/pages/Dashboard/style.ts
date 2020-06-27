import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
  font-size: 48px;
  color: #000;
`;

export const Form = styled.form`
  margin-top: 40px;
  max-width: 400px;

  input {
    height: 30px;
    width: 200px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 5px 5px 5px;
  }

  label {
    color: #000;
  }

  button {
    color: black;
    margin-top: 20px;
    width: 200px;
    height: 30px;
    background-color: #f5f5f5;
    border-radius: 5px 5px 5px 5px;
    border: 0.1px;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#f5f5f5')};
    }
  }
`;
