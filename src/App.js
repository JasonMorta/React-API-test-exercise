import './App.css';
import { useEffect, useState } from 'react';
import Cards from './Components/Cards';
import Loader from './Components/Loader';
import Button from 'react-bootstrap/Button';


function App() {

  const [apiData, setApiData] = useState(null);
  const [cardCount, setCardCount] = useState([0, 12]);
  //loader fill run on load and stop when data is fetched
  const [isLoading, setIsLoading] = useState(true);

  // Fetch API data on load
  useEffect(() => {
    async function fetchData() {
      await fetch("https://arthurfrost.qflo.co.za/php/getTimeline.php")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setApiData(data)
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          // If an error accurse, a message will be displayed in the UI
          setApiData(undefined)
          console.log("OOPS!", err)
        });
    }
    fetchData();
    console.log(cardCount);
  }, [cardCount]);



  // Limit the Timeline array to the first 10 items
  // The '?' is a optional chaining operator. 
  // Instead of breaking the code if the data is not there, it will return undefined
  const slicedArray = apiData?.Timeline.slice(...cardCount);// returns 0,10

  return (
    <>
      <div className="App">


        <div className='card_container'>
          {
            /* Remove the loading animation as soon as the data has been fetched */
            isLoading ? <Loader /> :
              slicedArray !== undefined ? slicedArray?.map((item, index) => (
                <Cards
                  key={item.RemoteId}
                  title={item.Title}
                  decs={item.Description}
                  image={item.Image}
                  audio={item.Audio}
                  category={item.Category}
                  releaseDate={item.CreateDate}
                  episode={item.Episode}
                  icon={item.Icon}
                />

              ))

                :
                <p>Sorry, something went wrong. Please try again later.</p>
          }
        </div>

      </div>
      <div className='next_buttons'>
        {
          // &gt;&gt; = >> 
          // &lt;&lt; = << 
        }
        <Button
          variant="secondary"
          // decrease both values by 12
          onClick={() => {
            setIsLoading(true)
            // prevent going below 0
            if (cardCount[0] > 0) {
              setCardCount([cardCount[0] - 12, cardCount[1] - 12])
            } else {
              setCardCount([0, 12])
            }
            
          }}
        > &lt;&lt; </Button>
        <Button
          variant="secondary"
          // increase both values by 12
          onClick={() => {
            setIsLoading(true)
            setCardCount([cardCount[0] + 12, cardCount[1] + 12])
          }}
        > &gt;&gt; </Button>
      </div>
    </>
  );
}

export default App;
