import Search from "./components/Search"
import { useState,useEffect } from "react"
import hero from '../public/hero-img.png' 
import MovieCard from "./components/MovieCard"

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
}
const Home = () => {
  const [search,setSearch] = useState<string>('')
  const [error,setError] = useState<string>('')
  const [movies,setMovies] = useState([])
  const [loading,setLoading] = useState<boolean>(false)
  
  const fetchMovies = async () => {
    setLoading(true)
    setError('')

    try {
      const endpoint = `${import.meta.env.VITE_API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const res = await fetch(endpoint,API_OPTIONS) 
      if (!res) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await res.json()

      if (data.Response === 'False') {
        setError(data.Error || "Failed to fetch movies.");
        return;
      }
      setMovies(data.results || [])
      console.log(data)
    } catch (error) {
      console.error(`Error fetching movies ${error}`)
      setError("Error fetching movies. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  },[])

  return (
    <div className="h-full bg-gray-800 flex justify-center flex-col items-center p-4 gap-4">
      <h2 className="text-purple-600 font-bold text-3xl mt-10">Next<span className="text-purple-700">flix</span></h2>
      <img className="h-[280px]" src={hero} alt="hero_image" />
      <h1 className="text-white lg:text-[56px] lg:w-[745px] text-2xl text-center font-bold">Find <span className="text-purple-300">Movies</span> You'll Enjoy Without the Hassle</h1>
      <Search search={search} setSearch={setSearch}/>
      <div>
        <h2 className="text-purple-400 text-center text-2xl font-medium">All Movies</h2>
        {loading ? (<p>Loading ...</p>) : error ? (<p className="text-red-600 font-medium ">{error}</p>) : (
          <div className="mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home