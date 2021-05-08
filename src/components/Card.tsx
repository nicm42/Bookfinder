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
      {card.cover && <Cover src={card.cover} />}
      {card.title && <Title data-testid="title">{card.title}</Title>}
      {card.author && <Author data-testid="author">{card.author}</Author>}
      {card.publisher && (
        <Publisher data-testid="publisher">{card.publisher}</Publisher>
      )}
      {card.link && <a href={card.link}>More information</a>}
    </>
  );
};

export default Card;
