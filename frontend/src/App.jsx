
import {BrowserRouter,Route,Router,Routes} from 'react-router-dom' 
import { Routing } from "./Routing"

function App() {


  return (
    <>
    <BrowserRouter>
    <Routing/>
    
    </BrowserRouter>
  
   
    </>
  )
}

export default App
 {/* <Account>
          <Router>
            <Route exact path="/" element={<Home/>} />
            
            <Route exact path="/signup" element={<Signup/>} />
            </Router> 
          </Account> */}