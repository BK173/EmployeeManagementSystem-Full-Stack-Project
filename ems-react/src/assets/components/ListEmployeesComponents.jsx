import React, { useEffect, useState } from 'react'
import { deleteEmployee, ListEmployees } from '../service/EmployeesService';
import { useNavigate } from 'react-router-dom';
const ListEmployeesComponents = () => {
    
    const [employees,setEmployees] = useState([]);
      const navigator = useNavigate();
     useEffect(()=>{
         getAllEmployees();
     },[])
     function getAllEmployees(){
       ListEmployees().then((Response)=>{
            setEmployees(Response.data);
         }).catch(error=>{
            console.error(error);
         })
     }
     function addNewEmployee(){
        navigator('/add-employee')
     }
     function UpdateEmployee(id){
        navigator(`/edit-employee/${id}`)
     }
     function removeEmployee(id){
           console.log(id);
           deleteEmployee(id).then((response)=>{
            getAllEmployees();
           }).catch(error =>{
            console.error(error);
           })
     }


  return (
    
    <div className='container'>
        <h2 className='text-center'>List Of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee FirstName</th>
                    <th>Employee LastName</th>
                    <th>Employee Email_Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee=>
                        <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>UpdateEmployee(employee.id)}>Update</button>
                            <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)} 
                               style={{marginLeft:'10px'}}
                                >Delete</button>
                        </td>
                           </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeesComponents