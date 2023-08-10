import React from 'react'
import { Button } from "flowbite-react";

function ButtonGSC(props) {

    const handleRefresh = () => {
        window.location.reload();
      };

  return (
    <div> {props.status === 'loading' ? (
        <Button className="mt-5" isProcessing color="Light">Loading...</Button>
      ) : props.status === 'done' ? (
        <div className="flex gap-2">
        <Button disabled className="mt-5" color="gray" > Done</Button>
        <Button className="mt-5" color="dark" onClick={handleRefresh}> Realizar nueva consulta</Button>
              </div>
      ) : props.property !== '' && props.status === 'default' ? (
        <Button color="dark" className="mt-5" onClick={props.getData} >Consultar Datos</Button>
      ) : (
        <Button disabled color="dark" className="mt-5">Consultar Datos</Button>
      )}</div>
  )
}

export default ButtonGSC