import { useState, useEffect} from 'react'

import SearchBar from "./components/SearchBar";
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';

import initialState from './initialState';
import getPosts from './fetch/fetch';


export default function App () {

  const [state, setState] = useState({...initialState})

  const fetchPosts = async ()=> {
      const {page, searchQuery} = state;
      
      try {
        const {data} = await getPosts(page, 12, searchQuery)
    const dataResult = data.hits;
        if (!dataResult.length) {
           throw new Error("Nothing found, try something else.")
        }
        return setState(({searchResult, page})=> {
          return {...state,
            searchResult:[...searchResult,...dataResult],
            loading:false, 
            page: page +1}
            }
            )
      }
      catch (error) {
         setState({error: error.message, loading:false})
      }

    }
  const searchQuery = (query) => {
    setState({...initialState,searchQuery:query,loading:true})
  }
  const loadMore = () => setState(
    ()=>{console.log(state.searchQuery)
    return {...state, loading: true}}
    
    )

  const modalOpen = (img,tags) => setState({tags:tags,largeImage:img,modal:true})

  const modalClose = () => setState({modal:false})

  useEffect(() => {
    const {searchQuery, page, loading} = state

    if (loading && (searchQuery || page >1 )){fetchPosts()}
        
  },[searchQuery, state.page])

  
    const {largeImage,searchResult,loading,modal,error,tags} = state
    return (
      <div>
        <SearchBar submit={searchQuery}/>
        {searchResult && <ImageGallery data={searchResult} modalOpen={modalOpen}/>}
        {error && <p className="Error">{error}</p>}
        {(searchResult?.length >= 1)&& <Button clicker={loadMore}/>}
        {loading && <Loader/>}
        {modal && 
        <Modal modalClose={modalClose}>
        <img 
        src={largeImage} 
        alt={tags} 
        onClick={()=>modalClose()}  />
        </Modal>}
      </div>
    )
  
}


