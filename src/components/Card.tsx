import PropTypes from 'prop-types';
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
  card: any;
}

const Card = ({ card }: CardProps) => {
  console.log(card); //TODO it complains if I remove this but if I remove the return statement, App.tsx complains instead
  //below, imageLinks doesn't always exist - it's missing one if you search for The Illustrated Hitchhiker's Guide to the Galaxy
  // - maybe the && should be ternary operators instead, so it returns nothing if it doesn't exist
  // it works now but we might need ternary operators to show something intead of missing information
  return (
    <>
      {/* {card.volumeInfo.imageLinks ? (
        <Cover
          src={card.volumeInfo.imageLinks.thumbnail}
          alt={card.volumeInfo.title}
        />
      ) : null} */}
      {card.volumeInfo.imageLinks && (
        <Cover
          src={card.volumeInfo.imageLinks.thumbnail}
          alt={card.volumeInfo.title}
        />
      )}
      {card.volumeInfo.title && (
        <Title data-testid="title">{card.volumeInfo.title}</Title>
      )}
      {card.volumeInfo.authors[0] && (
        <Author data-testid="author">{card.volumeInfo.authors}</Author>
      )}
      {card.volumeInfo.publisher && (
        <Publisher data-testid="publisher">
          {card.volumeInfo.publisher}
        </Publisher>
      )}
      {card.volumeInfo.infoLink && (
        <a href={card.volumeInfo.infoLink}>More information</a>
      )}
    </>
  );
};

Card.propTypes = {
  card: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
