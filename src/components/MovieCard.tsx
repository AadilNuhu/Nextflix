

const MovieCard = ({movie:{title,original_language,poster_path,release_date,vote_average}}) => {
  return (
    <div className="rounded-xl bg-purple-950 p-3">
        <img className="h-100" src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : ""} alt={title} />
        <h3 className="text-gray-300 pt-2 font-medium">{title}</h3>
        <div className="flex justify-between pt-2">
            <p className="text-gray-300">{vote_average ? vote_average.toFixed(1) : '0'}⭐</p>
            <p className="text-gray-400">{original_language}</p>
            <p className="text-gray-400">{release_date.split('-')[0]}</p>
        </div>
    </div>
  )
}

export default MovieCard