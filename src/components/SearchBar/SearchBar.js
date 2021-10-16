import { useState } from 'react'
import fields from "./fields"

export default function SearchBar ({submit}) {

    const [searchValue, setSearchValue] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault();
      submit(searchValue)
      setSearchValue("")
    }
    
    const handleChange = (e) => {
      return setSearchValue(e.target.value)
    }

      
        return(
            <header className="Searchbar">
            <form className="SearchForm"
                onSubmit={handleSubmit}
            >
              <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
              </button>
                  <input
                  {...fields.query}
                  onChange={handleChange}
                  value={searchValue}
                  />
              
            </form>
            </header>  
        )
}

