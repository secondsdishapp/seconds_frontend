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
import DownArrowIcon from '../assets/images/down-arrow-green.svg';
import anime from 'animejs';

const teamMembers = [
    {
        name: "Adeola Aina-Marshall",
        bio: "Adeola is a committed Project and...",
        fullBio: "Adeola is a committed Project and Portfolio Manager with a strong foundation in technology, skilled in agile methodologies and project management. She is dedicated to fostering collaborative environments and driving project success. In her free time, she enjoys exploring culinary delights and volunteering within her community.",
        pic: AdeolaPic,
        github: 'https://github.com/datCodeGirl',
        linkedin: 'https://www.linkedin.com/in/adeola-ainamarshall-114a63304/',
    },
    {
        name: "Anthony Cannonier",
        bio: "Anthony Cannonier is a passionate Data...",
        fullBio: "Anthony Cannonier is a passionate Data Specialist and Software Engineer based in the Bronx, New York. With expertise in data analytics and application development, he is passionate about using technology to solve complex problems. Outside of work, he enjoys hiking and photography.",
        pic: AnthonyPic,
        github: 'https://github.com/AntCannon',
        linkedin: 'https://www.linkedin.com/in/anthonycannonier/',
    },
    {
        name: "Ayyoub Belibel",
        bio: "Ayyoub is a devoted Project Coordinator...",
        fullBio: "Ayyoub is a devoted Project Coordinator at Hyundai Engineering Co. Ltd. based in Queens, New York. He has a background in civil engineering and excels in project management, ensuring projects are completed on time and within budget. In his leisure time, he enjoys traveling and discovering new cultures.",
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
        fullBio: "Niki is a tech enthusiast with a nonprofit background focused on supporting under-served communities and social justice initiatives. She combines her skills in technology with her passion for making a difference in the world. When she's not coding, she enjoys writing and exploring new music.",
        pic: NikiPic,
        github: 'https://github.com/incognito1025',
        linkedin: 'https://linkedin.com/in/nahida-niki-khanam-34b0b9302/',
    },
];

