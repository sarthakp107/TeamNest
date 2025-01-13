
import { Link } from 'react-router-dom';
//styles
import './ProjectList.css';

import React from 'react'
import Avatar from './Avatar';


export default function ProjectList({ projects }) {

  return (
    <div className='project-list'>
        {projects.length === 0 && <p>No Projects Yet!!</p>}
        {projects.map(project => (
            <Link to={`/projects/${project.id}`} key={project.id}>
                <h4>{project.name}</h4>
                <p>Due by {project.dueDate.toDate().toDateString()}</p>
                <div className="assigned-to">
                    <ul>
                    {project.assignedUsersList.map(user => (
                        <li key={user.id}>
                            <Avatar displayName={user.displayName}/>
                        </li>
                    ))}
                    </ul>
                </div>
            </Link>
        )) }
    </div>
  )
}
