import NoPoster from "../assets/No-Poster.png";

export interface Movie {
  id: number;
  title: string;
  original_language: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({
  movie: { title, original_language, poster_path, release_date, vote_average, overview },
}) => {
  return (
    <div className="rounded-xl bg-purple-950 p-3 relative group overflow-hidden">
      {/* Movie Image */}
      <img
        className="object-cover rounded-lg w-full h-full transition-transform duration-300 group-hover:scale-105"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : NoPoster
        }
        alt={title}
      />

      {/* Movie Information (Visible by Default) */}
      <h3 className="text-gray-300 pt-2 font-medium">{title}</h3>

      <div className="flex justify-between pt-2">
        <p className="text-gray-300">
          {vote_average ? vote_average.toFixed(1) : "0"}⭐
        </p>
        <p className="text-gray-400 uppercase">{original_language}</p>
        <p className="text-gray-400">
          {release_date ? release_date.split("-")[0] : "N/A"}
        </p>
      </div>

      {/* Hover Overlay */}
      <div
        className="
          absolute inset-0 
          bg-black/70 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-300 
          flex items-center 
          justify-center 
          p-2
        "
      >
        <p className="text-white text-xl font-bold text-center px-4">
          {overview ? overview : "No Overview Available"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;