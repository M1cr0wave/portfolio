import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog/BlogPage';
import BlogHome from './pages/Blog/BlogHome';
import Cursor from './blocks/Components/ProfileCard/Cursor';
import Dock from './blocks/Components/Dock/Dock';
import { VscArchive, VscAccount } from 'react-icons/vsc';
import ProfilePage from './pages/Portfolio/ProfileCard';

const items = [
  { icon: <VscArchive size={20} />, label: 'Blogs', onClick: () => document.location.href = '/'},
  { icon: <VscAccount size={20} />, label: 'Portfolio', onClick: () => document.location.href = '/portfolio' },
];

function App() {
  return (
    <div className="App">
      <Cursor />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <BlogHome />}/>
          <Route path='/blog' element= { <Blog />} />
          <Route path='/portfolio' element= { <ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Dock 
      items={items}
      panelHeight={70}
      baseItemSize={53}
      magnification={70}
      autoHide={true}
      showDistance={100}
    />
    </div>
  );
}

export default App;
