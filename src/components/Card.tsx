import PropTypes, { string } from 'prop-types';
import { CardDiv, Cover, Info, Title, Author, Publisher } from './Card.styles';
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
      return author;
    });
  }

  return (
    <CardDiv data-testid="cardDiv">
      <Cover
        src={card.volumeInfo.imageLinks ? bookCover : cover}
        alt={card.volumeInfo.title ? card.volumeInfo.title : 'Book'}
      />

      <Info>
        <Title data-testid="title">
          {card.volumeInfo.title ? card.volumeInfo.title : 'Title missing'}
        </Title>
        <Author data-testid="author">
          {/* if I put the 'by' into the ternary operator with formatted authors
          it adds a random comma for some reason. Giving it its own ternary doesn't */}
          {card.volumeInfo.authors ? 'by ' : ''}
          {card.volumeInfo.authors ? formattedAuthors : 'Author missing'}
        </Author>
        <Publisher data-testid="publisher">
          {card.volumeInfo.publisher
            ? `Publisher: ${card.volumeInfo.publisher}`
            : 'Publisher missing'}
        </Publisher>
        {card.volumeInfo.infoLink ? (
          <a href={card.volumeInfo.infoLink}>More information</a>
        ) : (
          'Link missing'
        )}
      </Info>
    </CardDiv>
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
