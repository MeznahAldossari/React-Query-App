import bag from '../assets/bag.png'

function Hero() {
  return (
    <main className='w-full lg:px-12 px-10 max-sm:6 bg-[#f4f4f4b8] '>
      <section className='grid max-sm:grid-cols-1 max-sm:py-12 grid-cols-2 h-fit '>
      <section className='flex flex-col max-sm:gap-y-4 max-sm:items-center max-sm:justify-start justify-center lg:gap-y-8'>
        <h1 className='max-sm:text-[1.8em] lg:text-[2.5em] text-[2.2em] font-bold text-[#6146cb]'>Welcome to Our Store</h1>
        <p className='max-sm:text-center text-start  max-sm:text-[1.1em] lg:text-[1.6em] text-[1.5em] leading-[4vh] lg:leading-[6vh] max-sm:leading-[3.5vh]'>Time to Find Best Products Time to Find Best Products Time to Find Best</p>

      </section>
      <section className='flex max-sm:justify-center  max-sm:items-center lg:justify-end'>
        <img src={bag} className='max-sm:h-[25rem]  lg:h-[25rem] lg:w-[24rem] max-sm:w-[80rem] h-[25rem] w-[24rem]'></img>
        
      </section>
      
    </section>

    </main>
    
  )
}

export default Hero

