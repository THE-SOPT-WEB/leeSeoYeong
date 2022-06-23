import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LettersPage from '../pages/LettersPage';
import WritePage from '../pages/WritePage';
import EditPage from '../pages/EditPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LettersPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
