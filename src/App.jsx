import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // const [count,setValue] = useState(0);
  const [users,setUsers] = useState([]);
  const [urlPage,setUrl] = useState([]);
  const [isLoaded,setLoad] = useState(false);

  document.title = "users";
  useEffect(()=>{
    let control = new AbortController();
    let signal = console.signal;
    let req = new Request ("https://api.github.com/users",{ method: "GET"});
    const loadData = async ()=>{
      const result = await fetch(req,{signal:signal}).
      then(res =>{
        if (!res.ok)
         throw new Error(res.statusText);
        else{
          setLoad(true);
          return res.json();
        }
      });      
      setUsers(result);
      }
    loadData();


    return () =>{
          control.abort();
    }
  },[]);


  if (!isLoaded){
    return <h1>loading ... </h1>
  }
  else
    return (
      <>

        <p className='list-title'>top github users:</p>
        <div className='all-usr'>
        {users.map((usr,index)=>{
          return <div className='user-info' key={index}>

            <div className='img-container'>
              <img className='image' src={usr.avatar_url} alt="avatar" />
            </div>

            <div className='username-container'>
              <p className='username'>{usr.login}
              </p>


              <p className='link'><a href={usr.html_url} target='_blank'>see page</a></p>
            </div>
            </div> ;} 
          )}
        </div>
      </>
    )
}

export default App
