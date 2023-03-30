import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './NavBar'
import MainMint from './MainMint'


function App() {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    if(accounts[0]){
      console.log(accounts)
    }
  }, [accounts])

  return (
    <div className='overlay'>
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts}/>
        <MainMint accounts={accounts} setAccounts={setAccounts}/>
      </div>
      <div className='moving-background'>

      </div>
    </div>
    
  );
}

export default App;
