const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => (
    <div className="bg-gray-200 w-fit mx-auto my-10 p-4 rounded">
      <form onSubmit={formSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Search By Title"
          value={value}
          onChange={handleSearchKey}
          className="bg-gray-200 outline-none border-none text-lg"
        />
        {value && (
          <span onClick={clearSearch} className="pr-2 cursor-pointer">
            X
          </span>
        )}
        <button className="outline-none border-none px-6 py-2 rounded bg-blue-700 text-white">
          Go
        </button>
      </form>
    </div>
  );
  
  export default SearchBar;
  