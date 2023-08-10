import React, { useState, useRef } from "react";
import Input from "../ui/Input";
import TextArea from "../ui/Textarea";
import Image from "next/image";
import { Button } from "semantic-ui-react";
import { title } from "process";

export default function Redirections() {
  const [urls, setUrls] = useState("");
  const [regex, setRegex] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [redirections, setRedirections] = useState([]);
  const cleanurls = urls.split(/\r?\n/);
  const textareaRef = useRef(null)
  const [copied,setCopied]=useState(false)

  const titles =[]
  console.log(titles)

  const handleCopyClick = () => {
    if (redirections.length > 0) {
      navigator.clipboard.writeText(redirections.join("\n"));
      setCopied(true)
      setTimeout(()=>{
        setCopied(false);
      },1000)
    }
  };
  


  const redirects = (newPath, title) => {
    return `${newPath}${title}`;
  };

  

  const newPathGenerator = (cleanurls, newUrl, regex) => {
    cleanurls.forEach((element) => {
      const match = element.match(new RegExp(regex));
      if (match && match[1]) {
        titles.push(match[1]);
      }
    });
    const newRedirections = titles.map((article) => redirects(newUrl, article));
    setRedirections(newRedirections);
  };

  const handleClick = () => {
    newPathGenerator(cleanurls, newUrl, regex);
    console.log(redirections);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div style={{ width: "1000px" }}>

                 
          <h1 className=" flex items-center gap-2 my-5 text-3xl font-semibold">
          <Image src="/icons/icons_014.png" width={50} height={50}/> Generador de redirecciones 
          </h1>
          <p className="mb-5 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam fuga cum cupiditate repellat voluptas harum quibusdam excepturi, culpa tempora repellendus, soluta nesciunt officiis, dolorem totam vitae aliquam est nobis ab hic officia suscipit error. Enim ad totam maxime illo quidem ex! Quam deserunt debitis nemo molestias, pariatur quisquam sapiente! Commodi reiciendis provident totam ipsa mollitia at earum dolorem, corporis dolorum et molestiae minus adipisci. Ea maiores accusamus quaerat nulla incidunt.</p>

          <TextArea
            label="Introduce las url's originales de tu página web que vayan a ser redireccionadas"
            onChange={(e) => {
              setUrls(e.target.value);
            }}
          />

          

          <div className="mt-4">
            <label htmlFor="regex" className="text-sm leading-6">
              Introduce una <strong>expresión regular (REGEX)</strong> que
              contenga el patrón principal que vas a cambiar. Si quieres
              validarla antes, puedes hacerlo en{" "}
              <a
                href="https://regex101.com"
                target="_blank"
                className="font-bold underline"
              >
                Regex101
              </a>
            </label>
            <Input
              id="regex"
              onChange={(e) => {
                setRegex(e.target.value);
              }}
              placeholder="Example: https?:\/\/.*\.\w+\/news\/(.*)"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="regex" className="text-sm leading-6">
              Introduce el nuevo path hacia donde direccionarán tus antiguas
              urls.
            </label>
            <Input
              id="newUrl"
              onChange={(e) => {
                setNewUrl(e.target.value);
              }}
              placeholder="Example: https://nuevodominio.com/blog/"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
         
          {titles}
          
          <Button color="black" onClick={handleClick}>
                Generar Redirecciones
              </Button>
            
          </div>

          <TextArea
            label="Output Box"
            onChange={(e) => {
              setUrls(e.target.value);
            }}
            value={redirections.length > 0 ? redirections.join("\n") : ""}
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

        {copied ? (<div className="toast toast-end mr-6 mb-6">
  
  <div className="alert alert-success ">
    <span>Redirecciones copiadas</span>
  </div>
</div>) : ''}
        
      </div>

      
    </>
  );
}
