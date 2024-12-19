import { Navbar1 } from "./components/Navbar";

import { routeConfig } from "./routing/routes";

import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Navbar1 />
      <Routes>
        {routeConfig.map((route) => {
          return <Route path={route.path} element={route.page} />;
        })}
      </Routes>
    </>
  );
}

export default App;
