import "./Account.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material";
// import PreferenceCheckboxMUI from "../Components/PreferenceCheckboxMUI.jsx/PreferenceCheckboxMUI";
import ControlledCheckbox from "../Components/PreferenceCheckboxMUI.jsx/CheckboxesMUI";
import { useEffect, useState, useRef } from "react"; 


const label = { inputProps: {'aria-label': 'Checkbox demo'} }

export default function Account() {

    const [ vegetarian, setVegetarian ] = useState(false);
    const vegetarian2 = "vegetarian";

    const [ vegan, setVegan ] = useState(false);
    const vegan2 = "vegan";

    const [ glutenFree, setGlutenFree ] = useState(false);
    const glutenFree2 = "gluten free";

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
        {title: "Vegetarian"},
        {title: "Vegan"},
        {title: "Gluten Free"}
    ];

    const cuisines = [
        {title: "Italian"},
        {title: "Mexican"},
        {title: "Chinese"},
        {title: "American"},
        {title: "Indian"}
    ]

    

    const preferenceProps = {
        options: preferences,
        getOptionLabel: (option) => option.title,
      };

    const cuisineProps = {
        options: cuisines,
        getOptionLabel: (option) => option.title,
    };

    //---------------------------------------------------------------------------------------------------------------

    return  (
        <ThemeProvider theme={theme}>
        <div className="account-main-container">
            <div className="profile-pic-name">
                <div className="profile-pic-container">
                    <img className="change-image" src="/camera.svg" onClick={editImage}/>
                    <img className="profile-pic2" src={currImage} />
                    <input ref={fileUploader} type="file" className="choose-file" onChange={uploadedFile} hidden/>
                </div>
                <p className="account-name">Welcome User!</p>
            </div>
            <p className="preference-title">Set Preferences</p>
            <div className="selections-main-container">
                <div className="vegetarian-selection-container">
                    {vegetarian ? <img className="vegetarian-selected" src="/vegetarianSelected.svg" /> : <img className="vegetarian-selected" src="/vegetarianBorder.svg" />}
                    <ControlledCheckbox preference={vegetarian2} className="vegetarian-checkbox"  setVegan={setVegan} setGlutenFree={setGlutenFree} setVegetarian={setVegetarian}/>
                </div>
                <div className="vegetarian-selection-container">
                    {vegan ? <img className="vegetarian-selected" src="/vegan-selected.svg" /> : <img className="vegetarian-selected" src="/vegan-border.svg" />}
                    <ControlledCheckbox preference={vegan2} className="vegetarian-checkbox" setVegan={setVegan} setGlutenFree={setGlutenFree} setVegetarian={setVegetarian}/>
                </div>
                <div className="vegetarian-selection-container">
                    {glutenFree ? <img className="vegetarian-selected" src="/glutenfree-selected.svg" /> : <img className="vegetarian-selected" src="/glutenfree-border.svg" />}
                    <ControlledCheckbox preference={glutenFree2} className="glutenfree-checkbox" setGlutenFree={setGlutenFree} setVegan={setVegan} setVegetarian={setVegetarian}/>
                </div>
            </div> 
            <Stack spacing={4} sx={{ width: '70%', marginLeft: '15%'}} tabIndex={"-1"}>
                <Autocomplete
                    {...preferenceProps}
                    id="auto-complete"
                    autoComplete
                    tabIndex={"-1"}
                    // onChange={(event, value) => value ? setFilterPreferences(value.title) : setFilterPreferences("")}
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label="Preferences" variant="standard" color="primary" inputProps={{ ...params.inputProps, tabIndex: -1 }}/>)}
                />
                <Autocomplete
                    {...cuisineProps}
                    id="auto-complete"
                    autoComplete
                    tabIndex={"-1"}
                    // onChange={(event, value) => value ? setFilterPreferences(value.title) : setFilterPreferences("")}
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label="Cuisine" variant="standard" color="primary" inputProps={{ ...params.inputProps, tabIndex: -1 }}/>)}
                />
            </Stack>
            <button className="set-preference-btn" type="button">Submit</button>
        </div>
        </ThemeProvider>
    )
}
