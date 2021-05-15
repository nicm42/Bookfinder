import PropTypes, { string } from 'prop-types';
import { Cover, Title, Author, Publisher } from './Card.styles';
//import cardData from './dummyCards';

/* type CardType = {
  cover: string;
  title: string;
  author: string;
  publisher: string;
  link: string;
}; */

interface CardProps {
  card: any;
}

const Card = ({ card }: CardProps) => (
  //console.log(card);
  //below, imageLinks doesn't always exist - it's missing one if you search for The Illustrated Hitchhiker's Guide to the Galaxy
  // - maybe the && should be ternary operators instead, so it returns nothing if it doesn't exist
  // it works now but we might need ternary operators to show something intead of missing information
  <>
    {/* {card.volumeInfo.imageLinks ? (
        <Cover
          src={card.volumeInfo.imageLinks.thumbnail}
          alt={card.volumeInfo.title}
        />
      ) : (
        'image missing'
      )} */}
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
      <Publisher data-testid="publisher">{card.volumeInfo.publisher}</Publisher>
    )}
    {card.volumeInfo.infoLink && (
      <a href={card.volumeInfo.infoLink}>More information</a>
    )}
  </>
);

Card.propTypes = {
  card: PropTypes.shape({
    volumeInfo: PropTypes.shape({
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
      title: PropTypes.string,
      authors: PropTypes.arrayOf(string),
      publisher: PropTypes.string,
      infoLink: PropTypes.string,
    }),
  }).isRequired,
};

export default Card;
