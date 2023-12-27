import React from 'react';
import './style.css';

function ItemList({title, description,url_repo}){
    return (<div className='item-list'>
                <a href={url_repo}><strong>{title}</strong></a>
                <p>{description}</p> 
                 <hr />
            </div>
            );
}

export default ItemList;