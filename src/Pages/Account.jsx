import "./Account.css";
import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { sendNewUserToDb } from "../Services/users.services.js";

// material ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material";
// import PreferenceCheckboxMUI from "../Components/PreferenceCheckboxMUI.jsx/PreferenceCheckboxMUI";
import ControlledCheckbox from "../Components/PreferenceCheckboxMUI.jsx/CheckboxesMUI";
import VegetarianCheckboxMUI from "../Components/PreferenceCheckboxMUI.jsx/VegetarianCheckboxMUI";
import VeganCheckboxMUI from "../Components/PreferenceCheckboxMUI.jsx/VeganCheckboxMUI";
import GlutenFreeCheckboxMUI from "../Components/PreferenceCheckboxMUI.jsx/GlutenFreeCheckboxMUI";



const label = { inputProps: {'aria-label': 'Checkbox demo'} }

export default function Account({
  vegetarian
  , setVegetarian
  , vegan
  , setVegan
  , glutenFree
  , setGlutenFree
}) {

  const API = import.meta.env.VITE_API_URL;

  //STATE TO KEEP TRACK OF THE USER
  const [ users, setUsers ] = useState([]);
  const [ activeUser, setActiveUser ] = useState({});

  // live site context
  const { currentUser } = useContext(AuthContext);
  const { email, uid } = currentUser;

  function getEmailUsername(email) {
    if (!email) return "User"
    return email.slice(0, email.indexOf('@'))
  }

    const [ currImage, setCurrImage ] = useState("../src/assets/images/seconds-white-middle-red-box.png")

    const fileUploader = useRef();

    function editImage() {
        fileUploader.current.click();
    };

    function uploadedFile () {
        const uploadedImage = fileUploader.current.files[0];
        const imageURL = URL.createObjectURL(uploadedImage);
        setCurrImage(imageURL)
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#009688',
            }
        }
    })

    const preferences = [
        {title: "vegetarian"},
        {title: "vegan"},
        {title: "gluten free"}
    ];

    const cuisines = [
        {title: "Italian"},
        {title: "Mexican"},
        {title: "Chinese"},
        {title: "American"},
        {title: "Indian"}
    ]

    //FETCHING USERS FROM DATABASE-----------------------------------------------------------------------------------------------
    useEffect(() => {
        fetch(`${API}/users`)
        .then(response => response.json())
        .then(res => setUsers(res))
        .catch(err => console.log(err));
    }, [uid]);

    useEffect(() => {
        console.log(users, "Users")
    }, [users]);
    
    //FETCHING THE ACTIVE USER DATA----------------------------------------------------------------------------------------------
    useEffect(() => {
        setActiveUser(users.filter(user => user.firebase_id === uid));
    }, [uid])
    useEffect(() => {
        console.log(activeUser[0], "Active User")
    }, [activeUser]);

    useEffect(() => {
        console.log(activeUser[0]?.user_id, "Active User ID")
    }, [activeUser]);

    const preferenceProps = {
        options: preferences,
        getOptionLabel: (option) => option.title,
      };

    const cuisineProps = {
        options: cuisines,
        getOptionLabel: (option) => option.title,
    };

    //----------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const savedPreference = localStorage.getItem("vegetarian");
        if (savedPreference !== null) {
          setVegetarian(Boolean(JSON.parse(savedPreference))); // Load saved state
        }
        console.log(vegetarian, "Account Page")
      }, []);
    const vegetarian2 = "vegetarian";

    useEffect(() => {
        const savedPreference = localStorage.getItem("vegan");
        if (savedPreference !== null) {
            setVegan(Boolean(JSON.parse(savedPreference)));
        }
    }, []);
    const vegan2 = "vegan";

    useEffect(() => {
        const savedPreference = localStorage.getItem("glutenFree");
        if (savedPreference !== null) {
            setGlutenFree(Boolean(JSON.parse(savedPreference)));
        }
    }, []);
    const glutenFree2 = "gluten free";

    function handleSubmit(e) {
        e.preventDefault();
        console.log(vegetarian, "Vegetarian inside handleSubmit")
        fetch(`${API}/users/${activeUser[0].user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                is_vegetarian: vegetarian,
                is_vegan: vegan,
                is_gluten_free: glutenFree
            })
            
        })
        .then(res => res.json())
        .then(data => console.log("Updated Data: ", data))
        .catch(err => console.log(err));
    };

    //-----------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        console.log(currentUser, "Current User")
}, [currentUser])

    useEffect(() => {
        console.log(uid,"UID")
    }, [uid])

    useEffect(() => {
        console.log(vegetarian, "Value of vegetarian in Account")
    }, [vegetarian]);

    useEffect(() => {
        console.log(vegan, "Value of vegan in Account")
    }, [vegan]);

    useEffect(() => {
        console.log(glutenFree, "Value of gluten free in Account")
    }, [glutenFree]);

    return  (
        <ThemeProvider theme={theme}>
        <div className="account-main-container">
            <div className="profile-pic-name">
                <div className="profile-pic-container">
                    <img className="change-image" src="/camera.svg" onClick={editImage}/>
                    <img className="profile-pic2" src={currImage} />
                    <input ref={fileUploader} type="file" className="choose-file" onChange={uploadedFile} hidden/>
                </div>
                <p className="account-name">Welcome {getEmailUsername(currentUser?.email)}!</p>
            </div>
            <button type="button" onClick={() => sendNewUserToDb({firebase_email: email, firebase_id: uid})}>send user to db</button>
            <p className="preference-title">Set Preferences</p>
            <div className="selections-main-container">
                <div className="vegetarian-selection-container">
                    {vegetarian ? <img className="vegetarian-selected" src="/vegetarianSelected.svg" /> : <img className="vegetarian-selected" src="/vegetarianBorder.svg" />}
                    <VegetarianCheckboxMUI vegetarian={vegetarian} setVegetarian={setVegetarian} activeUser={activeUser}/>
                </div>
                <div className="vegetarian-selection-container">
                    {vegan ? <img className="vegetarian-selected" src="/vegan-selected.svg" /> : <img className="vegetarian-selected" src="/vegan-border.svg" />}
                    <VeganCheckboxMUI className="vegetarian-checkbox" vegan={vegan} setVegan={setVegan} activeUser={activeUser}/>
                </div>
                <div className="vegetarian-selection-container">
                    {glutenFree ? <img className="vegetarian-selected" src="/glutenfree-selected.svg" /> : <img className="vegetarian-selected" src="/glutenfree-border.svg" />}
                    <GlutenFreeCheckboxMUI className="glutenfree-checkbox" glutenFree={glutenFree} setGlutenFree={setGlutenFree} activeUser={activeUser}/>
                </div>
            </div> 
            {/* <Stack spacing={4} sx={{ width: '70%', marginLeft: '15%'}} tabIndex={"-1"}> 
                <Autocomplete
                    {...preferenceProps}
                    id="auto-complete"
                    autoComplete
                    tabIndex={"-1"}
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label="Preferences" variant="standard" color="primary" inputProps={{ ...params.inputProps, tabIndex: -1 }}/>)}
                />
                <Autocomplete
                    {...cuisineProps}
                    id="auto-complete"
                    autoComplete
                    tabIndex={"-1"}
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label="Cuisine" variant="standard" color="primary" inputProps={{ ...params.inputProps, tabIndex: -1 }}/>)}
                />
            </Stack> */}
            <button className="set-preference-btn" type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
        </ThemeProvider>
    )
}
