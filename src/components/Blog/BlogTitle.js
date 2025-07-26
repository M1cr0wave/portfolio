import CurvedLoop from '../../blocks/TextAnimations/CurvedLoop/CurvedLoop';
import './BlogTitle.css';

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