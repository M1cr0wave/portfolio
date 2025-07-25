import './BlogHome.css';
import DecryptedText from '../../blocks/TextAnimations/DecryptedText/DecryptedText';
import BlogList from '../../components/Blog/BlogList';

export default function BlogHome() {
    return (
        <div className="blog-home">
            <h1>
            <DecryptedText
            text="INFOSEC REWIND"
            speed={100}
            maxIterations={20}
            characters="01!?$"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
            animateOn="view"
            revealDirection="center"
            />
            </h1>
            <p className="blog-home-text">The storage for my <span className='yellow'>abrupt</span> cybersecurity knowledge</p>
            <BlogList />
        </div>
    )
}