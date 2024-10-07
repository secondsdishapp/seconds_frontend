import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './About.css';
import AdeolaPic from '../assets/images/Adeola.png';
import AnthonyPic from '../assets/images/Anthony.png';
import AyyoubPic from '../assets/images/Ayyoub.png';
import JorgePic from '../assets/images/Jorge.png';
import NikiPic from '../assets/images/Niki.jpg';
import AboutPic from '../assets/images/seconds-top-view-table-food.png';

const teamMembers = [
    {
        name: "Adeola Aina-Marshall",
        bio: "Adeola is a committed Project and...",
        fullBio: "Adeola is a Project and Portfolio Manager with a strong foundation in technology, skilled in agile methodologies and project management. She is dedicated to fostering collaborative environments and driving project success. In her free time, she enjoys exploring culinary delights and volunteering within her community.",
        pic: AdeolaPic,
        github: 'https://github.com/datCodeGirl',
        linkedin: 'https://www.linkedin.com/in/adeola-ainamarshall-114a63304/',
    },
    {
        name: "Anthony Cannonier",
        bio: "Anthony Cannonier is a passionate Data...",
        fullBio: "Anthony Cannonier is a dedicated Data Specialist and Software Engineer based in the Bronx, New York. With expertise in data analytics and application development, he is passionate about using technology to solve complex problems. Outside of work, he enjoys hiking and photography.",
        pic: AnthonyPic,
        github: 'https://github.com/AntCannon',
        linkedin: 'https://www.linkedin.com/in/anthonycannonier/',
    },
    {
        name: "Ayyoub Belibel",
        bio: "Ayyoub is a devoted Project Coordinator...",
        fullBio: "Ayyoub is a dedicated Project Coordinator at Hyundai Engineering Co. Ltd. based in Queens, New York. He has a background in civil engineering and excels in project management, ensuring projects are completed on time and within budget. In his leisure time, he enjoys traveling and discovering new cultures.",
        pic: AyyoubPic,
        github: 'https://github.com/ayoublos',
        linkedin: 'https://www.linkedin.com/in/ayyoub-belibel/',
    },
    {
        name: "Jorge (Luis) Godoy Rodriguez",
        bio: "Jorge is a dedicated Full Stack Developer...",
        fullBio: "Jorge is a dedicated Full Stack Developer with a passion for crafting engaging and user-friendly applications. With experience in both front-end and back-end development, he thrives on solving problems and delivering high-quality software. In his free time, he loves to play soccer and volunteer at local charities.",
        pic: JorgePic,
        github: 'https://github.com/JorgeLG87',
        linkedin: 'https://www.linkedin.com/in/jorgelgodoy/',
    },
    {
        name: "Nahida Niki Khanam",
        bio: "Niki is a tech enthusiast with a nonprofit...",
        fullBio: "Niki Khanam is a tech enthusiast with a nonprofit background focused on supporting under-served communities and social justice initiatives. She combines her skills in technology with her passion for making a difference in the world. When she's not coding, she enjoys writing and exploring new music.",
        pic: NikiPic,
        github: 'https://github.com/incognito1025',
        linkedin: 'https://linkedin.com/in/nahida-niki-khanam-34b0b9302/',
    },
];

export default function About() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleBio = (index) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div>
            <div className="about-img">
                <img
                    src={AboutPic}
                    alt="Top view of table"
                    className="about-pic"
                />
            </div>
                <div className="about_container">
                    <h1 className="about_app">About us</h1>
                    <p className="about_mission">
                        Seconds enhances the dining experience by helping users discover satisfying dishes that perfectly match their preferences. With personalized recommendations based on ratings, Seconds ensures that users enjoy every meal and find delight in their dining choices!
                    </p>

                    <h4 className="slogan">Eat, rate, and celebrate—and always come back for Seconds!</h4>

                    <div className="team-list-container">
                        <h1>Team</h1>
                        <div className="team-list">
                            {teamMembers.map((member, index) => (
                                <div className="profile-container" key={member.name}>
                                    <div className="white-overlay">
                                        <img 
                                            src={member.pic} 
                                            alt={`${member.name}'s profile picture`} 
                                            className="profile-pic"
                                            onClick={() => toggleBio(index)}
                                        />
                                    </div>
                                    <h2 className="dev-name" onClick={() => toggleBio(index)}>{member.name}</h2>
                                    <div className="bio-container">
                                        <p className="profile-bio" onClick={() => toggleBio(index)}>
                                            {expandedIndex === index ? member.fullBio : member.bio}
                                        </p>
                                    </div>
                                    <div className="links__container">
                                        <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub Profile">
                                        <i className="fa fa-github"></i>
                                        </a>
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
                                        <i className="fa fa-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="spacer"></div>
            </div>
    
        );
}