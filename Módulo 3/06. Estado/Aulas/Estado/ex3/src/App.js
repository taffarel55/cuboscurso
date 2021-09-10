import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import AlarmIcon from "@material-ui/icons/Alarm";
import StopIcon from "@material-ui/icons/Stop";
import Box from "@material-ui/core/Box";
import { useState } from "react";

function App() {
  const [tempo, setTempo] = useState({ seg: 0, estado: 'parado' });

  function iniciarTempo() {
    setTempo(t=> {return {...t, estado:'contando'}});
    const interval = setInterval(() => setTempo(t => {
      if (t.estado==='parado') clearInterval(interval);
      return {...t, seg:t.seg+1};
    }), 1000);
  }

  function pararTempo() {
    setTempo(t=>{
      return {seg:t.seg,estado:'parado'}
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{tempo.seg}s</p>
        <Box
          sx={{
            display: "grid",
            gap: 8,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Button
            onClick={iniciarTempo}
            variant="contained"
            color="primary"
            startIcon={<AlarmIcon />}
          >
            Iniciar
          </Button>
          <Button
            onClick={pararTempo}
            variant="contained"
            color="secondary"
            startIcon={<StopIcon />}
          >
            Parar
          </Button>
        </Box>
      </header>
    </div>
  );
}

export default App;
