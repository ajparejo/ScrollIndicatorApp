import { useEffect, useState } from 'react'
import './App.css'

function App({URL}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scrollbar, setScrollbar] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();

      if(data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }
  
  useEffect(() => {
    fetchData(URL);
  }, [URL]);

  const handleScroll = () => {
    console.log(document.body.scrollTop, document.documentElement.scrollTop, document.documentElement.scrollHeight, document.documentElement.clientHeight);
    
    const scrolledScreen = document.body. scrollTop || document.documentElement.scrollTop;
  
    const screenHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setScrollbar(scrolledScreen / screenHeight * 100);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => {

      });
    }
  })

  if(loading) {
    return <p>Loading...</p>
  }

  if(errorMessage) {
    return <p>{errorMessage}</p>
  }

  return (
    <>
      <div className='container'>
        <div className='sideContainer'>
          <div className="progressContainer">
            <div className='progressBar' style={{height: `${scrollbar}%`}}></div>
          </div>
        </div>
        <div className="dataContainer">
          <h1>Scroll Indicator</h1>
          {
            data && data.length > 0 ? data.map((item, index) => <p key={index}>{item.title}</p>) : null
          }
        </div>
      </div>
    </>
  )
}

export default App
