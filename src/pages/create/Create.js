import './Create.css';

import React, { useEffect, useState } from 'react'
import Select from 'react-select'; 
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../../components/Avatar';
import { timestamp } from '../../firebase/config';
import {useAuthContext} from '../../hooks/useAuthContext';
import {useFirestore} from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';



const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  //firebase collection
  const {documents} = useCollection('users');

  const [users, setUsers] = useState('');

  //form fields
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  //form errors
  const [formError, setFormError] = useState(null);
  const {user} = useAuthContext();

  //useFirestore hook
  const {addDocument, response} = useFirestore('projects');

  //useNavigate hook
  const navigate = useNavigate();


  useEffect(() => {
    if(documents){
      const options = documents.map(user => {
        return {value:user , label: user.displayName}
      })
      setUsers(options);
    }

  },[documents])

  const handleSubmit = async(e) => {
    e.preventDefault();
    setFormError(null);

    //empty category check
    if(!category){
      setFormError('Project Category required');
      return
    }

    //empty assigned user check
    if(assignedUsers.length < 1){
      setFormError('Please Assign the Project to atleast 1 user');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return{
        displayName: u.value.displayName, //current object we are iterating
        id: u.value.id
      }
    })

    //creating a project object that we are going to save to the db
    const project = {
      name, //name: name
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

   await addDocument(project);
   if(!response.error){
      navigate('/');
   }
  }
  return (
    <div className='create-form'>
      <h2 className='page-title'> Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name: </span>
          <input 
          required
          type="text" 
          onChange={(e) => setName(e.target.value)}
          value={name}
          />
        </label>
        <label>
          <span>Project details: </span>
          <textarea 
          required
          type="text" 
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          ></textarea>
        </label>

        <label>
          <span>Set Due Date</span>
          <input 
          required
          type="date" 
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
          />
        </label>
        <label>
          <span>Project Category: </span>
          <Select
            onChange={(option) => setCategory(option)} //option = user has currently selectedf
            options={categories}
          />
        </label>
        <label>
          <span>Assign to: </span> 
          <Select 
          onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti //select multiple

          />
        </label>
        <button className="btn">Add Project</button>
      </form>
      {formError && <p className='error'>{formError}</p>}
      
    </div>
  ) 
}
