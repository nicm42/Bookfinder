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
      link: 'link 1',
    },
    {
      id: 'id 2',
      cover: 'test image 2',
      title: 'title 2',
      author: 'author 2',
      publisher: 'publisher 2',
      link: 'link 2',
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <Card key={card.id} data-testid="card">
          <Cover src={card.cover} />
          <Title data-testid="title">{card.title}</Title>
          <Author data-testid="author">{card.author}</Author>
          <Publisher data-testid="publisher">{card.publisher}</Publisher>
          <a href={card.link}>More information</a>
        </Card>
      ))}
    </>
  );
};

export default Books;
