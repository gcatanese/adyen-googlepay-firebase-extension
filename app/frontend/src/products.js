import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import './product.css';


export default function ProductList() {
  return (
    <ImageList rowHeight='300' >
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{ padding: 2}}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title=<a href={"/googlepay/" + item.order}>{item.title}</a>
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk0ODB8MHwxfHNlYXJjaHwxfHx0cmVlfGVufDB8fHx8MTYzMzM0NDA1MA&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Plant a Tree in Italy: €10',
    author: 'Johann Siemens',
    order: '1'
  },
  {
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk0ODB8MHwxfHNlYXJjaHwyOXx8dHJlZXxlbnwwfHx8fDE2MzMzNDQwNTA&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Plant a Tree in Canada: €12',
    author: 'Lukasz Szmigiel',
    order: '2'
  },
  {
    img: 'https://images.unsplash.com/photo-1476712395872-c2971d88beb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk0ODB8MHwxfHNlYXJjaHwyOHx8dHJlZXxlbnwwfHx8fDE2MzMzNDQwNTA&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Plant a Tree in Germany: €8',
    author: 'Kai Dörner',
    order: '3'
  },
  {
    img: 'https://images.unsplash.com/photo-1506126383447-1baf4fb3c267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk0ODB8MHwxfHNlYXJjaHwzMHx8dHJlZXxlbnwwfHx8fDE2MzMzNDQwNTA&ixlib=rb-1.2.1&q=80&w=400',
    title: 'Plant a Tree in Bahamas: €16',
    author: 'Jared Rice',
    order: '4'
  }
];
