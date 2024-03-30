import React, { useState } from 'react';
import { uploadImage } from '../../../helpers/uploadImage';
import axios from "axios"

const CreateProject = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [hostedUrl, setHostedUrl] = useState("");

  const handleImageChange = (e) => {
    // Handle image change logic here
    // Update the selectedImg state with the selected file
    const file=e.target.files[0];
    console.log(file.name)
    setSelectedImg(file)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    if(!name || !desc ||!selectedImg){
      return console.log("please fill all required feild")
    }
    const uploadImg=await uploadImage(selectedImg);
    console.log(uploadImg)
    // You can access the form values using the state variables (name, desc, selectedImg, githubUrl, hostedUrl)
    if(!uploadImg){
      return console.log("image not uploaded")
    }

    try{
      const res =await axios.post("http://localhost:5000/api/addProject",{
      name,
      desc,
      githubUrl,
      hostedUrl,
      secureUrl:uploadImg.secureUrl,
      publicId:uploadImg.publicId,
      deleteToken:uploadImg.deleteToken
      } )
      alert(res.data.message);
          setDesc("")
         setName("")
         setHostedUrl("")
         setGithubUrl("")
         setSelectedImg("")

    }catch(e){
      console.log(e.message)
    }

  };

  return (
    <div className='p-3 backdrop-blur-2 rounded-md w-fit mx-auto bg-black '>
      <h1 className='text-center text-3xl lg:text-5xl text-white mb-5'> Create Project </h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder='Enter project name'
          required
          value={name}
          className='px-3 py-2 border rounded-full w-full lg:w-[40vw] font-bold text-xl gradient-text'
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="8"
          placeholder='Enter project description'
          required
          value={desc}
          className='px-3 py-2 border rounded-lg w-full lg:w-[40vw] font-bold text-xl gradient-text'
          onChange={(e) => setDesc(e.target.value)}
        />

        <div>
          <label htmlFor='img'>Project Image</label>
          <input
            type="file"
            name="img"
            id="img"
            accept='image/*'
            onChange={handleImageChange}
            required
          />
        </div>

        <input
          type="url"
          name="githubUrl"
          id="githubUrl"
          placeholder='Enter Github URL'
          value={githubUrl}
          className='px-3 py-2 border rounded-full w-full lg:w-[40vw] font-bold text-xl gradient-text'
          onChange={(e) => setGithubUrl(e.target.value)}
        />

        <input
          type="url"
          name="hostedUrl"
          id="hostedUrl"
          placeholder='Enter hosted project URL'
          value={hostedUrl}
          className='px-3 py-2 border rounded-full w-full lg:w-[40vw] font-bold text-xl gradient-text'
          onChange={(e) => setHostedUrl(e.target.value)}
        />

        <button
          type="submit"
          className='bg-purple-500 px-3 py-2 rounded-full mx-auto w-[40vw lg:w-[10vw] font-bold text-xl'
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
