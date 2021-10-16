import { Component , createRef} from 'react'

import SearchBar from "./components/SearchBar";
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';

import initialState from './initialState';
import getPosts from './fetch/fetch';


export default class App extends Component {

  state = {
    ...initialState
  }

  galleryList = createRef()

  getSnapshotBeforeUpdate(_, prevState){
      if(prevState.searchResult.length < this.state.searchResult.length) {
          const {current} = this.galleryList;
          return current.scrollHeight;
      }
      return null;
  }

  componentDidUpdate(_, prevState, snapshot) {
    
    const {searchQuery, page, loading} = this.state
    const {searchQuery: prevResult, page: prevPage} = prevState.searchQuery

    if (loading && (searchQuery !== prevResult || page !== prevPage )){ 
      this.fetchPosts()
    }

     if(snapshot){
         window.scrollTo({
             top: snapshot,
             behavior: "smooth"
         });
     }    
    }

    fetchPosts = async ()=> {
      const {page, searchQuery} = this.state;
      
      try {
        const {data} = await getPosts(page, 12, searchQuery)
    const dataResult = data.hits;
        if (!dataResult.length) {
           throw new Error("Nothing found, try something else.")
        }
        return this.setState(({searchResult, page})=> {
          return {
            searchResult:[...searchResult,...dataResult],
            loading:false, 
            page: page +1}
            }
            )
      }
      catch (error) {
         this.setState({error: error.message, loading:false})
      }

    }
  searchQuery = (query) => {
    this.setState({...initialState,searchQuery:query,loading:true})
  }
  loadMore = () => this.setState({loading: true})

  modalOpen = (img,tags) => this.setState({tags:tags,largeImage:img,modal:true})

  modalClose = () => this.setState({modal:false})



  render() {
    const {largeImage,searchResult,loading,modal,error,tags} = this.state
    return (
      <div>
        <SearchBar submit={this.searchQuery}/>
        <ImageGallery data={searchResult} modalOpen={this.modalOpen} galleryList={this.galleryList}/>
        {error && <p className="Error">{error}</p>}
        {(searchResult.length >= 1)&& <Button clicker={this.loadMore}/>}
        {loading && <Loader/>}
        {modal && 
        <Modal modalClose={this.modalClose}>
        <img 
        src={largeImage} 
        alt={tags} 
        onClick={()=>this.modalClose()}  />
        </Modal>}
      </div>
    )
  }
}


