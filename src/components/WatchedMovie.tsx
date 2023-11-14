import { FC } from "react";
import { IWatchedMovie } from "../models/watched-movie.model";

interface WatchedMovieProps {
  movie: IWatchedMovie;
  onDeleteWatchedMovie: (id: IWatchedMovie["imdbID"]) => void;
}

const WatchedMovie: FC<WatchedMovieProps> = ({
  movie,
  onDeleteWatchedMovie,
}) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.UserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatchedMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;
