import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {setSkills} from "../../../redux/slice/userSlice"
import { MdDelete } from "react-icons/md";


const AllSkills = () => {
const dispatch=useDispatch();
const skills=useSelector((state)=>state.user.skills)

  

  useEffect(() => {
    const getSkills = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/getSkills');
        const data =  await res.data.skills;
        dispatch(setSkills(data))
        console.log(skills)
      } catch (error) {
        console.error('Error fetching skills:', error.message);
      }
    };

    getSkills();
  }, []); // Empty dependency array to run the effect only once on component mount
  const deleteSkill=async(id)=>{
    const res= await axios.delete(`http://localhost:5000/api/deleteSkill/${id}`);
    alert(res.message)
     
  }
  return (
    <div className=" flex flex-col text-black h-[80vh] justify-center items-center ">
    
      {skills.map((skill) => (
        <div key={skill._id} className=" flex rounded-full justify-between item-center px-3 py-2 border w-[80vw] lg:w-[30vw]">
          <p>{skill.skill}</p>
          <progress 
          max={100}
          value={skill.level *20}
          className="progerss-bar rounded-full"
          />
          <MdDelete className="hoverscale-125 transition-all ease-in-out delay-100 cursor-pointer hover:text-red-800"  onClick={()=>deleteSkill(skill._id)}/>

        </div>
      ))}
    </div>
  );
};

export default AllSkills;
