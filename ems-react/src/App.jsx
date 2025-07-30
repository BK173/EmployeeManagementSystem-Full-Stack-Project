
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import ListEmployeesComponents from './assets/components/ListEmployeesComponents'
import HeaderComponent from './assets/components/HeaderComponent'
import FooterComponents from './assets/components/FooterComponents'
import EmployeeComponent from './assets/components/EmployeeComponent';

function App() {
  

  return (
    <>
      <Router>
      <HeaderComponent />
      <Routes>
         {/*http:localhost:5174*/}
        <Route path='/' element = {<ListEmployeesComponents />}></Route>
         {/*http:localhost:5174/employees */}
        <Route path='/employees' element={<ListEmployeesComponents />} ></Route>
        {/*http:localhost:5174/add-employee */}
        <Route path='/add-employee' element ={<EmployeeComponent />} ></Route>
         {/*http:localhost:5174/edit-employee/1 */}
        <Route path='/edit-employee/:id' element={<EmployeeComponent />}></Route>
      </Routes>
      <FooterComponents />
      </Router>
    </>
  )
}

export default App
