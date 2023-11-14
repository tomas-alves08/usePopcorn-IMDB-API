import { FC } from "react";
import { IMovie } from "../models/movie.model";
import Loading from "./Loading";
import Error from "./Error";
import { IError } from "../models/error.model";
import { IWatchedMovie } from "../models/watched-movie.model";

interface MoviesProps {
  movies: IMovie[];
  isLoading: boolean;
  error: IError["message"] | null;
  onSelectMovie: (id: string) => void;
}

const Movies: FC<MoviesProps> = ({
  movies,
  isLoading,
  error,
  onSelectMovie,
}) => {
  if (isLoading && !error) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Movies;
