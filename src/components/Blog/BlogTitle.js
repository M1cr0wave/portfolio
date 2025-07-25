import CurvedLoop from '../../blocks/TextAnimations/CurvedLoop/CurvedLoop';
import GooeyNav from '../../blocks/Components/GooeyNav/GooeyNav'
import './BlogTitle.css';
import { Link } from 'react-router-dom';


// update with your own items
const items = [
  { label: "Home", href: "../" },
  { label: "Portfolio", href: "#" },
];

export default function BlogTitle(){
    return (
      <div className='title'>
        <CurvedLoop 
            marqueeText="Web 🕸️ Cache 📜 Deception 🫣"
            speed={1.5}
            curveAmount={500}
            direction="right"
            interactive={true}
            className="blog-heading"
          />
      </div>
    )
}