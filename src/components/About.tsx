import { useState } from "react";

const About = () => {
    const [showMore, setShowMore] = useState(false);
    return (
        <section className="about-section" id="about">
            <h2 className='about-title'>About Me</h2>
            <div className='underLine'></div>
            <div className='about-card'>
                <div className='about-content'>
                    <div className='about-text'>
                        <p>
                            I graduated with a Bachelor of Science in Information Technology from Cebu Technological University - Danao Campus.
                        </p>
                        <p>
                            I am a junior developer with a passion for building web applications and solving real-world problems. {!showMore && <span className="muted">(click read more)</span>}
                        </p>
                        {showMore && (
                            <>
                                <p>I enjoy learning new technologies, improving my skills, and contributing to projects that create value.</p>
                                <p>My goal is to continue growing as a developer through hands-on experience, teamwork, and continuous learning.</p>
                                <p>I am always open to new challenges and opportunities to improve my craft.</p>
                            </>
                        )}
                        <button className="read-more" onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Read Less' : 'Read More'}
                        </button>
                    </div>
                    <div className='about-image'>
                        <div className='image-placeholder'>
                            <img src="/profile.png" alt="John Fred Macapaz" className="profile-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;