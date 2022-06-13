import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Letter from '../pages/Letter';
import WritePage from '../pages/WritePage';
import EditPage from '../pages/EditPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Letter />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
