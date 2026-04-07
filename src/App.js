import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import BlogPage from './pages/Blog/BlogPage';
import BlogHome from './pages/Blog/BlogHome';
import Cursor from './blocks/Components/ProfileCard/Cursor';
import Dock from './blocks/Components/Dock/Dock';
import { Library, UserRound } from 'lucide-react';
import ProfilePage from './pages/Portfolio/ProfileCard';

function AppLayout() {
  const navigate = useNavigate();

  const items = [
    { icon: <Library size={22} strokeWidth={1.5} />, label: 'Blogs', onClick: () => navigate('/') },
    { icon: <UserRound size={22} strokeWidth={1.5} />, label: 'Portfolio', onClick: () => navigate('/portfolio') },
  ];

  return (
    <>
      <Routes>
        <Route path='/' element={<BlogHome />} />
        <Route path='/blog/:id' element={<BlogPage />} />
        <Route path='/portfolio' element={<ProfilePage />} />
      </Routes>
      <Dock
        items={items}
        panelHeight={70}
        baseItemSize={53}
        magnification={70}
        autoHide={true}
        showDistance={100}
      />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Cursor />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
