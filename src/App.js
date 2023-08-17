import ToDo from "./ToDo/ToDo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div>
      
      <Router>
        <Routes>
          <Route exact path="/" element={<ToDo/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
