import './App.css';
import React from 'react';
import RockPaperScissor from './RockPaperScissor';
import twitterLogo from './utils/twitter.svg';

function App() {
  const TWITTER_HANDLE = 'verci_eth';
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [game, setGame] = React.useState('');

  const walletConnected = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_accounts'});

    if(accounts.length !== 0){
      setCurrentAccount(accounts[0]);
    }
    else {
      setCurrentAccount('');
    }
  }

  const connectWallet = async () => {
      const { ethereum } = window;

      if(!ethereum) {
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
  }

  const renderConnectWallet = () => (
    <div>
      <p>🕹️ play games -- win rewards 🤑</p>
      <p>✍🏽 no sign up -- no personal info 🙅</p>
      <button onClick={connectWallet}>start playin</button>
    </div>
  )

  const selectGame = () => {
    setGame('rps');
  }

  const renderSelectGame = () => (
    <div>
      <p style={{color: '#FFDD00'}}><b>select game</b></p>
      <button onClick={selectGame}>
        rock paper scissor
      </button>
    </div>
  )

  React.useEffect(() => {
    walletConnected();
  })

  return (
    <div className='app'>
      <div className='container'>
        <div className='header-container'>
          <h1>dGames</h1>
          {currentAccount === '' ? ( renderConnectWallet() ) : <p>ur addy: <b>{currentAccount}</b></p>}
          {currentAccount !== '' & !game ? ( renderSelectGame() ) : null}
          {game === 'rps' ? ( <RockPaperScissor /> ) : null}
        </div>
        <div className='footer-container'>
          <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
            <img alt="Twitter Logo" className="footer-logo" src={twitterLogo} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default App;
