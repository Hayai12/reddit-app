import React from 'react';
import { useAppSelector } from '../app/hooks';

const SubredditList: React.FC = () => {
  const { filteredSubreddits, status, error } = useAppSelector((state) => state.subreddits);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <ul className="mt-4">
      {filteredSubreddits.map((subreddit) => (
        <li key={subreddit.data.id} className="p-4 border-b">
          {subreddit.data.display_name}
        </li>
      ))}
    </ul>
  );
};

export default SubredditList;
