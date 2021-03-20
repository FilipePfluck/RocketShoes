import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;

    svg {
      color: #7159c1;
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#7159c1')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#7159c1')};
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 760px){

    table, thead, tbody, th, td, tr { 
      display: block; 
    }

    thead tr { 
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr{
      margin-top: 16px;
      position: relative;
    }

    tr { border: 1px solid #ccc; }
	
    td { 

      /* Behave  like a "row" */
      border: none;
      position: relative;
      padding-left: 50%; 

      display: flex;
      align-items: center;
      justify-content: center;

      img{
        height: 80%;
        width: 80%;
      }
    }
    
    td:before { 
      /* Now like a table header */
      position: absolute;
      /* Top/left values mimic padding */
      top: 6px;
      left: 6px;
      width: 45%; 
      padding-right: 10px; 
      white-space: nowrap;
    }

    td:nth-of-type(5){
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;

    @media (max-width: 600px){
      display: none;
    }
  }

  strong {
    font-size: 28px;
    margin-left: 5px;

    @media (max-width: 600px){
      font-size: 20px;
    }
  }
`;
