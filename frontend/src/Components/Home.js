import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const [product, setProduct] = useState([]);
    const token=JSON.parse(localStorage.getItem('token'));

    const header={headers:{'authorization':`bearer ${token}`}};
 
    if (!user) {
        navigate('/signup')
    }
    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        let result = await axios.get("http://localhost:5002/getproduct",header);
        // console.log(result.data);
        if (result) {
            setProduct(result.data);
        }

    }

    const handleDelete = async (id) => {
        let result = await axios.delete(`http://localhost:5002/deleteproduct/${id}`,header);
        if (result.status == 200) {
            getProduct();
        }
        // console.log(result.status);
    }

    const handleSearch = async (e) => {
      
        const key=e.target.value;
        if(key){
            let result = await axios.get(`http://localhost:5002/search/${key}`,header);
            if(result.status==200){
                setProduct(result.data)
            }
        }else{
            getProduct();
        }
        
    }


    return (


        <div className="product-list">
            <input className="search-product-box" type="text" placeholder="Search Product Here.."  onChange={handleSearch} />
            <ul>
                <li>Sr No.</li>
                <li>Name</li>
                <li>price</li>
                <li>category</li>
                <li>company</li>
                <li>Action</li>
            </ul>


            {product.length > 0 ? product.map((item, k) => {
                return (

                    <ul key={item._id}>
                        <li>{k + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><>
                        
                        <button onClick={() => { handleDelete(item._id) }}>DELETE</button>
                            <Link to={`/update/${item._id}`}><button>UPDATE</button></Link>
                        </></li>
                    </ul>



                )
            }) :
                <h1>DATA NOT FOUND</h1>
            }
            <Link to={'/add'} ><button className="add-product-button" >ADD PRODUCT</button></Link>
        </div>




    )
}
export default Home;