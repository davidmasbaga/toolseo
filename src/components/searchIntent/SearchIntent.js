import { useState } from 'react';

const SearchIntentComponent = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/openaiFunctions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: keyword }),
    });

    const data = await res.json();
    console.log(data)
    setResult(data);
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
     SEARCH INTENT TOOL
     
    </div>
  );
};

export default SearchIntentComponent;
