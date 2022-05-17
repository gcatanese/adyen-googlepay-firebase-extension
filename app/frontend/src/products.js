import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import './product.css';


function ProductList() {

 const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get('/api/orders');
      setData(resp.data);
  }
  fetchData();

}, []);

  return (

    <ImageList rowHeight='300' >
      { data.map(order => (
        <ImageListItem key={order.image} sx={{ padding: 2}}>
          <img
            src={`${order.image}?w=248&fit=crop&auto=format`}
            srcSet={`${order.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={order.title}
            loading="lazy"
          />
          <ImageListItemBar
            title=<a href={"/googlepay/" + order.id}>{order.title}</a>
            subtitle={<span>by: {order.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ProductList;
