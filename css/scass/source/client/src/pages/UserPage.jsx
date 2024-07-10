import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext'
import useAxiosFetch from '../hooks/useAxiosFetch';
import { toast } from 'react-toastify';

const UserPage = () => {

    const axios = useAxiosFetch();

    const {user,setUser} = useContext(DataContext);

    const [listUser,setListUser] = useState([]);

    const [userLogin,setUserLogin] = useState({
        name:"",
        password:""
    })

    const [addUser,setAddUser] = useState({
        name:"",
        password:"",
        age:0
    })

    const loadData = async () => {
        try{
            const response = await axios.get("/users");
            const list = response.data

            setListUser(list);

        }catch(err){
            const errorMessage = err.response?.data.message || err.message
            console.log(errorMessage)
        }
    } 

    useEffect(() => {
           

        loadData();
    }, [])

    const login = async () => {
        try{
            const response = await axios.post("/users/login",userLogin);
            const userResponse = response.data;

            setUser(userResponse);
            localStorage.setItem('app_user',JSON.stringify(userResponse));

            
        }catch(err){
            const errorMessage = err.response?.data.message || err.message
            console.log(errorMessage)
        }
    } 

    const add = async () => {
        try{
            const response = await axios.post("/users",addUser);

            loadData();

            toast.success("Wow so easy!");
            
        }catch(err){
            const errorMessage = err.response?.data.message || err.message
            console.log(errorMessage)
        }
    } 

    const deleteUser = async (id) => {
        try{
            await axios.delete(`/users/${id}`);

            loadData();
            
        }catch(err){
            const errorMessage = err.response?.data.message || err.message
            console.log(errorMessage)
        }
    }

    const updateUser = async (id) => {
        try{
            await axios.put(`/users/${id}`,{name:"updated",age:66,password:"123"});

            loadData();
            
        }catch(err){
            const errorMessage = err.response?.data.message || err.message
            console.log(errorMessage)
        }
    }

    return (
        <div>
            <h1>Hello {user ? (
                <>
                    {user.name}
                </>
            ) : (
                <>
                No user yet
                </>
            )}</h1>

            <div>
                <input type="text" placeholder='name' value={userLogin.name} onChange={(e) => setUserLogin({...userLogin, name:e.target.value})}/>
                <input type="password" placeholder='password' value={userLogin.password} onChange={(e) => setUserLogin({...userLogin, password:e.target.value})}/>
                <button onClick={login}>Login</button>
            </div>

            <div className='mt-5'>
                Add user

                <div>
                    <input type="text" placeholder='name' value={addUser.name} onChange={(e) => setAddUser({...addUser, name:e.target.value})}/>
                    <input type="number" placeholder='age' value={addUser.age} onChange={(e) => setAddUser({...addUser, age:e.target.value})}/>
                    <input type="password" placeholder='password' value={addUser.password} onChange={(e) => setAddUser({...addUser, password:e.target.value})}/>
                    <button onClick={add}>Add</button>
                </div>
            </div>

            <div className='w-[50%]'>
                <table className='table-auto w-full border'>
                    <thead>
                        <tr className='bg-blue-50 text-left'>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser.map((u) => (
                            <tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.age}</td>
                                <th>
                                    <button className='bg-red-500 ' onClick={() => deleteUser(u.id)}>Delete</button>
                                </th>
                                <th>
                                    <button className='bg-green-500 ' onClick={() => updateUser(u.id)}>Update</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserPage