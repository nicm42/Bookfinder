import { Cover, Title, Author, Publisher } from './Card.styles';
//import cardData from './dummyCards';

type CardType = {
  cover: string;
  title: string;
  author: string;
  publisher: string;
  link: string;
};

interface CardProps {
  card: CardType;
}

const Card = ({ card }: CardProps) => {
  console.log(card); //TODO it complains if I remove this but if I remove the return statement, App.tsx complains instead
  return (
    <>
      <Cover src={card.cover} />
      <Title data-testid="title">{card.title}</Title>
      <Author data-testid="author">{card.author}</Author>
      <Publisher data-testid="publisher">{card.publisher}</Publisher>
      <a href={card.link}>More information</a>
    </>
  );
};

export default Card;
