import './Create.css';

import React, { useEffect, useState } from 'react'
import Select from 'react-select'; 
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../../components/Avatar';
import { timestamp } from '../../firebase/config';



const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const {documents} = useCollection('users')
  const [users, setUsers] = useState('');

  //form fields
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if(documents){
      const options = documents.map(user => {
        return {value:user , label: user.displayName}
      })
      setUsers(options);
    }

  },[documents])

  const handleSubmit = (e) => {
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

    //creating a project object that we are going to save to the db
    const project = {
      name, //name: name
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),

    }

    console.log(name, details, dueDate, category.value);
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
          onChange={(option) => setAssignedUsers(option )}
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
