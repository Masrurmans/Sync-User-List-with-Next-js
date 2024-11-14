'use client'
import Image from "next/image";
import { useState } from "react";



export default function Home() {

   const [data, setData] = useState([
    {
      id: "1221",
      name: "Masrur",
      surname: "Mansurov",
      status: false
    },
    {
      id: "12323",
      name: "Ismoil",
      surname: "Nasridinov",
      status: false
    },
    {
      id: "1423221",
      name: "Najibullo",
      surname: "Shamsudinov",
      status: true
    },
    {
      id: "1234231",
      name: "Parviz",
      surname: "Normahmadov",
      status: false
    }
  ])


  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [idx, setIdx] = useState(null)


  const editUser = () =>{
    setData(data.map((el)=> {
      if(el.id==idx){
        el.name = name,
        el.surname = surname
      }
      return el
    }))
    setName('')
    setSurname('')
  }


   const delUser =(id)=>{
   setData(data.filter((user)=> user.id != id))
   }


   const statusUser =(id)=>{
      setData(data.map((el)=> {
        if(el.id==id){
          el.status = !el.status
        }
        return el
      }))
    }


   const handleSubmit = (event) => {
    event.preventDefault()
    let obj = {
      name: event.target["Name"].value,
      surname: event.target["Surname"].value,
      id: Date.now(),
      status: false
    }
    setData([...data,obj])
    event.target.reset()
   }



  return (
    <div className="mt-[50px] m-auto ml-[50px]">

      <h1 className="text-[30px] font-medium">User List</h1> <br/>
      
        <form onSubmit={handleSubmit}>
        <div className="flex gap-[10px]">
        <input className="border p-[5px_10px]" name="Name" type="text" placeholder="Add Name" />
        <input className="border p-[5px_10px]" name="Surname" type="text" placeholder="Add Surname" />
        <button type="submit" className="border p-[5px_10px] hover:bg-blue-700 hover:text-white">Add User</button>
        </div>
        </form>


       <div className="flex gap-[10px] mt-[20px]">
        <input value={name} onChange={(e)=> setName(e.target.value)} className="border p-[5px_10px]" type="text" placeholder="Edit Name" />
        <input value={surname} onChange={(e)=> setSurname(e.target.value)} className="border p-[5px_10px]" type="text" placeholder="Edit Surname" />
        <button onClick={()=> editUser()} className="border p-[5px_10px] hover:bg-green-700 hover:text-white">Edit User</button>
       </div>


     <div className="flex gap-[30px] flex-wrap mt-[50px] mb-[50px]">
      {
        data.map((el)=>{
          return(
            <div key={el.id} className="border p-[30px] w-[250px] h-[180px] shadow-[0px_0px_5px_lightGray]">
              <h1>{el.name}</h1>
              <h1>{el.surname}</h1>
              <h1 style={el.status ? {color: "green"} : {color: "red"}}>{el.status ? "Active" : "Inactive" }</h1><br/>
              <div className="flex gap-[10px] items-center">
              <button className="border p-[0px_10px] rounded-sm hover:bg-red-700 hover:text-white" onClick={()=> delUser(el.id)}>Del</button>
              <button className="border p-[0px_10px] rounded-sm hover:bg-green-700 hover:text-white" onClick={()=> {setName(el.name),setSurname(el.surname),setIdx(el.id)}}>Edit</button>
              <input checked={el.status} onChange={()=> statusUser(el.id)} className="cursor-pointer" type="checkbox" />
              </div>
            </div>
          )
        })
      }
      </div>


    </div>
  );
}
