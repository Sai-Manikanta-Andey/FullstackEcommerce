import React from 'react'
import './NewCollections.css'
import new_collection from '../assets/new_collections'
import Items from '../Items/Items'

const NewCollections = () => {
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {
              new_collection.map((item)=> <Items props={item} key={item.id} />)
            }
          
        </div>
    </div>
  )
}

export default NewCollections