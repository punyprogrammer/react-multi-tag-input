
import './App.css';
import MultiTagInput from './components/MultiTagInput';
const validationFunction=(string)=>{

             return string.length>3;
}
function App() {
  return (
    <div className="App">
        <MultiTagInput maxTags={19} minLength={4}  validationFunction={validationFunction}/>
    </div>
  )
}

export default App;
