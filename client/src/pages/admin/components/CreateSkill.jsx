import React, { useState } from 'react';
import axios from 'axios';

const CreateSkill = () => {
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState(0);

  const addSkill = async (e) => {
    e.preventDefault();
     console.log(e)
    console.log('Skill:', skill); // Console log skill value
    console.log('Level:', level); // Console log level value

    if (!skill.trim() || level === 0) {
      alert('Please fill all fields.');
      return;
    }

    if (level > 0 && level <= 5) {
      try {
        const res = await axios.post('http://localhost:5000/api/addSkill', {
          skill,
          level: parseInt(level), // Parse level as integer
        });

        alert(res.data.message);
        setSkill('');
        setLevel(0);
      } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while adding the skill.');
      }
    } else {
      alert('Level should be between 1 and 5.');
    }
  };

  return (
    <div className='p-4 bg-black backdrop-blur-3x w-full rounded-md lg:w-fit mx-auto'>
      <h1 className='text-3xl lg:text-5xl text-white my-5'>Create Skill</h1>
      <form className='flex flex-col gap-3' onSubmit={addSkill}>
        <input
          type='text'
          name='skill'
          placeholder='Enter new Skill'
          className='px-3 py-2 w-full lg:w-[40vw] font-bold text-xl gradient-text rounded-full'
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          required
        />
        <input
          type='number' // Use type number for level input
          name='level'
          placeholder='Enter level (1-5)'
          className='px-3 py-2 w-full lg:w-[40vw] font-bold text-xl gradient-text rounded-full'
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        />
        <button
          type='submit'
          className='bg-purple-500 mx-auto w-[40vw] lg:w-[10vw] border rounded-full py-2 font-bold text-2xl'
        >
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default CreateSkill;
