import "./App.css";
import Buttons from "./components/Buttons";
import TextFields from "./components/TextFields";
import CustomCard from "./components/CustomCard";
import CustomDialog from "./components/CustomDialog";

function App() {
  return (
    <div className="app">
      <Buttons variant="contained" />
      <TextFields />
      <CustomCard />
      <CustomDialog />
    </div>
  );
}

export default App;
