import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm, SubmitHandler} from 'react-hook-form'
import { formSchema, User } from '../schemas/SignUpSchema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png'
import {useNewUser} from '../services/queries'

function Signup() {

  const { register, handleSubmit, formState:{errors} } = useForm<User>({resolver: zodResolver(formSchema), mode: "onBlur"});
  const {mutateAsync: newUser} = useNewUser()
  const onSubmit: SubmitHandler<User> = (data) => {
    
    newUser({ 
      username: data.userName,
      email:data.userName,
      password: data.password
      }, {
      onSuccess:()=>{
        toast.success(
          <p className=''>
            Your Account has been Created, You Can Sign-In 
            <Link to='/signin' className='text-blue-500 underline ml-2'>Here</Link>
            
          </p>
          , {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });}
    })

  }

  return (
    <main className='flex flex-col  h-screen w-full  items-center'>
     
          <ToastContainer />
       <section className='w-full flex justify-end p-4'>      
        <Link to='/' className='text-blue-600'>Back</Link>
       </section>
       <section className='flex flex-col justify-center h-screen '>
            <form className='flex max-sm:gap-y-2 flex-col items-center justify-center border-2 w-[70vw] py-28  max-sm:w-[95vw] rounded-md  border-[#e0dfdf] shadow-lg h-fit max-sm:py-10 lg:w-[50vw] lg:py-4' onSubmit={handleSubmit(onSubmit)}>
            <img src={logo} className='max-sm:w-[10rem] max-sm:h-[8rem] w-[9rem] h-[7.5rem]'></img>

              <section className='w-full flex flex-col justify-center items-center'>
                  <input type='text' placeholder='Username' className='max-sm:my-2 border-2 max-sm:w-[75vw] rounded-md border-[#e0dfdf] mt-4  py-1 w-[50vw] px-1 lg:w-[35vw] lg:py-[0.4rem]'  {...register("userName")}></input>
                  <span className='text-red-600 text-[0.9em] max-sm:w-[75vw] w-[50vw] lg:w-[35vw]'>{errors.userName?.message}</span>
                  <input type='text' placeholder='Email' className='max-sm:my-2 border-2 max-sm:w-[75vw] rounded-md border-[#e0dfdf] w-[50vw] mt-4 py-1 px-1 lg:w-[35vw]  lg:py-[0.4rem]'  {...register("email")}></input>
                  <span className='text-red-600 text-[0.9em] max-sm:w-[75vw] lg:w-[35vw] w-[50vw]'>{errors.email?.message}</span>
                  <input type='passwoord' placeholder='Password' className='max-sm:my-2  border-2 max-sm:w-[75vw] rounded-md border-[#e0dfdf] mt-4  w-[50vw] py-1 px-1 lg:w-[35vw] lg:py-[0.4rem]'  {...register("password")}></input>
                  <span className='text-red-600 text-[0.9em] max-sm:w-[75vw] lg:w-[35vw] w-[50vw]'>{errors.password?.message}</span>

                  <footer className='flex flex-col gap-y-6 max-sm:mt-2 max-sm:w-[75vw] mt-4 lg:w-[35vw] lg:mt-8 w-[50vw] pb-2'>
                  <p className=' max-sm:text-[0.9em]'>Already Have an Account? <Link to='/signin' className='curser-pointer  text-blue-800 underline'>Sign In</Link></p>
                  <button className='max-sm:px-2 max-sm:w-32  bg-[#6146cb] rounded-sm py-1 text-white  hover:bg-[#6141e0] w-[12rem] [0.4rem] lg:text-[1.2em]' type="submit">Register</button>

                  </footer>
              </section>
            </form> 
       </section>
           
    </main>
  )
}

export default Signup