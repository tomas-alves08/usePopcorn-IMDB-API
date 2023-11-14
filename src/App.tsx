import { useState, useEffect } from "react";
import { IWatchedMovie } from "./models/watched-movie.model";
import { IMovie } from "./models/movie.model";
import { IRatingData } from "./models/rating-data.model";

import Nav from "./components/Nav";
import Movies from "./components/Movies";
import WatchedTitle from "./components/WatchedTitle";
import WatchedMovies from "./components/WatchedMovies";
import { IError } from "./models/error.model";
import MovieDetails from "./components/MovieDetails";
// require("dotenv").config({ path: ".env.development" });

const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const apiKey: string = process.env.API_KEY;

function App() {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setError] = useState<IError["message"] | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [watched, setWatched] = useState<IWatchedMovie[]>([]);
  const [isOpen1, setIsOpen1] = useState<boolean>(true);
  const [isOpen2, setIsOpen2] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string>("");

  const avgImdbRating: number = average(
    watched.map((movie) => movie.imdbRating)
  );
  const avgUserRating: number = average(
    watched.map((movie) => movie.UserRating)
  );
  const avgRuntime: number = average(
    watched.map((movie) => Number(movie.Runtime.toString().split(" ").at(0)))
  );

  const ratingData: IRatingData = {
    avgImdbRating,
    avgUserRating,
    avgRuntime,
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal }
        );

        if (!resp.ok)
          throw new Error("Something went wrong with fetching movies!");

        const data = await resp.json();
        if (query !== "" && data.Response === "False")
          setError("Movie Not Found");

        setMovies(data.Search);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error("ERROR: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  const queryHandler = (inputQuery: string) => {
    setQuery(inputQuery);
  };

  function selectMovieHandler(id: string) {
    if (selectedId === id) closeMovieHandler();
    else {
      setSelectedId(id);
    }
  }

  function closeMovieHandler() {
    setSelectedId("");
  }

  function addWatchedHandler(movie: IWatchedMovie) {
    const movieIdx = watched.findIndex((m) => m.imdbID === movie.imdbID);

    if (movieIdx !== -1) {
      const newWatchedMovieList = [...watched];
      newWatchedMovieList[movieIdx] = movie;
      setWatched(newWatchedMovieList);
    } else setWatched((watched) => [...watched, movie]);
  }

  function deleteWatchedHandler(id: IWatchedMovie["imdbID"]) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Nav movies={movies} query={query} onQuery={queryHandler} />

      <main className="main">
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && (
            <Movies
              movies={movies}
              isLoading={isLoading}
              error={err}
              onSelectMovie={selectMovieHandler}
            />
          )}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              {selectedId ? (
                <MovieDetails
                  selectedId={selectedId}
                  onCloseMovie={closeMovieHandler}
                  onAddWatchedMovie={addWatchedHandler}
                />
              ) : (
                <>
                  <WatchedTitle watched={watched} ratingData={ratingData} />
                  <WatchedMovies
                    watched={watched}
                    onDeleteWatchedMovie={deleteWatchedHandler}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
