import { FaSearch } from "react-icons/fa";

interface searchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<searchProps> = ({ search, setSearch }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full lg:w-[640px]">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />

        <input
          type="text"
          value={search}
          placeholder="Type a movie name"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 
                 bg-[#0f0d23] text-white border border-gray-600 rounded-xl
                 text-sm sm:text-base
                 outline-none focus:border-purple-500 transition-all"
        />
      </div>
    </div>
  );
};

export default Search;
