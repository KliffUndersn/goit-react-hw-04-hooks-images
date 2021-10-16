import { Component } from 'react'
import fields from "./fields"

export default class SearchBar extends Component {

    state = {
      searchValue: ""
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.submit(this.state.searchValue)
      this.setState({searchValue:""})
    }
    
    handleChange = (e) => {
      return this.setState({searchValue:e.target.value})
    }

      render () {
        return(
            <header className="Searchbar">
            <form className="SearchForm"
                onSubmit={this.handleSubmit}
            >
              <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
              </button>
                  <input
                  {...fields.query}
                  onChange={this.handleChange}
                  value={this.state.searchValue}
                  />
              
            </form>
            </header>  
        )}
}

