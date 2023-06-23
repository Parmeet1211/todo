import { useState } from "react";
import "./todo.css"


//get the local storage data back
const getLocalData = () =>{
    const lists =localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

export default function Todo(){
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState();
    const[toggleButton,setToggleButton]=useState(false);

    //add item
    const addItem = () => {
        if (!inputdata) {
            alert('plz fill the data ')
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((curElem) => {
                  if(curElem.id===isEditItem){
                      return{...curElem, name: inputdata};
                  }
                  return curElem;
                })
            )
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);

        }
        else
        {
            const myNewInputData =
            {
                id:new Date().getTime().toString(),
                name: inputdata,
                           
            };
            
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    }
    //edit items
    const editItem = (index) =>{
        const item_todo_edited = items.find((curElem) =>{
            return curElem.id===index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }
    //delete items
    const deleteItem = (index) =>{
        const updatedItems = items.filter((curElem) =>{
            return curElem.id!==index;
        });
        setItems(updatedItems);

    }
    //remove all the elements
    const removeAll = () => {
        setItems([]);
     };
    return(
        <>
            <div className='container'>
                <div className='row my-5 py-5'>
                    <figure>
                        <img src="./images/todo.svg" alt='todo-logo' className="rounded mx-auto d-block" style={{height:'200px'}}/>
                        <br/>
                        <figcaption className="text-center h3">TODO LIST</figcaption>
                    </figure>
                    <div className='col-12 text-center'>
                        <input
                            type="text"
                            placeholder='✍ Add Items'
                            className='form-control w-50 mx-auto'
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {toggleButton ?(
                            <i className="far fa-edit add-btn h3 mt-2" onClick={addItem}></i>
                            ) : 
                            (
                            <i className="fa fa-plus add-btn h3 mt-2" onClick={addItem}></i>
                            )}
                        <br/>
                        
                    </div>
                    {/* show our items */}

                    <div className='col-12 my-2'>
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem w-50 mx-auto" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" 
                                        onClick={() =>editItem(curElem.id)}></i>
                                        <i class="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id) }
                                        ></i>
                                    </div>

                                </div>

                            );
                        })}

                    </div>
                    {/* Remove all button */}
                    <div className='col-12 text-center my-2'>
                        <button className='btn btn-outline-danger' data-sm-link-text="Remove All" 
                        onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>

                    </div>
                </div>

            </div>
        </>
    )
}