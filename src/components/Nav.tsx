import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import menu from '../assets/storeMenu.png'
import { IoIosLogOut } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useUser } from "@/services/queries"

function Nav() {
  const getUser = localStorage.getItem("userID") || ""
  const {data:userData}= useUser(getUser)
  const navigate = useNavigate()

 
  const logoutUser = ()=>{
    localStorage.removeItem("userID")
    navigate("/")
  }

  return (
    <nav className='w-full max-sm:h-auto flex-row-reverse  h-[6vh] max-sm:px-3 px-4 lg:px-12 lg:h-16 shadow-md flex justify-between items-center'>
    <section className='md:hidden'>
      <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content max-sm:py-2">
           
            <label htmlFor="my-drawer-4" className="bg-white  w-[2vw] drawer-button h-auto  btn border-none ">
                <img src={menu} className='max-w-[8vw] min-w-[8vw] '></img>
            </label>
          </div>
          <div className="drawer-side mt-16 z-20 ">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu pt-12 flex bg-white flex-col w-full gap-y-2 text-[1.2em] items-center  text-base-content min-h-full  p-4">
             
              {!getUser? (
                    <>
                    <Link to='/'>
                          <li className=' hover:text-primary '>Home</li>
                      </Link>
                      <Link to='/signin'>
                          <li className=' hover:text-primary '> Sign In</li>
                      </Link>
                      
                      <Link to='/signup'>               
                          <li className=' hover:text-primary'> Sign Up</li>
                      </Link>
                    </>  
                  ):(<>
                  
                  
                      <Link to='/'>
      
                            <li className=' hover:text-primary  hover:shadow-md'>Home</li>
              
                      </Link>
                      
                      <Link to='/cart'>
                            
                            <li className=' hover:text-primary hover:shadow-md'>Cart</li>
                           
                          
                      </Link>
                      
                 

                  
                  <li className=' hover:text-primary max-sm:px-2' onClick={()=>(document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}> Logout</li>
                  <dialog id="my_modal_2" className="modal">
                      <div className="modal-box">
                          
                          <p className="py-4 text-black text-[1.2em]">Are you sure you want to logout?</p>
                          <div className="modal-action">
                          <form method="dialog" >
                              <button className="btn mx-2 bg-red-500 text-white " onClick={logoutUser}>yes</button>
                              <button className="btn">No</button>

                        </form>
                          </div>
                      </div>
                    </dialog>
                        

                
                  </>)}
            </ul>
          </div>
        </div>
      
     

    </section>
    <ul className='flex lg:text-[1.1em] lg:gap-6 justify-center items-center max-sm:hidden max-md:hidden'>
     

      {!getUser? (
        <>
          <Link to='/signin'>
              <li className=' lg:pl-0 pr-2 hover:text-primary'> Sign In</li>
          </Link>
          <Link to='/signup'>               
              <li className=' lg:px-0 px-3 hover:text-primary'> Sign Up</li>
          </Link>
        </>  
      ):(<>
       
      
      <li className='relative hover:shadow-md  '>
        <p className='rounded-full  absolute top-[-30%] left-[-20%] px-1 h-auto w-auto bg-red-500 text-[0.5em] text-center text-white'>{userData?.cartItem?.length}</p>
        <Link to='/cart'>
            {/* <img src={cartLogo} className='lg:h-auto max-md:w-[3vh] lg:w-[3vw] max-sm:max-h-[2.5vh]  h-[3vh] max-sm:w-[12vw]'></img> */}

            <IoCartOutline size={26}/>
            
        </Link>
      </li>
      <li className='  pl-3 lg:pl-0 hover:text-primary max-sm:px-2' onClick={()=>(document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}> <IoIosLogOut size={26} />
      <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                  
                  <p className="py-4 text-black text-[1.2em]">Are you sure you want to logout?</p>
                  <div className="modal-action">
                  <form method="dialog" >
                      <button className="btn mx-2 bg-red-500 text-white " onClick={logoutUser}>yes</button>
                      <button className="btn">No</button>

                </form>
                  </div>
              </div>
              </dialog>
       </li>
     

      
      </>)}
        
    </ul>
    <Link to='/'>
       <img src={logo} className=' lg:w-[4vw] max-sm:w-[8vw] max-sm:h-[5vh] w-12 h-14'></img>

    </Link>

  
</nav>

    
  )
}

export default Nav
