import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm, SubmitHandler} from 'react-hook-form'
import { loginSchema, loginUser } from '../schemas/SignInSchema';
import { userInfo } from '../types/types';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useFindUser } from "@/services/queries"
import { useState } from 'react';

function SignIn() {

  const navigate = useNavigate()
  const [notFound, serNotFound] = useState("")

  const { register, handleSubmit,
  formState:{errors} } = useForm<loginUser>({resolver: zodResolver(loginSchema), mode: "onBlur"});
  const {data: checkUser} = useFindUser()

  const onSubmit: SubmitHandler<loginUser> = (data) => {

      let findUser = checkUser?.find((user:userInfo) => user.username === data.userName && user.password === data.password)    
      findUser?.id && localStorage.setItem("userID", findUser.id) 
      localStorage.getItem("userID")? navigate('/'): serNotFound("This Account Not Found")
  }

  return (
    <main className='flex flex-col h-screen w-full  items-center'>
       <section className='w-full flex justify-end p-4'>      
        <Link to='/' className='text-blue-600'>Back</Link>
       </section>
       <section className='flex flex-col justify-center h-screen '>
            <form className='flex max-sm:gap-y-2 flex-col items-center justify-center border-2 w-[70vw] py-28  max-sm:w-[95vw] rounded-md  border-[#e0dfdf] shadow-lg h-fit max-sm:py-10 lg:w-[50vw] lg:py-10' onSubmit={handleSubmit(onSubmit)}>
              <img src={logo} className='w-[10rem] h-[8rem]'></img>
              <section className='w-full flex flex-col justify-center items-center'>
                  <input type='text' placeholder='Username' className='max-sm:my-2 border-2 max-sm:w-[75vw] rounded-md border-[#e0dfdf] mt-4  py-1 w-[50vw] px-1 lg:w-[35vw] lg:py-[0.4rem]'  {...register("userName")}></input>
                  <span className='text-red-600 text-[0.9em] max-sm:w-[75vw] w-[50vw] lg:w-[35vw]'>{errors.userName?.message}</span>
                  <input type='password' placeholder='Password' className='max-sm:my-2  border-2 max-sm:w-[75vw] rounded-md border-[#e0dfdf] mt-4  w-[50vw] py-1 px-1 lg:w-[35vw] lg:py-[0.4rem]'  {...register("password")}></input>
                  <span className='text-red-600 text-[0.9em] max-sm:w-[75vw] lg:w-[35vw] w-[50vw]'>{errors.password?.message}</span>
                  <span className='text-red-600 text-[0.9em] max-sm:w-[75vw] lg:w-[35vw] w-[50vw]'>{notFound}</span>

                  <footer className='flex flex-col gap-y-6 max-sm:mt-2 max-sm:w-[75vw] mt-4 lg:w-[35vw] lg:mt-8 w-[50vw]'>
                  <p className=' max-sm:text-[0.9em]'>Don't have an Account? <Link to='/signup' className='curser-pointer text-blue-800 underline'>Sign Up</Link></p>
                  <button className='max-sm:px-2 bg-[#6146cb] hover:bg-[#6141e0] rounded-sm py-1 text-white max-sm:w-32  w-[14vw] lg:w-[14vw] [0.4rem] lg:text-[1.2em]' type="submit">Login</button>
    
                  </footer>
              </section>
            </form> 
       </section>

      
    </main>
 
  )
}

export default SignIn
