import PropTypes, { string } from 'prop-types';
import { Cover, Title, Author, Publisher } from './Card.styles';
import cover from '../generic-book-cover.jpg';

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
      <Cover
        src={
          card.volumeInfo.imageLinks
            ? card.volumeInfo.imageLinks.thumbnail
            : cover
        }
        alt={card.volumeInfo.title ? card.volumeInfo.title : 'Book'}
      />

      <Title data-testid="title">
        {card.volumeInfo.title ? card.volumeInfo.title : 'Title missing'}
      </Title>

      <Author data-testid="author">
        {card.volumeInfo.authors ? formattedAuthors : 'Author missing'}
      </Author>

      <Publisher data-testid="publisher">
        {card.volumeInfo.publisher
          ? card.volumeInfo.publisher
          : 'Publisher missing'}
      </Publisher>

      {card.volumeInfo.infoLink ? (
        <a href={card.volumeInfo.infoLink}>More information</a>
      ) : (
        'Link missing'
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
