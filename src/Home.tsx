// src/Home.tsx
import Search from "./components/Search";
import { useState, useEffect } from "react";
import hero from "../public/hero-img.png";
import MovieCard, { type Movie } from "./components/MovieCard";
import { useDebounce } from "react-use";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

const Home = () => {
  // read page and query from the URL on first render
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") || 1);
  const initialQuery = searchParams.get("query") || "";

  const [search, setSearch] = useState<string>(initialQuery);
  const [error, setError] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debounceSearch, setDebounceSearch] = useState("");

  // Debounce: update debounceSearch 500ms after user stops typing
  useDebounce(() => setDebounceSearch(search), 500, [search]);

  // Build endpoint for search or discover, always include page
  const fetchMovies = async (query = "", page = 1) => {
    setLoading(true);
    setError("");

    try {
      const encodedQuery = encodeURIComponent(query);
      const endpoint = query
        ? `${import.meta.env.VITE_API_BASE_URL}/search/movie?query=${encodedQuery}&page=${page}`
        : `${import.meta.env.VITE_API_BASE_URL}/discover/movie?page=${page}&sort_by=popularity.desc`;

      const res = await fetch(endpoint, API_OPTIONS);
      if (!res) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await res.json();

      // TMDB returns results array; keep compatibility with your original checks
      setMovies(data.results || []);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching movies`, error);
      setError("Error fetching movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // When debounceSearch changes, reset page to 1 and update URL
  useEffect(() => {
    const newPage = 1;
    setPageNumber(newPage);

    const newParams = new URLSearchParams(searchParams.toString());
    if (debounceSearch) {
      newParams.set("query", debounceSearch);
    } else {
      newParams.delete("query");
    }
    newParams.set("page", String(newPage));
    setSearchParams(newParams, { replace: true }); // replace avoids adding history entry for every keystroke

    // fetch results for new query
    fetchMovies(debounceSearch, newPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]); // intentionally only when debounceSearch changes

  // When pageNumber changes (via buttons or URL), update URL and fetch
  useEffect(() => {
    const currentQuery = debounceSearch || "";
    const newParams = new URLSearchParams(searchParams.toString());

    if (currentQuery) {
      newParams.set("query", currentQuery);
    } else {
      newParams.delete("query");
    }
    newParams.set("page", String(pageNumber));
    setSearchParams(newParams);

    fetchMovies(currentQuery, pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]); // intentionally only when pageNumber changes

  // Keep component in sync with URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlPage = Number(searchParams.get("page") || 1);
    const urlQuery = searchParams.get("query") || "";

    // Only update state if URL differs from current state to avoid loops
    if (urlPage !== pageNumber) setPageNumber(urlPage);
    if (urlQuery !== search) setSearch(urlQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
  // scroll to top whenever page changes
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  const currentQuery = debounceSearch || "";
  const newParams = new URLSearchParams(searchParams.toString());

  if (currentQuery) {
    newParams.set("query", currentQuery);
  } else {
    newParams.delete("query");
  }
  newParams.set("page", String(pageNumber));
  setSearchParams(newParams);

  fetchMovies(currentQuery, pageNumber);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pageNumber]);


  // handlers for pagination buttons
  const goNext = () => setPageNumber((p) => p + 1);
  const goPrev = () => setPageNumber((p) => (p > 1 ? p - 1 : 1));

  return (
    <div className="h-full bg-gray-800 flex justify-center flex-col items-center p-4 gap-4">
      <h2 className="text-purple-600 font-bold text-3xl mt-10">
        Next<span className="text-purple-700">flix</span>
      </h2>
      <img className="h-[280px]" src={hero} alt="hero_image" />
      <h1 className="text-white lg:text-[56px] lg:w-[745px] text-2xl text-center font-bold">
        Find <span className="text-purple-300">Movies</span> You'll Enjoy
        Without the Hassle
      </h1>
      <Search search={search} setSearch={setSearch} />

      <div>
        <h2 className="text-purple-400 text-center text-2xl font-medium">
          All Movies
        </h2>
        {loading ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#FF17C9"
              stroke="#FF17C9"
              strokeWidth="15"
              r="15"
              cx="40"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#FF17C9"
              stroke="#FF17C9"
              strokeWidth="15"
              r="15"
              cx="100"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#FF17C9"
              stroke="#FF17C9"
              strokeWidth="15"
              r="15"
              cx="160"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        ) : error ? (
          <p className="text-red-600 font-medium ">{error}</p>
        ) : (
          <div className="mx-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            {movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={goPrev}
          className="bg-purple-500 p-3 cursor-pointer text-white font-bold"
        >
          <FaMinus />
        </button>
        <p className="text-white font-medium">Page {pageNumber}</p>
        <button
          onClick={goNext}
          className="bg-purple-500 p-3 cursor-pointer text-white font-bold"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Home;