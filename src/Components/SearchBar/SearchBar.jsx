export default function SearchBar({ setCuisine, search, setSearch, vegetarian, vegan, glutenFree }) {

    function handleSearch (e) {
        setSearch(e.target.value)
        setCuisine('')
    };

    

    return (
      <div className="search-bar_container">
        <input className='search-bar_input' type="text" placeholder="Search for a dish" onChange={handleSearch} value={search} />
      </div>
    )
  }