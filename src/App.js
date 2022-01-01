// import logo from './logo.svg';
import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

function App() {
  return (
   <div className="App">
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/shop' element={<ShopPage />}/>
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
