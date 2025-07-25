import './BlogList.css';
import BlogSquare from './BlogSquare';
import icon1 from './cache.png';
import logo from './logo.svg';

export default function BlogList() {
    return (
        <div className="blog-list">
            <BlogSquare 
                colour="rgb(17, 168, 93)" 
                image={icon1} 
                title="Web Cache Deception" 
                description="A blog about the dangers of web cache and how to avoid them." 
                link="/blog" 
            />
            <BlogSquare 
                colour="rgb(246, 242, 226)" 
                image={logo} 
                title="Coming Soon" 
                description="This blog is coming soon." 
                link="https://www.google.com" 
            />
            <BlogSquare 
                colour="rgb(19, 180, 229)" 
                image={logo} 
                title="Coming Soon" 
                description="This blog is coming soon." 
                link="https://www.google.com" 
            />
        </div>
    )
}