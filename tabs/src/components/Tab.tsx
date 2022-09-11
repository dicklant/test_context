import React from "react";
import { useGlobalContext } from './Data'
import { useParams } from "react-router-dom";
import YellowTab from './YellowFrame';

interface IParams {
  idSession : string
} 

export default function Tab() {
  const { copy } = useGlobalContext();

  const param : IParams = useParams();
  console.log(param)

if(param.idSession == null)
  return (
    <div>
      <YellowTab />
      <h2>Home page Yellow</h2>
      <p>Copy : {copy}</p>
    </div>
  );
else
  return (
    <div>
      <YellowTab />
        <h2>IdSession : {param.idSession}</h2>
        <p>Copy : {copy}</p>
    </div>
  );
}
