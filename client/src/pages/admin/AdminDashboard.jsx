import React from 'react';
import AdminNavbar from './components/AdminNavbar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../redux/slice/navSlice';
import AllProjects from "./components/AllProjects";
import CreateProject from "./components/CreateProject";
import CreateSkill from "./components/CreateSkill";
import AllSkills from "./components/AllSkills";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const toggleNav = useSelector((state) => state.nav.toggleNav);
  const page = useSelector((state) => state.page.page);
  console.log(page);

  return (
    <>
      <AdminNavbar />
      <GiHamburgerMenu
        onClick={() => dispatch(toggle())}
        className={`fixed text-xl text-black top-5 right-5 z-10 cursor-pointer lg:hidden ${
          toggleNav ? 'hidden' : 'block'
        }`}
      />

      <div className='w-full h-screen'>
        {(() => {
          switch (page) {
            case "CreateSkill":
              return <CreateSkill />;
            case "CreateProject":
              return <CreateProject />;
            case "AllProjects":
              return <AllProjects />;
            case "AllSkills":
              return <AllSkills />;
            default:
              return null; // Add a default case or handle it as needed
          }
        })()}
      </div>
    </>
  );
};

export default AdminDashboard;
