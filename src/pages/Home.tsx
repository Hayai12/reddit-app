import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getSubreddits, setSearchTerm } from '../features/subreddits/subredditSlice';
import SearchBar from '../components/SearchBar';
import SubredditList from '../components/SubredditList';

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector((state) => state.subreddits.searchTerm);

  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchTerm(query));
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <SubredditList />
    </div>
  );
};

export default Home;
