export default function SearchBar({ search, setSearch }) {

    function handleSearch (e) {
        setSearch(e.target.value)
    }

    return (
      <div className="search-bar_container">
        <input className='search-bar_input' type="text" placeholder="Search for a dish" onChange={handleSearch} value={search}/>
      </div>
    )
  }