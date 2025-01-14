import React from 'react'
import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


export default function ProjectSummary( { project }) {
    const {deleteDocument} = useFirestore('projects');
    const {user } = useAuthContext()
const navigate = useNavigate();

    const handleClick = (e) => {
        deleteDocument(project.id)
        navigate('/');

    }
  return (
    <div>
        <div className="project-summary">
            <div className="title-createdBy">

            <h2 className='page-title'>{project.name}</h2>
            <p className='created-by'>Created by: {project.createdBy.displayName}</p>
            </div>
            <p className="due-date">
                Project due by {project.dueDate.toDate().toDateString()}
            </p>
            <p className="details">
                {project.details}
            </p>
            <h4>Project is assigned to: </h4>
            <div className="assigned-users">
            {project.assignedUsersList.map(user => (
                <div key={user.id}>
                    <Avatar displayName={user.displayName}/>
                </div>
            ))}
           

        {/* <div className='project-comments'>

        
        <form className='add-comment'>
            <label>
                <span>Add new comment</span>
                <textarea
                // required
                // onChange={(e) => setNewComment(e.target.value)}
                // value={newComment}
                ></textarea>
            </label>
            <button className="btn">Add Comment</button>
        </form>
        </div> */}
    </div>
    </div>
            {/* {user.uid === project.createdBy.id && 
            ( */}
            <button className="btn" onClick={handleClick}>Mark as Complete</button>
            
        </div>
  )
}
