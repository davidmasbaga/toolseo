import React, { useState, useMemo, useRef } from "react";
import TextArea from "../ui/Textarea";
import { Button } from "semantic-ui-react";
import Image from "next/image";

function UrlCleaner() {
  const [urls, setUrls] = useState("");
  const cleanUrls = useMemo(() => urls.split(/\r?\n/), [urls]);
  const [cleanedUrls, setCleanedUrls] = useState([]);
  const [status, setStatus] = useState("default");
  const textareaRef = useRef(null)
  const [copied,setCopied]=useState(false)

  const handleCopyClick = () => {
    if (cleanedUrls.length > 0) {
      navigator.clipboard.writeText(cleanedUrls.join("\n"));
      setCopied(true)
      setTimeout(()=>{
        setCopied(false);
      },1000)
    }
  };

  const handleHostname = () => {
    const newCleanedUrls = cleanUrls.map((url) => {
      try {
        return new URL(url).hostname;
      } catch (err) {
        console.error(err);
        return 'Error: URL inválida';
      }
    });
    setCleanedUrls(newCleanedUrls);
    setStatus("done");
  };

  const handlePathname = () => {
    const newCleanedUrls = cleanUrls.map((url) => {
      try {
        return new URL(url).pathname;
      } catch (err) {
        console.error(err);
        return 'Error: URL inválida';
      }
    });
    setCleanedUrls(newCleanedUrls);
    setStatus("done");
  };

  const handleOrigin = () => {
    const newCleanedUrls = cleanUrls.map((url) => {
      try {
        return new URL(url).origin;
      } catch (err) {
        console.error(err);
        return 'Error: URL inválida';
      }
    });
    setCleanedUrls(newCleanedUrls);
    setStatus("done");
  };

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div style={{ width: "1000px" }}>
        <h1 className=" flex items-center gap-2 my-5 text-3xl font-semibold">
          <Image src="/icons/icons_014.png" width={50} height={50}/> URL Cleaner
          </h1>
          <p className="mb-5 text-sm">Extrae partes de una URL como el dominio o el path. Recuerda que los inputs deben ser urls con los protocolos http/https </p>
          <TextArea
            label="Introduce una lista de URLs que quieres limpiar."
            onChange={(e) => {
              setUrls(e.target.value);
            }}
          />
          <div className="mt-4 flex justify-end gap-3">
            
              <>
                <Button color="black" onClick={handleHostname}>
                  Extraer Dominio raíz sin protocolo
                </Button>
                <Button color="black" onClick={handleOrigin}>
                  Extraer Dominio raíz con protocolo
                </Button>
                <Button color="black" onClick={handlePathname}>
                  Extraer primer path
                </Button>
       
                
              </>
           
            {/* {status === "done" && (
              <>
                <Button disabled>URLs Limpiadas</Button>
              </>
            )} */}
          </div>
          <TextArea
            label="Resultados"
            onChange={(e) => {
              setUrls(e.target.value);
            }}
            value={cleanedUrls.length > 0 ? cleanedUrls.join("\n") : ""}
            ref={textareaRef}
          />
          <div className="mt-4 flex justify-end">
            <Button
              color="black"
              onClick={handleCopyClick}
            >
             {copied ? ' Resultados Copiados' : 'Copiar resultados'}
            </Button>
          </div>
        </div>
      </div>
      {copied ? (<div className="toast toast-end mr-6 mb-6">
  
  <div className="alert alert-success ">
    <span>Redirecciones copiadas</span>
  </div>
</div>) : ''}
    </div>
  );
}

export default UrlCleaner;
