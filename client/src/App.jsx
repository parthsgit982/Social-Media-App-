import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import StartPage from "./Pages/StartPage";
import useStore from "./state/store";

const App = () => {
  const [storeInitialized, setStoreInitialized] = useState(false);
  const { isLogged } = useStore();

  useEffect(() => {
    useStore.getState();
    setStoreInitialized(true);
  }, []);

  if (!storeInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/home"
          element={isLogged ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
