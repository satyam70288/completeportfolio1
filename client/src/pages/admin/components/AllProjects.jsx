import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {setProjects} from "../../../redux/slice/userSlice"
import { MdDelete, MdEdit } from "react-icons/md";
import {TiTick} from "react-icons/ti"

const AllProjects = () => {
const dispatch=useDispatch();
const [edit ,setEdit]=useState(false)
const [selectedProject,setSelectedProject]=useState("")
const [newName,setNewName]=useState("")
const [newGithubUrl,setNewGithubUrl]=useState("")
const [newHostedUrl,setNewHostedUrl]=useState("")
const [selectedImage,setSelectedImage]=useState("")

const projects=useSelector((state)=>state.user.projects)
console.log(projects)

  

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/getProject');
        const data =  await res.data.projects;
        dispatch(setProjects(data))
         console.log(data)
      } catch (error) {
        console.error('Error fetching skills:', error.message);
      }
    };

    getProjects();
  }, []); // Empty dependency array to run the effect only once on component mount
  const deleteProject=async(id,public_id)=>{
    alert("are you sure you want to delete project")
    const res= await axios.delete(`http://localhost:5000/api/deleteProject/${id}`);
    alert(res.message)
     
  }
  const updateProject=async(id,public_id)=>{

  }
  return (
    <div className='flex flex-col justify-center items-center gap-5 lg:h-[90vh] lg:mt-500
    '>
      <div className='flex flex-col justify-center items-center w-[80vw] lg:w-[50vw]'>
        {projects.map((project) => (
          <div key={project._id} className='flex flex-col border-2 rounded-lg px-2 py-2 gap-3'>
            <div className='flex flex-col lg:flex-row justify-between gap-5'>
              <img 
                src={project.img} 
                alt={project.name} 
                className={`w-fit object-cover h-[180px] lg:w-[250px] lg:h-auto ${edit && "hidden"}`} 
              />
              <input 
                type="file"  
                name="img" 
                id="img"  
                accept="img" 
                className={`${!edit && "hidden"}`} 
              />
              <div className='flex flex-col gap-1'>
                <h1 className={`text-xl lg:text-3xl ${edit && 'hidden'}`}>
                  {edit ? (
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={selectedProject === project._id ? newName : project.name} 
                      className='w-full bg-transparent' 
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  ) : (
                    project.name
                  )}
                </h1>
                <label htmlFor="desc"> Desc: </label>
                <h1 className={`text-sm lg:text-base text-gray-950 ${edit && selectedProject === project._id && "bg-indigo-500"}`}>
                  {edit ? (
                    <input 
                      type="text" 
                      name="desc" 
                      id="desc" 
                      value={selectedProject === project._id ? newDesc : project.desc} 
                      className="w-full bg-transparent" 
                      onChange={(e) => setNewDesc(e.target.value)}
                    />
                  ) : (
                    project.desc
                  )}
                </h1>
                <label htmlFor="github"> GitHub: </label>
                <h1 className={`text-sm lg:text-base text-gray-950 ${edit && selectedProject === project._id && "bg-indigo-500"}`}>
                  {edit ? (
                    <input 
                      type="text" 
                      name="github" 
                      id="github" 
                      value={selectedProject === project._id ? newGithubUrl : project.githubUrl} 
                      className="w-full bg-transparent" 
                      onChange={(e) => setNewGithubUrl(e.target.value)}
                    />
                  ) : (
                    project.githubUrl
                  )}
                </h1>
                <label htmlFor="hosted"> Hosted: </label>
                <h1 className={`text-sm lg:text-base text-gray-950 ${edit && selectedProject === project._id && "bg-indigo-500"}`}>
                  {edit ? (
                    <input 
                      type="text" 
                      name="hosted" 
                      id="hosted" 
                      value={selectedProject === project._id ? newHostedUrl : project.hostedUrl} 
                      className="w-full bg-transparent" 
                      onChange={(e) => setNewHostedUrl(e.target.value)}
                    />
                  ) : (
                    project.hostedUrl
                  )}
                </h1>
              </div>
              <div className="lg:flex-col justify-between items-center rounded-lg gap-3 lg:px-1 py-2 bg-indigo-500 bg-opacity-30 flex flex-row">
                <MdEdit 
                className={` text-lg hover:scale-150 hover:text-red-600 ${edit && selectedProject === project._id ? "hidden" :"block"}`}
                
                onClick={()=>{
                  setEdit(!edit);
                  setSelectedProject(project._id);
                  setNewDesc(project.name);
                  setNewGithubUrl(project.githubUrl);
                  setNewHostedUrl(project.hostedUrl);
                }}/>
                <TiTick className={` text-lg hover:scale-150 hover:text-red-600 ${edit && selectedProject === project._id ? "block" :"hidden"}`}
                onClick={()=>updateProject(project._id,project.publicId)}
                />
                <MdDelete className={` text-lg hover:scale-150 hover:text-red-600 
               `} onClick={()=>deleteProject(project._id,project.publicId)} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default AllProjects;
