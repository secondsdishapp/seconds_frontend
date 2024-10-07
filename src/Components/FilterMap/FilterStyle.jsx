import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

const preferences = [
    {title: "Vegan"},
    {title: "Vegetarian"},
    {title: "Gluten Free"}
];

const ratings = [
    {title: "Highest"},
    {title: "Lowest"}
];


export default function FilterStyle({ filterPreferences, setFilterPreferences, filterRatings, setFilterRatings }) {
  const preferenceProps = {
    options: preferences,
    getOptionLabel: (option) => option.title,
  };
  const ratingProps = {
    options: ratings,
    getOptionLabel: (option) => option.title,
  };

  const [value, setValue] = React.useState(null);

  return (
    <Stack spacing={8} sx={{ width: '80%' }} tabIndex={"-1"}>
        <Autocomplete
            {...preferenceProps}
            id="auto-complete"
            autoComplete
            tabIndex={"-1"}
            onChange={(event, value) => value ? setFilterPreferences(value.title) : setFilterPreferences("")}
            includeInputInList
            renderInput={(params) => (
            <TextField {...params} label="Preferences" variant="standard" inputProps={{ ...params.inputProps, tabIndex: -1 }}/>
            )}
            // PaperComponent={(props) => <div {...props} tabIndex={-1} />}
        />
        <Autocomplete
            {...ratingProps}
            id="auto-complete"
            autoComplete
            tabIndex={"-1"}
            onChange={(event, value) => value ? setFilterRatings(value.title) : setFilterRatings("")}
            includeInputInList
            renderInput={(params) => (
            <TextField {...params} label="Ratings" variant="standard" inputProps={{ ...params.inputProps, tabIndex: -1 }}/>
            )}
            // PaperComponent={(props) => <div {...props} tabIndex={-1} />}
        />
    </Stack>
  );
}

