import React, { useEffect, useReducer, useState } from 'react'
import {projectFirestore , timestamp} from "../firebase/config" 
import { type } from '@testing-library/user-event/dist/type'

let initalState = {
    document : null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state , action) => {
    switch (action.type){
        case 'IS_PENDING':
            return { isPending: true , document : null, error: null, success: false }
        case 'ADDED_DOCUMENT':
            return { isPending: false , document: action.payload , success: true , error: null }
        case 'DELETED_DOCUMENT':
            return {isPending: false, document: null, success: true, error: null}
        case 'UPDATED_CASE':
            return {isPending: false, document: action.payload, success:true, error: null}
        case 'ERROR':
            return { isPending: false, document:null, success: false, error: action.payload }
        default: 
        return state
    }
}
//to add or remove data from the collection
export const useFirestore = (collection) => {
    const [response , dispatch] = useReducer(firestoreReducer , initalState);
    const [isCancelled , setIsCancelled] = useState(false);

    //collection ref
    const ref = projectFirestore.collection(collection)

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
                dispatch(action);
        }
    }

    //add a document
    const addDocument = async(doc) => {
        dispatch({type: 'IS_PENDING'});

        try {
            // console.log("Attempting to add document to collection:", collection);
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({...doc , createdAt});
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
        } catch (err) {
            dispatchIfNotCancelled({type: 'ERROR', payload:err})
        }
    }

    //delete a document
    const deleteDocument = async(id) => {
        dispatch({type: 'IS_PENDING'})

        try {
           await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
        } catch (error) {
            dispatchIfNotCancelled({type: 'ERROR', payload: 'Could not delete'})
        }
    }

    //update a document
    const updateDocument = async(id, updates) => {
        dispatch({type: 'IS_PENDING'})
        try {
            const updatedDocument = await ref.doc(id).update(updates)
            dispatchIfNotCancelled({type: 'UPDATED_DOCUMENT', payload: updatedDocument})
            return updatedDocument
        } catch (error) {
            dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    },[])

    return {addDocument, deleteDocument, updateDocument, response}
}

