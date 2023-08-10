import { React, useState, useEffect, useMemo } from "react";
import TextArea from "../ui/Textarea";
import Image from "next/image";
import DownloadCsvTable from "@/components/ui/DownloadCsvTable";
import { Button } from "semantic-ui-react";
function Ppaa() {
  const [keywords, setKeywords] = useState("");
  const cleanKeywords = useMemo(() => keywords.split(/\r?\n/), [keywords]);
  const [ppaa, setPpaa] = useState([]);
  const [status, setStatus] = useState("default");

  const fetchData = async (keyword) => {
    const res = await fetch("/api/ppaa_expand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: keyword }),
    });

    const data = await res.json();
    return data.data;
  };

  const handleClick = () => {
    setStatus("loading");
    if (cleanKeywords.length > 0) {
      Promise.all(cleanKeywords.map((keyword) => fetchData(keyword)))
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
          <h1 className=" flex items-center gap-2 my-5 text-3xl font-semibold">
            <Image src="/icons/icons_014.png" width={50} height={50} /> Escraper
            de PPAA's de Google
          </h1>
          <p className="mb-5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            fuga cum cupiditate repellat voluptas harum quibusdam excepturi,
            culpa tempora repellendus, soluta nesciunt officiis, dolorem totam
            vitae aliquam est nobis ab hic officia suscipit error. Enim ad totam
            maxime illo quidem ex! Quam deserunt debitis nemo molestias,
            pariatur quisquam sapiente! Commodi reiciendis provident totam ipsa
            mollitia at earum dolorem, corporis dolorum et molestiae minus
            adipisci. Ea maiores accusamus quaerat nulla incidunt.
          </p>

          <TextArea
            label="Introduce una lista de keywords de las que quieras sacar las People Also Ask de Google"
            onChange={(e) => {
              setKeywords(e.target.value);
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
               <DownloadCsvTable response={ppaa} name={cleanKeywords[0]} />
               </>
            )}
          </div>
        </div>
      </div>

      {ppaa.length > 0 ? (
        <>
          <div className="my-12 ">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-black tracking-wider">Keyword</th>
                  <th className="text-black tracking-wider">People Also Ask</th>
                </tr>
              </thead>
              <tbody>
                {ppaa.map((element) => (
                  <tr>
                    <td className="text-black " key={element.keyword}>
                      {element.keyword}
                    </td>
                    <td className="text-black" key={element.ppaa}>
                      {element.ppaa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{" "}
          <div className="mt-4 flex justify-center gap-3">
            <DownloadCsvTable response={ppaa} name={cleanKeywords[0]} />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Ppaa;
