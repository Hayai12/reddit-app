export const fetchSubreddits = async () => {
    try{
        const response = await fetch('https://www.reddit.com/subreddits/popular.json')
        if(!response.ok){
            throw new Error('Network Response Bad')
        }

        const data = await response.json()
        return data
    }catch(error){
        console.error(error)
    }
}
