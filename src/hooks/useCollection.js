//subscribing to a real time data
import React, { useEffect, useState, useRef } from 'react'
import {projectFirestore } from "../firebase/config" 

export const useCollection = (collection, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    //if we not using ref hook -> infinite loop in useEffect
    //_query is an array and is DIFFERENT on every function call
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        if(query){
            ref = ref.where(...query);
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy) //sorting
        }

        const unsubscribe = ref.onSnapshot((snapshot) => { //listens real time data
            let results = [];
            snapshot.docs.forEach((doc) => {
                results.push({...doc.data(), id: doc.id })//data = uid, name, amount .... id : id of the doc itself (eg refering to PAISA)
            })

            setDocuments(results);
            setError(null);
        }, (error) => {
            console.log(error);
            setError('Could not Fetch the Data');
        })

        //unsubscribe on unmount
        return () => unsubscribe(); //will no longer get the snapshot and update it after we move on to the next new page

    } , [collection , query, orderBy]);

    return {documents, error}
    
}