// export default function About() {
// this line defines a React component named 'About'
// components are reusable pieces of UI in React
export default function About() {
    // useState is a Hook that lets us add state (data that can change) to our component
    // we create a state variable called 'expandedIndex' and a function to update it called 'setExpandedIndex'
    // we initialize 'expandedIndex' to null, meaning no bio is expanded initially
    const [expandedIndex, setExpandedIndex] = useState(null);

    // this function toggles (opens or closes) the bio section when called
    // 'index' is the position of the bio we want to toggle (for example, the first bio would be index 0)
    const toggleBio = (index) => {
        // check if the bio at 'index' is currently expanded (open)
        const isCurrentlyExpanded = expandedIndex === index;

        // set the expandedIndex to null (collapse all) if the bio is already expanded
        // otherwise, set it to the current index to expand that specific bio
        setExpandedIndex(isCurrentlyExpanded ? null : index);

        // get the HTML element for the bio we want to animate using its class name
        const bioElement = document.querySelector(`.bio-content-${index}`);

        // define the animation parameters based on whether the bio is expanding or collapsing
        const animationParams = isCurrentlyExpanded
            ? { translateY: [0, -30], opacity: [1, 0] }  // collapse animation
            // translateY moves the element vertically (up by 20 pixels) and fades it out (opacity from 1 to 0)
            : { translateY: [30, 0], opacity: [0, 1] }; // expand animation
            // translateY moves the element vertically (from 20 pixels below to its original position) and fades it in (opacity from 0 to 1)

        // anime is a library that creates animations easily
        // we call anime() to start animating the bio element with the parameters we defined above
        anime({
            targets: bioElement, // which element to animate
            ...animationParams, // spread syntax to include the animation parameters
            duration: 900, // the duration of the animation in milliseconds (900ms = 0.9 seconds)
            easing: 'easeInOutQuad', // the style of the animation; makes it start and end smoothly
            complete: () => { // this function runs when the animation is done
                // if we were collapsing the bio
                if (isCurrentlyExpanded) {
                    bioElement.textContent = ''; // clear the text from the bio element
                } else {
                    // if we were expanding the bio, show the full bio text
                    bioElement.textContent = teamMembers[index].fullBio; // 'teamMembers' is an array containing bio data
                }
            }
        });
    };



    return (
        // this returns the JSX structure of the component
        <div>
            {/* this div contains the image representing the about section */}
            <div className="about-img">
                <img
                    // this is the source image for the About section
                    src={AboutPic} 
                    alt="Top view of table" // this provides a description of the image for accessibility
                    className="about-pic" // this assigns a CSS class for styling the image
                />
            </div>
            
            {/* this div wraps the content of the about section */}
            <div className="about_container">
                {/* this is the main heading for the about section */}
                <h1 className="about_app">About Us</h1>
                {/* this paragraph describes the mission of the application */}
                <p className="about_mission">
                    Seconds enhances the dining experience by helping users discover satisfying dishes that perfectly match their preferences. With personalized recommendations based on ratings, Seconds ensures that users enjoy every meal and find delight in their dining choices!
                </p>
    
                {/* this is a smaller heading that acts as a slogan for the app */}
                <h4 className="slogan">Eat, rate, and celebrate—and always come back for Seconds!</h4>
    
                {/* this container holds the team members' information */}
                <div className="team-list-container">
                    {/* this is the title for the team section */}
                    <div className="team-title">Team</div>
                    {/* this div holds the list of team members */}
                    <div className="team-list">
                        {/* this maps over each member in the teamMembers array, creating a profile for each one */}
                        {teamMembers.map((member, index) => (
                            <div className="profile-container" key={member.name}>
                                {/* this div creates a white overlay for the profile picture */}
                                <div className="white-overlay">
                                    <img 
                                        src={member.pic} // this sets the source image for the member's profile
                                        alt={`${member.name}'s profile picture`} // this provides a description of the image for accessibility
                                        className="profile-pic" // this assigns a CSS class for styling the profile picture
                                        onClick={() => toggleBio(index)} // this triggers the toggleBio function when the picture is clicked
                                    />
                                </div>
                                {/* this heading displays the team member's name and is clickable to toggle their bio */}
                                <h2 className="dev-name" onClick={() => toggleBio(index)}>{member.name}</h2>
                                {/* this container holds the bio information of the team member */}
                                <div className="bio-container">
                                    <p className="profile-bio">
                                        {/* this span displays either the short bio or the full bio based on the expandedIndex state */}
                                        <span className={`bio-content bio-content-${index}`} onClick={() => toggleBio(index)}>
                                            {expandedIndex === index ? member.fullBio : member.bio} 
                                            {/* this checks if the current index is expanded; if yes, it shows the full bio, otherwise the short bio */}
                                            {expandedIndex !== index} {/* this seems unnecessary; it checks if the index is not expanded */}
                                        </span>
                                        {/* this img acts as a down arrow icon indicating more information can be shown */}
                                        <img 
                                            src={DownArrowIcon} // this sets the source image for the down arrow icon
                                            alt="Down arrow icon" // this provides a description of the image for accessibility
                                            className={`down-arrow-icon ${expandedIndex === index ? 'rotated' : ''}`} // this adds a 'rotated' class if the bio is expanded to rotate the arrow
                                            onClick={() => toggleBio(index)} // this keeps the functionality to toggle the bio when the arrow is clicked
                                        />
                                    </p>
                                </div>
    
                                {/* this container holds the links to the team member's GitHub and LinkedIn profiles */}
                                <div className="links__container">
                                    {/* this link navigates to the member's GitHub profile */}
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub Profile">
                                        <i className="fa fa-github"></i> {/* this displays the GitHub icon */}
                                    </a>
                                    {/* this link navigates to the member's LinkedIn profile */}
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
                                        <i className="fa fa-linkedin"></i> {/* this displays the LinkedIn icon */}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* this div serves as a spacer, likely for layout purposes */}
            <div className="spacer"></div>
        </div>
    );
}