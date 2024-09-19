import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubreddits, getSubredditDetails } from '../features/subreddits/subredditSlice';

const SubredditList: React.FC = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector((state: any) => state.subreddits.filteredSubreddits);
  const selectedSubredditDetails = useSelector((state: any) => state.subreddits.selectedSubredditDetails);
  const status = useSelector((state: any) => state.subreddits.status);
  const error = useSelector((state: any) => state.subreddits.error);

  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  const handleSubredditClick = (subredditName: string) => {
    dispatch(getSubredditDetails(subredditName));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>{error}</div>;

  return (
    <div className="flex h-screen">
      {/* Lista de Subreddits */}
      <div className="w-1/2 p-4 border-r border-gray-200 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Popular Subreddits</h1>
        <div className="space-y-4">
          {subreddits.map((item: any) => (
            <div
              key={item.data.display_name}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleSubredditClick(item.data.display_name)}
            >
              <div className="flex items-center">
                {item.data.icon_img && (
                  <img
                    src={item.data.icon_img}
                    alt={item.data.display_name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{item.data.display_name}</h2>
                  <p className="text-sm text-gray-600 mt-2">{item.data.title}</p>
                  <p className="text-sm text-gray-600 mt-2">Subscribers: {item.data.subscribers}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Detalles del Subreddit */}
      <div className="w-1/2 p-4 overflow-y-auto">
        {selectedSubredditDetails ? (
          <div className="bg-gray-50 p-4 border rounded">
            <h2 className="text-xl font-bold">{selectedSubredditDetails.title}</h2>
            <p className="mt-2">{selectedSubredditDetails.public_description}</p>
            <p className="mt-2 text-sm text-gray-600">Subscribers: {selectedSubredditDetails.subscribers}</p>
            <p className="mt-2 text-sm text-gray-600">Created: {new Date(selectedSubredditDetails.created_utc * 1000).toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="text-gray-500">Select a subreddit to see details</div>
        )}
      </div>
    </div>
  );
};

export default SubredditList;
