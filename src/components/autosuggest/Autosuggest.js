import { React, useState, useEffect, useMemo } from "react";
import TextArea from "../ui/Textarea";
import Image from "next/image";
import DownloadCsvTable from "@/components/ui/DownloadCsvTable";
import { Button,Select } from "semantic-ui-react";
function Autosuggest() {
  const [keywords, setKeywords] = useState("");
  const cleanKeywords = useMemo(() => keywords.split(/\r?\n/), [keywords]);
  const [ppaa, setPpaa] = useState([]);
  const [status, setStatus] = useState("default");
  const [performSecondScrape, setPerformSecondScrape] = useState(false);
  const [recursiveTimes, setRecursiveTimes] = useState(2);    

  const fetchData = async (keywords) => {
    const res = await fetch("/api/autosuggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queries: keywords,
        performSecondScrape: performSecondScrape || false,
        recursiveTimes: recursiveTimes || null, }),
    });

    const data = await res.json();
    console.log(data)
    return data.data;
  };

  const handleClick = () => {
    setStatus("loading");
    if (cleanKeywords.length > 0) {
      fetchData(cleanKeywords)
        .then((results) => {
          setPpaa(results.flat());
          
          setStatus("done")
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div style={{ width: "1000px" }}>
          <h1 className="flex items-center gap-2 my-5 text-3xl font-semibold">
            <Image src="/icons/icons_014.png" width={50} height={50} /> Escraper de autocompletado de Google
          </h1>
          {/* Resto del código del componente... */}
          <TextArea
            label="Introduce una lista de keywords de las sugerencias de autocompletado"
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          />
          <div className="mt-4 flex justify-end gap-3">
            {status === "default" && (
              <>
               <Select
                placeholder="Iterar sobre los primeros resultados"
                options={[
                  { key: "true", text: "Sí", value: true },
                  { key: "false", text: "No", value: false },
                ]}
                onChange={(e, { value }) => {
                  setPerformSecondScrape(value);
                }}
              />
              {performSecondScrape && (
                <Select
                  placeholder="Número de resultados a iterar"
                  options={[
                    { key: "2", text: "2", value: 2 },
                    { key: "3", text: "3", value: 3 },
                    { key: "4", text: "4", value: 4 },
                    { key: "5", text: "5", value: 5 },
                    { key: "6", text: "6", value: 6 },
                    { key: "all", text: "Todos", value: 10 },
                  ]}
                  onChange={(e, { value }) => {
                    setRecursiveTimes(value);
                  }}
                />
              )}
              
              <Button color="black" onClick={handleClick}>
                Buscar Auto Suggest en Google
              </Button>
            </>
            )}
            {status === "loading" && (
              <Button loading secondary size="mini" className="text-black">
                Loading
              </Button>
            )}
            {status === "done" && (
              <>
                <Button disabled>Busqueda Completa</Button>
                <Button color= 'black' onClick={handleRefresh}>Realizar una nueva consulta</Button>
                <DownloadCsvTable response={ppaa} name={cleanKeywords[0]} />
                
              </>
            )}
          </div>
        </div>
      </div>

      {ppaa.length > 0 && (
        <>
          <div className="my-12">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-black tracking-wider">Query</th>
                  <th className="text-black tracking-wider">Autocompletados</th>
                </tr>
              </thead>
              <tbody>
                {ppaa.map((element, index) => (
                  <tr key={index}>
                    <td className="text-black">{element.query}</td>
                    <td className="text-black">
                {element.results.map((result, resultIndex) => (
                  <div key={resultIndex}>{result}</div>
                ))}
              </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center gap-3">
            <DownloadCsvTable response={ppaa} name={cleanKeywords[0]} />
          </div>
        </>
      )}
    </div>
  );
}

export default Autosuggest;
