import PropTypes, { string } from 'prop-types';
import * as Styled from './Card.styles';
import cover from '../images/generic-book-cover.jpg';

interface CardProps {
  card: any;
}

const Card = ({ card }: CardProps) => {
  //The covers automatically have a curled edge, which I don't like
  //so we'll remove it
  let bookCover;
  if (card.volumeInfo.imageLinks) {
    bookCover = card.volumeInfo.imageLinks.thumbnail.replace('&edge=curl', '');
  }

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
      return `by ${author}`;
    });
  }

  //Making ternary operators variables so the return is easier to read
  const coverSrc = card.volumeInfo.imageLinks ? bookCover : cover;
  const coverAlt = card.volumeInfo.title
    ? `Cover for ${card.volumeInfo.title}`
    : 'Book cover';
  const titleText = card.volumeInfo.title
    ? card.volumeInfo.title
    : 'Title missing';
  const authorText = card.volumeInfo.authors
    ? formattedAuthors
    : 'Author missing';
  const publisherText = card.volumeInfo.publisher
    ? `Publisher: ${card.volumeInfo.publisher}`
    : 'Publisher missing';
  const linkText = card.volumeInfo.title ? card.volumeInfo.title : 'this book';
  const link = card.volumeInfo.infoLink ? (
    <a
      href={card.volumeInfo.infoLink}
      title={`More information about ${linkText}`}
    >
      More information
    </a>
  ) : (
    <p>Link missing</p>
  );

  return (
    <Styled.CardDiv data-testid="cardDiv">
      <Styled.Cover src={coverSrc} alt={coverAlt} />
      <Styled.Info>
        <Styled.Title data-testid="title">{titleText}</Styled.Title>
        <Styled.Author data-testid="author">{authorText}</Styled.Author>
        <Styled.Publisher data-testid="publisher">
          {publisherText}
        </Styled.Publisher>
        {link}
      </Styled.Info>
    </Styled.CardDiv>
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
