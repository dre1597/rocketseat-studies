import React from 'react';
import { Tweet } from './components/Tweet';

import './App.css';
import { MyRoutes } from './Routes';

function App() {
  // const [tweets, setTweets] = React.useState<string[]>([
  //   'Tweet 1',
  //   'Tweet 2',
  //   'Tweet 3',
  // ]);

  // function createTweet() {
  //   setTweets([...tweets, 'Tweet 5']);
  // }

  return (
    <MyRoutes />
    // <>
    //   {tweets.map((tweet) => (
    //     <Tweet text={tweet}></Tweet>
    //   ))}

    //   <button onClick={createTweet}>Add tweet</button>
    // </>
  );
}

export default App;
