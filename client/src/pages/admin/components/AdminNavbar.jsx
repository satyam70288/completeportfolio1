import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {AiOutlineClose} from "react-icons/ai"
import { toggle } from '../../../redux/slice/navSlice'
import { setPage } from '../../../redux/slice/pageSlice'
const AdminNavbar = () => {
  
  const toggleNav = useSelector((state) => state.nav.toggleNav);
  const page =useSelector((state) => state.page.page)

  const dispatch=useDispatch();
  console.log(toggleNav)

  return (
    <div className={`bg-zinc-900 bg-opacity-1 backdrop-blur-xl text-white w-screen z-10 rounded-xl lg:rounded-none fixed lg:static h-screen lg:h-fit flex flex-col lg:flex-row justify-evenly items-center lg:justify-between border border-none lg:border border-gray-500 lg:py-3 lg:px-2 lg:translate-x-0 transition-all delay-100 ease-in-out ${
      toggleNav ? "translate-x-0" : "translate-x-full"
    }`}>
    
      <AiOutlineClose className='absolute top-5 right-5 text-lg hover:scale-125 cursor-pointer transition-all lg:hidden '
      onClick={()=>{ dispatch(setPage("CreateProject"))
                     dispatch(toggle())
    }}
      />
      <ul  className="text-2xl  flex justify-center flex-col lg:flex-row gap-3 lg:gap-2">
        <li className='text-start cursor-pointer hover:bg-purple-500 hover:bg-opecity-60 hover:shadaw-lg py-1 px-2 transition-all outline-none rounded-md'
        onClick={()=>{ dispatch(setPage("CreateProject"))
        dispatch(toggle())}}
        > Create projects </li>
        <li className='text-start cursor-pointer hover:bg-purple-500 hover:bg-opecity-60 hover:shadaw-lg py-1 px-2 transition-all outline-none rounded-md'
        onClick={()=>{ dispatch(setPage("CreateSkill"))
        dispatch(toggle())}}
        >create Skill</li>
        <li className='text-start cursor-pointer hover:bg-purple-500 hover:bg-opecity-60 hover:shadaw-lg py-1 px-2 transition-all outline-none rounded-md'onClick={()=>{ dispatch(setPage("AllProjects"))
        dispatch(toggle())}}
        >All projects</li>
        <li className='text-start cursor-pointer hover:bg-purple-500 hover:bg-opecity-60 hover:shadaw-lg py-1 px-2 transition-all outline-none rounded-md'onClick={()=>{ dispatch(setPage("AllSkills"))
        dispatch(toggle())}}
        >All Skills</li>
 
      </ul>
      <button className='text-2xl px-2 py-1 text-center hover:bg-red-400 hover:bg-opecity-60 hover:shadow-lg rounded-lg transition-all outline-none self-center'>logout</button>

    </div>
  )
}

export default AdminNavbar