import './BlogPage.css';
import BlogTitle from '../../components/Blog/BlogTitle';
import BlogText from '../../components/Blog/BlogText';
import BlogFooter from '../../components/Layout/BlogFooter';
import Seperator from '../../components/UI/Seperator';

export default function Blog(){
    return (
        <div className="blog-page">
            <BlogTitle />
            <BlogText />
            <Seperator />
            <BlogFooter />
        </div>
    )
}