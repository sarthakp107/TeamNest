import './Create.css';

import React, { useEffect, useState } from 'react'
import Select from 'react-select'; 
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../../components/Avatar';



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
    if(!category){
      setFormError('Project Category required');
      return
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
            onChange={(option) => setCategory(option)}
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
      
    </div>
  )
}
