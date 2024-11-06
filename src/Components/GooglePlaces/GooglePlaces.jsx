import "./GooglePlaces.css";

import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps"; 
import { useRef } from "react";

export default function GooglePlaces({ searchInput, setSearchInput, phoneNumber, setPhoneNumber, restNameInput, setRestNameInput, newRestaurant, setNewRestaurant, coordinates, setCoordinates}) {

    const inputRef = useRef();
    const API_KEY = import.meta.env.VITE_API_KEY;

    // const [map, setMap] = useState(google.maps.Map || null);
    // const [ autoComplete, setAutoComplete ] = useState(google.maps.places.Autocomplete || null);
    const [ selectedMarket, setSelectedMarket ] = useState(null);
  
    const [ currentLocation, setCurrentLocation ] = useState({
        lat: null,
        lng: null,
      });

    const [ invalidAddress, setInvalidAddress ] = useState(false);

    //CURRENT LOCATION--------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
              lat: Number(position.coords.latitude),
              lng: Number(position.coords.longitude),
            });
          }),
            (error) => {
              setError(error.message);
            };
        } else {
          setError("Geolocation is not supported by this browser.");
        }
      }, []);


    //------------------------------------------------------------------------------------------------------------------


    const options = {
        types: ["restaurant"],
        componentRestrictions: { country: "us" },
        fields: ["name", "formatted_phone_number", "formatted_address", "geometry"],
        strictBounds: true,
        locationBias: {
            center: {
                lat: currentLocation.lat,
                lng: currentLocation.lng,
            },
            radius: 5000,
        }

    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries: ["places", "core", "maps", "marker"],
      })    


    // useEffect(() => {
    //     console.log(isLoaded)
    // }, [isLoaded]);

    function handleOnPlacesChanged() {
        let address = inputRef.current.getPlaces();
        let validAddress = address.filter((address) => address.types.includes("premise") === false)
        setSearchInput(validAddress[0]?.formatted_address);
        setPhoneNumber(validAddress[0]?.formatted_phone_number);
        setRestNameInput(validAddress[0]?.name);
        console.log(address, "Address")
        console.log(validAddress, "Valid Address")
        if (validAddress.length === 0) {
            setInvalidAddress(true);
        } else {
            setInvalidAddress(false);
        }
    }

    //UPDATE THE NEW RESTAURANT NAME WHENEVER THE RESTNAMEINPUT IS UPDATED----------------------------------------------
    useEffect(() => {
        setNewRestaurant({...newRestaurant, name: restNameInput})
    }, [restNameInput])

    // useEffect(() => {
    //     if (searchInput) {
    //         console.log(searchInput, "Search Input")
    //     }
    // }, [searchInput]);


    //FUNCTION TO GET COORDINATES OF AN ADDRESS----------------------------------------------------------------------------
    async function getCoordinates(address) {
        const geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();

            if (data.status === "OK" ) {
                const location = data.results[0].geometry.location;
                return { lat: location.lat, lng: location.lng };
            } else {
                throw new Error(`Geocoding error: ${data.status}`);
            }
        } catch (error) {
            console.error("EError fetching geocode:", error);
            return null;
        }
    }

    useEffect(() => {
        if (searchInput && searchInput.trim() !== "") {
            getCoordinates(searchInput).then(coordinates => {
                if (coordinates) {
                    setCoordinates(coordinates);
                }
            });
        }
    } , [searchInput]);


    // useEffect(() => {
    //     console.log(coordinates, "Coordinates")
    // }, [coordinates]);


    //CALCULATING DISTANCE BETWEEN TWO COORDINATES---------------------------------------------------------------------

  function calculateDistance(point1, point2) {
    const earthRadiusMiles = 3959;
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLon = ((point2.lng - point1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusMiles * c;
  }

//   useEffect(() => {
//     console.log(currentLocation, "Current Location")
//   }, [currentLocation]);


    return (
        <div style={{width:"80%", marginTop: "30px"}}>
            {isLoaded && currentLocation.lat !== null && currentLocation.lng !== null ? 
            <StandaloneSearchBox className="search-box-container" onLoad={(ref) => inputRef.current = ref} onPlacesChanged={handleOnPlacesChanged} options={options}>
                <input className="places-search-input" type="text" placeholder="Search for a restaurant" />
            </StandaloneSearchBox>
            : <p>Loading...</p>}
            {invalidAddress && <p style={{color:"#FF5252"}}>Invalid address. Please try again, enter a Restaurant Place.</p>}
            <APIProvider apiKey={API_KEY} onLoad={() => console.log("Maps API loaded")}>
                {currentLocation ? 
                <Map
                    style={{width: "100%", height: "250px", marginLeft: "0%", borderRadius: "5px", marginTop: "30px"}}
                    defaultZoom={10}
                    center={{ lat: currentLocation.lat || 0, lng: currentLocation.lng || 0}}
                    mapId={"757334e0ef14872c"}
                    onCameraChanged={(event) => {
                        console.log("Camera changed: ", event)
                    }}>
                        {coordinates.lat !== null && coordinates.lng !== null &&
                        <AdvancedMarker position={{lat: coordinates.lat, lng: coordinates.lng}} onClick={() => setSelectedMarker({lat: coordinates.lat, lng: coordinates.lng, name: address.name})}/>
                        }
                </Map>
                : <p>Loading...</p>}
            </APIProvider>
        </div>
    )
}