import { Link } from 'react-router-dom';
import errorPage from '../assets/errorLogo.png'

function ErrorPage() {
    
  return (
    <div id="error-page">
        <section className="flex h-screen bg-gray-100 gap-y-5 flex-col justify-center items-center px-6">
            <img src={errorPage} className='lg:w-[20rem] lg:h-[16rem]'></img>
            <h1 className="text-[1.5em]  text-center">Oops! <br></br> Sorry, an unexpected error has occurred.</h1>
            <Link to='/'>
                <button className='max-sm:px-2 bg-[#6146cb] hover:bg-[#6141e0] rounded-sm py-2 text-white max-sm:w-32  w-[14rem] lg:w-[14vw] [0.4rem] lg:text-[1.2em]'>Back to Home</button>
            </Link>


        </section>
      
      
    </div>
  );

}

export default ErrorPage
