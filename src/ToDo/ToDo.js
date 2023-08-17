
import React, { useState } from 'react'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

const ToDo = () => {

    const getLocalData = () => {
        const myLocalData = localStorage.getItem("Todo")
        if (myLocalData) {
            return JSON.parse(myLocalData);
        }
        else {
            return [];
        }
    }

    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [editId, setEditId] = useState("")
    const [editbtn, setEditBtn] = useState(false)

    const addItems = () => {
        if (!inputData) {
            alert("Please Add some items here")
        }

        else if (inputData && editbtn) {
            setItems(items.map((currElement) => {
                if (currElement.id === editId) 
                {
                    return { ...currElement, name: inputData };
                }
                return currElement;
            })
            );
            setEditId("");
            setInputData("")
            setEditBtn(false);
        }

        else {
            const getId = {
                id: new Date().getTime().toString(),
                name: inputData,
            };

            setItems([...items, getId])
            setInputData("")
        }
    }

    const deleteObject = (objectId) => {
        const updatedData = items.filter((currElement) => {
            return objectId !== currElement.id;
        })
        setItems(updatedData);
    }

    const editObject = (editObjectId) => {
        const editData = items.find((currElement) => {
            return editObjectId === currElement.id;
        })
        setEditId(editData.id);
        setInputData(editData.name)
        setEditBtn(true);
    }

    const removeItems = () => {
        let arr = []
        setItems(arr);
    }

    useEffect(() => {

        localStorage.setItem("Todo", JSON.stringify(items));

    }, [items])

    return (

        <div className='container'>
            <h1 className='heading'> ToDo App </h1>
            <div className='todo'>
                <form className='form'>
                    <div style={{ position: 'relative' }}>
                        <input
                            className='formInput'
                            type="text"
                            placeholder='Add Items...'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        <FontAwesomeIcon
                            style={{
                                position: 'absolute',
                                top: '48%',
                                right: '92px',
                                transform: 'translateY(-50%)',
                                textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                fontSize: '22px',
                                color: 'whitesmoke',
                                // marginBottom:"2rem"
                            }}
                            onClick={addItems}
                            icon={faPlus}
                        />
                    </div>
                </form>

                <br />
                <div className='result'>
                    {items.length ? 

                     items.map((currElement) => {

                        return (
                            <>
                                <div key={currElement.id} className="resultElement">
                                    <div>
                                        {currElement.name}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon
                                            className='deleteIcon'
                                            onClick={() => deleteObject(currElement.id)}
                                            icon={faTrash}
                                        />
                                        <FontAwesomeIcon
                                            className='editIcon'
                                            onClick={() => editObject(currElement.id)}
                                            icon={faPenSquare}
                                        />
                                    </div>
                                </div>
                            </>
                        );
                    })
                    :
                    <h3 style={{color:"rgb(226, 226, 226)", marginTop:"0px"}}> No Item Added</h3>
                    
                    }
                   
                </div>

                <br />
                {items.length ?
                 <button className='btn' onClick={removeItems}> Clear </button>
                 :
                null}

            </div>
        </div>
    )
}

export default ToDo;
