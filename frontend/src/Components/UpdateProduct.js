import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();
    const param = useParams();
    const token=JSON.parse(localStorage.getItem('token'));

    const header={headers:{'authorization':`bearer ${token}`}};

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        // console.warn(param.id)
        let result = await axios.get(`http://localhost:5002/prefill/${param.id}`,header);
        if(result.data.name){
            setName(result.data.name);
            setPrice(result.data.price);
            setCategory(result.data.category);
            setCompany(result.data.company);
        }
        // console.log(result.data.name);
    }

    const handleUpdate = async () => {
        let result=await axios.put(`http://localhost:5002/updateproduct/${param.id}`,{name,price,category,company},header);
        // console.warn(result.status)
        if(result.status==200){
            navigate('/')
        }else{
            alert('try again leter')
        }
    }
    return (
        <div className="product">
            <h1>Update Product Here</h1>

            <input type="text" placeholder="enter name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type="text" placeholder="enter price" className="inputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />

            <input type="text" placeholder="enter category" className="inputBox"
                value={category} onChange={(e) => { setCategory(e.target.value) }} />

            <input type="text" placeholder="enter company" className="inputBox"
                value={company} onChange={(e) => { setCompany(e.target.value) }} />

            <button className="appButton" onClick={handleUpdate}>Update</button>
        </div>
    )
}

export default UpdateProduct;