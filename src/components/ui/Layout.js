import React from 'react'
import SideBarNav from './SidebarNav'
import NavBar from './NavBar'


function Layout({children}) {
  return (
    <div>
      <NavBar></NavBar>
      <section className='flex'>
        <nav><SideBarNav/></nav>
        <section className="flex flex-grow justify-center mt-10 mb-24">{children}</section>
      </section>
    </div>
    
  )
}

export default Layout