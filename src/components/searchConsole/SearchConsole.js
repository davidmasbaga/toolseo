"use client";

import React, { useState, useMemo } from "react";
import gsc from "../../data/gsc.json";
import ButtonGSC from "./ButtonGSC";
import DataTable from "./DataTable";

function SearchConsole() {
  const [property, setProperty] = useState("");
  const [status, setStatus] = useState("default")
  const [data,setData]=useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Query',
        accessor: 'query', // accessor is the "key" in the data
      },
      {
        Header: 'Url',
        accessor: 'url',
      },
      {
        Header: 'Clicks',
        accessor: 'clicks',
      },
      {
        Header: 'Impressiones',
        accessor: 'impressions',
      },
      {
        Header: 'Ctr',
        accessor: 'ctr',
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
      
      
    ],
    []
  )


  const handleChange = (event) => {
    setProperty(event.target.value);
  };

  const fetchData = async (url) => {
    try {
      const res = await fetch("/api/searchConsoleQuery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url, startDate: "2023-06-06", endDate: "2023-07-06" }),
      });
  
      const data = await res.json();
      setData(data)
  
      // Actualizar el estado status a "done" una vez que se completa la solicitud
      setStatus("done");
      return data.data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      // Manejar el error y actualizar el estado status en caso de error
      setStatus("default");
    }
  };
  
  const handleClick = () => {
    if (!property) {
      console.error("Error: El valor de URL está vacío");
      return;
    }
    setStatus("loading");
    console.log(property)
    fetchData(property);
  };




  return (
    <div className="search-console-container" >

     <div className="mx-10">
    <label
        for="urls"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Elige una propiedad para analizar
      </label>
      <select
        id="urls"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChange}
        value={property}
        disabled={status === "loading" || status === "done"}
      >
        <option value="">-</option>
        {gsc.map((e) => (
          <option value={e.url} key={e.url}>
            {e.url}
          </option>
        ))}
      </select>
      <ButtonGSC  getData={handleClick} status={status} property={property}/>
      </div>

      
     

<section className="mt-10 mx-10">


  {data.length > 0 ? (
<DataTable columns={columns} data={data}/>

  ) : ""}

 
</section>

    </div>
  );
}

export default SearchConsole;
