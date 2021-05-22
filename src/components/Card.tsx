import PropTypes, { string } from 'prop-types';
import { Cover, Title, Author, Publisher } from './Card.styles';
//import cardData from './dummyCards';

interface CardProps {
  card: any;
}

const Card = ({ card }: CardProps) => (
  <>
    {card.volumeInfo.imageLinks ? (
      <Cover
        src={card.volumeInfo.imageLinks.thumbnail}
        alt={card.volumeInfo.title}
      />
    ) : (
      'image missing TODO'
    )}

    {card.volumeInfo.title ? (
      <Title data-testid="title">{card.volumeInfo.title}</Title>
    ) : (
      'title missing TODO'
    )}

    {card.volumeInfo.authors ? (
      <Author data-testid="author">{card.volumeInfo.authors}</Author>
    ) : (
      'authors missing TODO'
    )}

    {card.volumeInfo.publisher ? (
      <Publisher data-testid="publisher">{card.volumeInfo.publisher}</Publisher>
    ) : (
      'publisher missing TODO'
    )}

    {card.volumeInfo.infoLink ? (
      <a href={card.volumeInfo.infoLink}>More information</a>
    ) : (
      'link missing TODO'
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
