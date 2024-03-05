import React, { useState ,useEffect} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const navigate=useNavigate();
    const token=JSON.parse(localStorage.getItem('token'));

    const header={headers:{'authorization':`bearer ${token}`}};

    const handleAdd = async () => {
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result=await axios.post('http://localhost:5002/addproduct',{name,price,category,company,userId},header);
        if(result.data.name){
            navigate('/');
        }else{
            alert('ERROR !!! not added ');
        }
        
       
    }
    return (
        <div className="product">
            <h1>Add Product Here</h1>

            <input type="text" placeholder="enter name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type="text" placeholder="enter price" className="inputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />

            <input type="text" placeholder="enter category" className="inputBox"
                value={category} onChange={(e) => { setCategory(e.target.value) }} />

            <input type="text" placeholder="enter company" className="inputBox"
                value={company} onChange={(e) => { setCompany(e.target.value) }} />

            <button className="appButton" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default AddProduct;