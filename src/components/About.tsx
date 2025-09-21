import { useState } from "react";

const About = () => {
    const [showMore, setShowMore] = useState(false);
    return (
        <section className="about-section">
            <div className='about-card'>
                <h2 className='about-title'>About Me</h2>
                <p>
                    I am currently a 4th year student taking up Bachelor of Science in Information Technology at <p>Cebu Technological University - Danao Campus. I am a self-taught web developer and </p> I am currently learning about web development. {!showMore && <span className="muted">(click read more)</span>}
                </p>
                    {showMore && (
                        <>
                        <p>I enjoy learning new things and I am always eager to take on new challenges.</p>
                        <p>Building this portfolio is how I learn — step by step.</p>
                        <p>Always learning until the letter "L" becomes silent.</p>
                        </>
                    )}
                <button className="read-more" onClick={() => setShowMore(!showMore)}>{showMore ? 'Read Less' : 'Read More'}</button>
            </div>
        </section>
    )
}

export default About;