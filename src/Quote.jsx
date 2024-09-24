import React, { useState, useEffect } from 'react';
import './App.css';


function Jokes() {

    const [joke, setJoke] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchJoke();
      }, []);
      
    const fetchJoke = async () => {
        setLoading(true);
        try{
            const response = await fetch('https://v2.jokeapi.dev/joke/Any');
            const data = await response.json();
            // setJoke(data.joke);
            if (data.type === 'single') {
                setJoke(data.joke);
              } else {
                setJoke(`${data.setup} ... ${data.delivery}`);
              }
        }catch(error){
            setJoke('Something went wrong!');
        }finally{
            setLoading(false);
        }
    };

    

    const copyText = async () => {
        let text = document.getElementById('joke').innerHTML;
        await navigator.clipboard.writeText(text);            
    }

    
  return (
    <>
    <h1 className='header'>HumorHive</h1>
    <div className='container'>
        <div className='joke'>
            {loading ? <p>Loading...</p> : <p id='joke'>{joke}</p>}
        </div>
        <div>
            <div>
                <button className='btn' onClick={fetchJoke}>Get a new joke</button>
                <button className='copyButton' onClick={copyText}><img src='/src/assets/copy.svg'/></button>
            </div>
        </div>
    </div>
    </>
  );
}


export default Jokes