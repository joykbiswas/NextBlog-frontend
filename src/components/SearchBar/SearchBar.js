const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => (
    <div className="bg-gray-200 w-fit mx-auto my-10 p-3 rounded">
      <form onSubmit={formSubmit} className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search By Title"
          value={value}
          onChange={handleSearchKey}
          className="bg-gray-200 outline-none  text-lg "
        />
        {value && (
          <p onClick={clearSearch} className="p-1 cursor-pointer bg-slate-400 rounded-lg hover:bg-red-400">
            X
          </p>
        )}
        <button className="outline-none border-none px-6 py-2 rounded bg-blue-700 text-white">
          Go
        </button>
      </form>
    </div>
  );
  
  export default SearchBar;
  