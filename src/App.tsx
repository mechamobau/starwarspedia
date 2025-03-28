import { Navigate, Route, Routes } from 'react-router';
import { ItemList } from './pages/ItemList/ItemList';
import { ItemListLayout } from './components/layouts/ItemListLayout';
import { GetById } from './pages/GetItemById/GetItemById';
import { ItemStorageList } from './pages/ItemStorageList/ItemStorageList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/planets" replace />} />
      <Route element={<ItemListLayout />}>
        <Route path="favorites" element={<ItemStorageList />}></Route>
        <Route path="/:entityName" element={<ItemList />}></Route>
        <Route path="/:entityName/:entityId" element={<GetById />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
