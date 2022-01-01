// import logo from './logo.svg';
import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div className="hats">
    <h1>HATS PAGE</h1>
  </div>  
);

const HatDetailPage = () => {
  const params = useParams();
  console.log(params);
  return (
    <div className="hat_detail">
      <h1>HAT {params.hat_id} PAGE</h1>
    </div>  
  )
};

function App() {
  return (
   <div className="App">
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/hats' element={<HatsPage/>}/>
      <Route path='/hats/:hat_id' element={<HatDetailPage/>}/>
      <Route 
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <h1>There's nothing here!</h1>
          </main>
        }
      />
    </Routes>
   </div>
  );
}

export default App;
