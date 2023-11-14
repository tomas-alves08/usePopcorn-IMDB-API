import { FC, useEffect, useState } from "react";
import { IWatchedMovie } from "../models/watched-movie.model";
import Loading from "./Loading";
import StarRating from "../reusable-components/star-rating/StarRating";

interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatchedMovie: (movie: IWatchedMovie) => void;
}

const apiKey: string = process.env.API_KEY;

const MovieDetails: FC<MovieDetailsProps> = ({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
}) => {
  const [movieDetails, setMovieDetails] = useState<IWatchedMovie>({
    imdbID: "",
    Title: "",
    Year: "",
    Poster: "",
    Runtime: 0,
    imdbRating: 0,
    UserRating: 0,
    Plot: "",
    Released: "",
    Actors: [],
    Director: "",
    Genre: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);

  const {
    imdbID,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: release,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  movieDetails.UserRating = userRating;

  function handleAdd() {
    onAddWatchedMovie(movieDetails);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );

        const data = await resp.json();
        setMovieDetails(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    document.title = `🍿usePopcorn: ${movieDetails.Title}`;

    return () => {
      document.title = "🍿usePopcorn";
    };
  }, [movieDetails.Title]);

  useEffect(() => {
    const callback = (e: React.KeyboardEvent<HTMLInputElement> | any) => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  if (isLoading) return <Loading />;

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of the movie ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {release} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
          {userRating > 0 && (
            <button className="btn-add" onClick={handleAdd}>
              + Add to List
            </button>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
};

export default MovieDetails;
