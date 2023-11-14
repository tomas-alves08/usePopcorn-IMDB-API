import { FC } from "react";
import { IWatchedMovie } from "../models/watched-movie.model";
import { IRatingData } from "../models/rating-data.model";

interface WatchedTitleProps {
  watched: IWatchedMovie[];
  ratingData: IRatingData;
}

const WatchedTitle: FC<WatchedTitleProps> = ({ watched, ratingData }) => {
  const { avgImdbRating, avgUserRating, avgRuntime } = ratingData;
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedTitle;
