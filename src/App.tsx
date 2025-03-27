import { Navigate, Route, Routes } from 'react-router';
import { ItemList } from './pages/ItemList/ItemList';
import { ItemListLayout } from './components/layouts/ItemListLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/planets" replace />} />
      <Route element={<ItemListLayout />}>
        <Route path="/:entityName" element={<ItemList />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
