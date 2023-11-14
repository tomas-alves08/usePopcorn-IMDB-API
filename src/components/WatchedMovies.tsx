import { FC } from "react";
import { IWatchedMovie } from "../models/watched-movie.model";
import WatchedMovie from "./WatchedMovie";

interface WatchedMoviesProps {
  watched: IWatchedMovie[];
  onDeleteWatchedMovie: (id: IWatchedMovie["imdbID"]) => void;
}

const WatchedMovies: FC<WatchedMoviesProps> = ({
  watched,
  onDeleteWatchedMovie,
}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMovies;
