import './App.css';
import BoxOffice from './BoxOffice/BoxOffice';
import Mv from './BoxOffice/Mv';

import {Routes,Route} from 'react-router-dom';



function App() {
  return (
    <div className="App">
    {/*   <BoxOffice/>
      <Mv/> */}
      <Routes>
        <Route path='/' element={<BoxOffice/>}/>
        <Route path='/mv' element={<Mv/>}/>
      </Routes>
    </div>
  );
}

export default App;
