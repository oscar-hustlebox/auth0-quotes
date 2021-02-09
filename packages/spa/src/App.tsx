import React, { useEffect, useState } from 'react';

export const App: React.FC = () => {
  const [apiResponse, setApiResponse] = useState({} as any);
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
