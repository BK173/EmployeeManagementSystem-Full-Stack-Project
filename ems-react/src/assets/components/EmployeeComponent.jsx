import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeesService';
import { useNavigate ,useParams } from 'react-router-dom';

const EmployeeComponent = () => {
      const navigator = useNavigate();
    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[email,setEmail] = useState('');
    const {id} = useParams();

    const[errors,setErrors] = useState({
        firstName:'',
        lastName :'',
        email :''
    })
    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch((errors)=>{
                console.error(errors);
            })
        }
    },[id])

    function saveorUpdateEmployee(e){
       e.preventDefault();
       const employee = {firstName,lastName,email}
       console.log(employee);
       if(validateForm()){
        if(id){
             updateEmployee(id,employee).then((respone)=>{
                console.log(respone.data);
                navigator('/employees')
             }).catch(error=>{
                console.error(error);
             })
        } else {
        createEmployee(employee).then((Response)=>{
        console.log(Response.data)
        navigator('/employees')
      }).catch(error=>{
        console.error(error);
      })
        }
          

       }
  
       
    }
    //errors-validation
    function validateForm(){
        let valid = true;
        const copyErrors = {...errors}
        if(firstName.trim()){
            copyErrors.firstName='';
        } else{
            copyErrors.firstName="FirstName is required";
        }
        if(lastName.trim()){
            copyErrors.lastName='';
        } else{
            copyErrors.lastName="LastName is required"
        }
        if(email.trim()){
            copyErrors.email='';
        } else{
            copyErrors.email="Email is required";
        }
        setErrors(copyErrors);
        return valid;
    }
         function updateTitle(){
        if(id){
            return  <h2 className='text-center'>Update Employee</h2>
        }else{
             <h2 className='text-center'>Add Employee</h2>
        }
       }

  return (
    <div className='back'>
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
               {
                updateTitle()
               }
                <div className='card-body'>
                     <form>
                        <div className='form-group mb-2'>
                        <label className='form-label'>FirstName:</label>
                        <input 
                        type='text'
                        placeholder='enter the Employee FirstName...'
                        name='FirstName'
                        value={firstName} 
                        className={`form-control ${errors.firstName ? 'is-invalid':''}`}
                        onChange={(e)=>{
                            setFirstName(e.target.value)
                        }}>
                        </input>
                        {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                         <div className='form-group mb-2'>
                        <label className='form-label'>LastName:</label>
                        <input 
                        type='text'
                        placeholder='enter the Employee LastName...'
                        name='LastName'
                        value={lastName} 
                        className={`form-control ${errors.lastName ? 'is-invalid':''}`}
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }}>
                        </input>
                         {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                         <div className='form-group mb-2'>
                        <label className='form-label'>Email:</label>
                        <input 
                        type='text'
                        placeholder='enter the Employee Email'
                        name='email'
                        value={email} 
                        className={`form-control ${errors.email ? 'is-invalid':''}`}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}>
                        </input>
                         {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveorUpdateEmployee}>Submit</button>
                     </form>
                </div>
            </div>

        </div>

    </div>
    </div>
  )
}

export default EmployeeComponent