import { Route, Routes } from 'react-router';
import { Planets } from './pages/Planets/Planets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Planets />}></Route>
    </Routes>
  );
}

export default App;
