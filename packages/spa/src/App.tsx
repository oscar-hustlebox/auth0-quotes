import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<any>({});
  useEffect(() => {
    fetch('/api/public-quotes/1')
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(data);
      });
  }, []);

  return (
    <>
      <div>{apiResponse.text}</div>
    </>
  );
};

export default App;
