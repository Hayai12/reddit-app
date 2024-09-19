export const fetchSubreddits = async () => {
    try {
        const response = await fetch('https://www.reddit.com/subreddits/popular.json');
        if (!response.ok) {
            throw new Error('Network Response Bad');
        }

        const data = await response.json();
        
        // Suponiendo que la estructura es: data.data.children
        const subreddits = data.data.children;
        
        // Recuento de subreddits
        console.log(`Número de subreddits recibidos: ${subreddits.length}`);
        
        // Opcional: Mostrar detalles de los primeros subreddits
        console.log('Primeros 5 subreddits:', subreddits.slice(0, 5).map((item: any) => item.data.display_name));

        return data;
    } catch (error) {
        console.error('Error fetching subreddits:', error);
    }
};

export const fetchSubredditDetails = async (subredditName: string) => {
  const response = await fetch(`https://www.reddit.com/r/${subredditName}/about.json`);
  const data = await response.json();
  return data;
};
