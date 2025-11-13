
const Search = ({search,setSearch}) => {
  return (
    <div>
        <input className="px-4 py-2 border rounded-md border-gray-500 bg-[#0f0d23] text-white lg:w-[640px] w-full outline-none focus:border-purple-500" type="text" value={search} placeholder="Type a movie name ... " onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

export default Search