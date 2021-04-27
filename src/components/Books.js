import React from 'react';
import { Card, Cover, Title, Author, Publisher } from './Books.styles';

const Books = () => {
  const cards = [
    {
      id: 'id 1',
      cover: 'test image 1',
      title: 'title 1',
      author: 'author 1',
      publisher: 'publisher 1',
    },
    {
      id: 'id 2',
      cover: 'test image 2',
      title: 'title 2',
      author: 'author 2',
      publisher: 'publisher 2',
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <Card key={card.id} data-testid="card">
          <Cover />
          <Title data-testid="title" />
          <Author data-testid="author" />
          <Publisher data-testid="publisher" />
          <a href="#" data-testid="moreInfo">
            More information
          </a>
        </Card>
      ))}
    </>
  );
};

export default Books;
