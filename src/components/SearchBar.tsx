import React, { useState } from "react";

interface SearchBarProps{
    onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) =>{
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault()
        if(searchTerm){
            onSearch(searchTerm)
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex justify-center mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Subreddit..."
          className="border p-2 rounded"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
    )

}

export default SearchBar