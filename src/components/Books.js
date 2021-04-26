import React from 'react';
import { Card } from './Books.styles';

const Books = () => {
  const cards = ['book 1', 'book 2'];

  return (
    <>
      {cards.map((card) => (
        <Card key={card} data-testid="card">
          {card}
        </Card>
      ))}
    </>
  );
};

export default Books;
