import PropTypes, { string } from 'prop-types';
import { Cover, Title, Author, Publisher } from './Card.styles';

interface CardProps {
  card: any;
}

const Card = ({ card }: CardProps) => {
  //If there's more than one author, we need to format them
  //otherwise it puts the names right next to each other with no comma or space
  const { authors } = card.volumeInfo;
  let formattedAuthors = '';
  if (authors) {
    formattedAuthors = authors.map((author: string[], index: number) => {
      if (index > 0) {
        if (index === authors.length - 1) {
          return ` & ${author}`;
        }
        return `, ${author}`;
      }
      return author;
    });
  }

  return (
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
        <Author data-testid="author">{formattedAuthors}</Author>
      ) : (
        'authors missing TODO'
      )}

      {card.volumeInfo.publisher ? (
        <Publisher data-testid="publisher">
          {card.volumeInfo.publisher}
        </Publisher>
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
};

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
