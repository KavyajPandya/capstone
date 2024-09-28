import './App.css';
import ExploreCambridge from './Components/ExploreCambridge';
import ExploreKitchener from './Components/ExploreKitchener';
import ExploreKWC from './Components/ExploreKWC';
import ExploreWaterloo from './Components/ExploreWaterloo';
import NavBar from './Components/NavBar';
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (<>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/ExploreKWC" />} />
        <Route path="/ExploreKWC">
          <Route index element={<ExploreKWC />} />
          <Route path="kitchener" element={<ExploreKitchener />} />
          <Route path="waterloo" element={<ExploreWaterloo />} />
          <Route path="cambridge" element={<ExploreCambridge />} />
        </Route>
        {/* <Route path="*" element={<ExploreKWC />} /> */}
      </Routes>
      {/* <ExploreKWC/> */}
    </div>
    </>
  );
}

export default App;
