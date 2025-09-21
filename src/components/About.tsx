import { useState } from "react";

const About = () => {
    const [showMore, setShowMore] = useState(false);
    return (
        <section className="about-section" id="about">
            <h2 className='about-title'>About Me</h2>
            <div className='about-card'>
                <div className='about-content'>
                    <div className='about-text'>
                        <p>
                            I am currently a 4th year student taking up Bachelor of Science in Information Technology at Cebu Technological University - Danao Campus.
                        </p>
                        <p>
                            I am a self-taught web developer, currently learning about web development. {!showMore && <span className="muted">(click read more)</span>}
                        </p>
                        {showMore && (
                            <>
                                <p>I enjoy learning new things and I am always eager to take on new challenges.</p>
                                <p>Building this portfolio is how I learn — step by step.</p>
                                <p>Always learning until the letter "L" becomes silent.</p>
                            </>
                        )}
                        <button className="read-more" onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Read Less' : 'Read More'}
                        </button>
                    </div>
                    <div className='about-image'>
                        <div className='image-placeholder'>
                            <img src="./src/assets/profile.jpg" alt="John Fred Macapaz" className="profile-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;