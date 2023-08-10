import { React, useState, useEffect, useMemo } from "react";
import TextArea from "../ui/Textarea";
import Image from "next/image";
import DownloadCsvTable from "@/components/ui/DownloadCsvTable";
import { Button } from "semantic-ui-react";

function UrlDataScraper() {
    const [url,setUrl] = useState("");
    const clearUrl= useMemo(() => url.split(/\r?\n/), [url]);
    const [status,setStatus]= useState("default")
    const [scrapedData, setScrapedData] = useState([])
    
    
    const fetchData = async (url) => {
        try {
            const res = await fetch("/api/data_scraper", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: url }),
            });
        
            if (!res.ok) throw new Error('Server Response Not OK');
    
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
            return null; // or you could throw an error here as well
        }
      };


      const handleClick = ()=>{
        setStatus("loading")
       if(clearUrl.length>0){
        Promise.all(clearUrl.map((url) => fetchData(url)))
        .then((res)=>{
            setScrapedData(res)
            setStatus("done")
        })
       }

      }
    
      const handleRefresh = () => {
        window.location.reload();
      };

if(scrapedData.length>0){
    console.log("data-scraped:",scrapedData)
}
  return (
    <div>

<div className="flex justify-center items-center">
        <div style={{ width: "1000px" }}>
          <h1 className=" flex items-center gap-2 my-5 text-3xl font-semibold">
            <Image src="/icons/icons_014.png" width={50} height={50} /> Url Info Data Scraper (meta)
          </h1>
          <p className="mb-5 text-sm">
            Analiza el H1, el metaTitle y la meta description de una lista de URLS
          </p>

          <TextArea
            label="Introduce una lista de urls para conocer sus datos"
            onChange={(e) => {
                
              setUrl(e.target.value);
              
            }}
          />
          

          <div className="mt-4 flex justify-end gap-3">
            {status === "default" && (
              <Button color="black" onClick={handleClick}>
                Buscar PPAA en Google
              </Button>
            )}
            {status === "loading" && (
               <><Button loading secondary size="mini" className="text-black">
               Loading
             </Button></>
            )}
            {status === "done" && (<>
               <Button disabled>Busqueda Completa</Button>
               <Button color= 'black' onClick={handleRefresh}>Realizar una nueva consulta</Button>
               <DownloadCsvTable response={scrapedData} name="url_info_scraped_" />
               </>
            )}
          </div>
        </div>
      </div>

      {scrapedData.length > 0 ? (
        <>
          <div className="my-12 mx-40">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-black tracking-wider">Domain</th>
                  <th className="text-black tracking-wider">H1</th>
                  {/* <th className="text-black tracking-wider">H2</th> */}
                  <th className="text-black tracking-wider">Title</th>
                  <th className="text-black tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody>
                {scrapedData.map((element) => (
                  <tr>
                    <td className="text-black " key={element.fullUrl}>
                      {element.fullUrl}
                    </td>
                   
                    <td className="text-black" key={element.H1}>
                      {element.H1}
                    </td>
                    {/* <td className="text-black" key={element.H2}>
                      {element.H2}
                    </td> */}
                    <td className="text-black" key={element.title}>
                      {element.title}
                    </td>
                    <td className="text-black" key={element.description}>
                      {element.description}
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{" "}
          <div className="mt-4 flex justify-center gap-3">
            <DownloadCsvTable response={scrapedData} name="url_info_scraped_" />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  )
}

export default UrlDataScraper