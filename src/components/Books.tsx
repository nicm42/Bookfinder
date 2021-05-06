import { Card, Cover, Title, Author, Publisher } from './Books.styles';
import { cards } from './dummyCards';

const Books = () => {
  console.log('Books');
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
