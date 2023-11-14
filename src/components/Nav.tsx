import { FC } from "react";
import { IMovie } from "../models/movie.model";
interface NavProps {
  movies: IMovie[];
  query: string;
  onQuery: (inputQuery: string) => void;
}

const Nav: FC<NavProps> = ({ movies, query, onQuery }) => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </nav>
  );
};

export default Nav;
