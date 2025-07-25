import './BlogSquare.css';
import { Link } from 'react-router-dom';

export default function BlogSquare({ colour, image, title, description, link, theme = 'dark' }) {
    return (
        <div className={`blog-square ${theme === 'light' ? 'light-theme' : ''}`} style={{ backgroundColor: colour }}>
            <img src={image} className='image' alt={title} />
            <div className='content'>
                <h1 className='title'>{title}</h1>
                <p className='description'>{description}</p>
                <Link className='link' to={link}>exec(cat /dev/blog)</Link>
            </div>
        </div>
    )
}