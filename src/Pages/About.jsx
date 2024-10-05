import { Link } from 'react-router-dom';
import './About.css';
// import '../assets/images/Adeola.png';
import '../assets/images/Anthony.png';
import '../assets/images/Ayyoub.png';
import '../assets/images/Jorge.png';
import '../assets/images/Niki.jpg';

export default function About() {
    return (
        <div className="about_container">
            <h1 className="about_app">Seconds Mission</h1>
            
            <h2>Your Tastes, Your Ratings, Your Seconds.</h2>
                <p className="about_mission">
                    We empower everyone to effortlessly discover and explore exceptional dishes that honor culinary diversity. Our mission is to enhance every dining journey by connecting individuals with tailored recommendations, inviting all to enjoy enriching and satisfying meal experiences. Together, we embrace the joy of taste, savoring every second of delicious adventures.
                </p>
            <h2>We encourage everyone to eat, rate, and celebrate—and always come back for Seconds!</h2>

            <div className="team-list-container">
                <h2>Meet Our Team</h2>
            <div className="team-list">

                
                    <div className="white-overlay">
                        <img src="https://example.com/Adeola-profile.jpg" 
                        alt="Adeola's profile picture" 
                        className="profile-pic" />
                    </div>
                    <h2 className="dev-name">Adeola</h2>
                    <div className="bio-container">
                        <p className="profile-bio">
                            Adeola Aina-Marshall is a Project and Portfolio Manager with a strong foundation in technology and software development, complemented by over 13 years of experience in business development, revenue generation, and market penetration. Currently serving as an Innovation Project Manager at Pernod Ricard, Adeola focuses on integrating technology solutions to drive business transformation and cost optimization. With certifications such as PMP, CIPM, PRINCE2®, and Scrum Master, she has effectively led cross-functional teams in the development and implementation of technology-driven projects. Although she has one year of direct experience in software development, her extensive background in program delivery and governance positions her to leverage innovative solutions for organizational growth. Fluent in English, French, and Yoruba, Adeola is passionate about inspiring teams and driving strategic initiatives within the tech sector.
                        </p>
                    </div>
                    <div className="links__container">
                        <Link to='https://github.com/datCodeGirl'>
                            <i className="fa-brands fa-github"></i>
                        </Link> 
                        <Link to='https://www.linkedin.com/in/adeola-ainamarshall-114a63304/'>
                            <i className="fa-brands fa-linkedin"></i>
                        </Link>
                    </div>
                </div>




                <div className="profile-container">
                    <div className="white-overlay">
                        <img src="https://example.com/jorge-profile.jpg" alt="'s profile picture" className="profile-pic" />
                    </div>
                    <h2 className="dev-name">Anthony</h2>
                    <div className="bio-container">
                        <p className="profile-bio">
                            Anthony Cannonier is a dedicated Data Specialist and Software Engineer based in the Bronx, New York, with over 20 years of experience in performing arts and education. He is passionate about enhancing stakeholder experiences by leveraging data-driven decision-making and innovative solutions. Currently serving as a Senior Data Specialist at Democracy Prep Public Schools, Anthony collaborates across departments to improve data integrity and streamline systems, ultimately increasing efficiency and staff satisfaction. His extensive background in operations management and technical expertise has led to the creation of numerous tools that have significantly improved workflow and productivity. Committed to fostering a supportive environment, Anthony believes in empowering individuals and organizations to focus on what truly matters.
                        </p>
                    </div>
                    <div className="links__container">
                        <Link to='https://github.com/AntCannon'>
                            <i className="fa-brands fa-github"></i>
                        </Link> 
                        <Link to='https://www.linkedin.com/in/anthonycannonier/'>
                            <i className="fa-brands fa-linkedin"></i>
                        </Link>
                    </div>
                </div>


                <div className="profile-container">
                    <div className="white-overlay">
                        <img src="https://example.com/Ayyoub-profile.jpg" 
                        alt="Ayyoub's profile picture" 
                        className="profile-pic" />
                    </div>
                    <h2 className="dev-name">Ayyoub</h2>
                    <div className="bio-container">
                        <p className="profile-bio">
                            Ayyoub Belibel is a dedicated Project Coordinator at Hyundai Engineering Co. Ltd. based in Queens, New York. With nearly five years of experience in project coordination, he has successfully overseen numerous engineering projects, ensuring they are completed on time and meet high-quality standards. Ayyoub is multilingual, fluent in English, Arabic, and French, which enhances his ability to collaborate with diverse teams and clients. Currently pursuing a degree in Computer Software Engineering, he holds a Bachelor’s degree in Translation from Université Mentouri de Constantine. Ayyoub's passion for technology and effective communication drives his commitment to delivering successful project outcomes.
                        </p>
                    </div>
                    <div className="links__container">
                        <Link to='https://github.com/ayoublos'>
                            <i className="fa-brands fa-github"></i>
                        </Link> 
                        <Link to='https://www.linkedin.com/in/ayyoub-belibel/'>
                            <i className="fa-brands fa-linkedin"></i>
                        </Link>
                    </div>



                    <div className="profile-container">
                    <div className="white-overlay">
                        <img src="https://example.com/jorge-profile.jpg" alt="Jorge's profile picture" className="profile-pic" />
                    </div>
                    <h2 className="dev-name">Jorge</h2>
                    <div className="bio-container">
                        <p className="profile-bio">
                            Jorge (Luis) Godoy Rodriguez is a dedicated Full Stack Developer with a passion for crafting engaging and user-friendly applications. His unique journey spans roles as a Stock Broker and Life Insurance Agent, providing him with valuable insights that enhance his technical expertise. Skilled in technologies like Node.js, React.js, and PostgreSQL, he focuses on building innovative solutions that elevate user experiences. A soccer enthusiast, Jorge embodies a collaborative mindset and values teamwork in every project. Fluent in both English and Spanish, he thrives on connecting with diverse communities, believing that technology has the power to unite and improve lives. Jorge is eager to leverage his skills to transform creative ideas into reality.
                        </p>
                    </div>
                    <div className="links__container">
                        <Link to='https://github.com/JorgeLG87'>
                            <i className="fa-brands fa-github"></i>
                        </Link> 
                        <Link to='https://www.linkedin.com/in/jorgelgodoy/'>
                            <i className="fa-brands fa-linkedin"></i>
                        </Link>
                    </div>
                </div>



                <div className="profile_container">
                    <div className="white_overlay">
                        <img 
                            src="https://example.com/niki-profile.jpg" 
                            alt="Niki, a tech enthusiast and nonprofit advocate" 
                            className='profile-pic' 
                        />
                    </div>
                    <h2 className="dev_name">Niki</h2>
                    <div className="bio_container">
                        <p className="profile_bio">
                            Nahida Niki Khanam is a tech enthusiast with a nonprofit background focused on supporting under-served communities and social justice. She believes technology can drive social change and has embraced coding to make that happen. Although she’s not a big foodie—usually just enjoying French fries—Niki is excited about an app that helps reduce food waste by linking users to highly rated meals, encouraging healthier choices, and supporting local businesses. Her goal is to use technology for meaningful impact.
                        </p>
                    </div>
                    <div className="links_container">
                        <Link to='https://github.com/incognito1025'>
                            <i className="fa-brands fa-github"></i>
                        </Link> 
                        <Link to='https://linkedin.com/in/nahida-niki-khanam-34b0b9302/' target="_blank">
                            <i className="fa-brands fa-linkedin"></i>
                        </Link>
                    </div>
                </div>






                </div>
            </div>
        </div>
    );
}
