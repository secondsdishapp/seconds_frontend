import "./Account.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material";

export default function Account() {

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

    return  (
        <ThemeProvider theme={theme}>
        <div className="account-main-container">
            <div className="profile-pic-name">
                <div className="profile-pic-container">
                    <img className="change-image" src="/camera.svg" />
                    <img className="profile-pic2" src="/chicken-sandwich.webp" />
                </div>
                <p className="account-name">Welcome User!</p>
            </div>
            <p className="preference-title">Set Preferences</p>
            <Stack spacing={4} sx={{ width: '70%', marginLeft: '15%'}} tabIndex={"-1"}>
                <Autocomplete
                    {...preferenceProps}
                    id="auto-complete"
                    autoComplete
                    tabIndex={"-1"}
                    onChange={(event, value) => value ? setFilterPreferences(value.title) : setFilterPreferences("")}
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label="Preferences" variant="standard" color="primary" inputProps={{ ...params.inputProps, tabIndex: -1 }}/>)}
                />
                <Autocomplete
                    {...cuisineProps}
                    id="auto-complete"
                    autoComplete
                    tabIndex={"-1"}
                    onChange={(event, value) => value ? setFilterPreferences(value.title) : setFilterPreferences("")}
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label="Cuisine" variant="standard" color="primary" inputProps={{ ...params.inputProps, tabIndex: -1 }}/>)}
                />
            </Stack>   
        </div>
        </ThemeProvider>
    )
}
