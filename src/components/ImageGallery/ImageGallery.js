import PropTypes from 'prop-types'

const ImageGallery = ({data, modalOpen, galleryList}) => {   
            return (
                <div>
                    <ul className="ImageGallery" ref={galleryList}>
                    {data.map(e=>{return <li className="ImageGalleryItem" key={e.id} >
                    <img src={e.webformatURL} alt={e.tags} className="ImageGalleryItem-image" onClick={()=>modalOpen(e.largeImageURL,e.tags)}/>
                     </li>})}
                    </ul>
                </div>
            )
            }  


export default ImageGallery


ImageGallery.propTypes={
    data:PropTypes.arrayOf(PropTypes.shape(
        {id:PropTypes.number,
        webformatURL:PropTypes.string.isRequired,
        tags:PropTypes.string.isRequired,
        largeImageURL:PropTypes.string.isRequired,
        })),
    modalOpen:PropTypes.func.isRequired,
    galleryList:PropTypes.shape({current:PropTypes.instanceOf(Element)})
  }