import React from 'react'
import Header from '../../components/header/header'
import Leftcomponent from '../../components/leftsidecomponent/leftcomponent'
import Rightcomponent from '../../components/rightsidecomponent/rightcomponent'
import Container from '../../components/container/container'

const Home:React.FC = () => {
  return (
   <Container >
      <Header/>
      <section className='w-[100%]'>
            <div className=' w-full h-full pt-[9%] pl-[3%] pr-[3%] flex'>
                  <Leftcomponent/>
                  <div className='w-[50%] h-full mt-[20px] mb-[20px]'>

                        {/* add post cont */}
                        <div className='flex justify-center w-[100%] h-auto'>
                           <div className='bg-[#4F4F4F] w-[90%] h-auto rounded-[10px] p-[3%]'>
                                <div className='flex justify-center gap-[7%] mb-[2%]'>
                                  <div className='w-[40px] h-[40px] bg-[#D9D9D9] rounded-full'></div>
                                  <input placeholder='Create new post' type="text" className='bg-[#212121] rounded-xl p-[0_17px] w-[64%]' />
                                  <div>
                                    <svg width="35" height="35" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.375 7.03125C40.1484 7.03125 40.7812 7.66406 40.7812 8.4375V36.5449L40.3418 35.9736L28.3887 20.5049C27.9932 19.9863 27.3691 19.6875 26.7188 19.6875C26.0684 19.6875 25.4531 19.9863 25.0488 20.5049L17.7539 29.9443L15.0732 26.1914C14.6777 25.6377 14.0449 25.3125 13.3594 25.3125C12.6738 25.3125 12.041 25.6377 11.6455 26.2002L4.61426 36.0439L4.21875 36.5889V36.5625V8.4375C4.21875 7.66406 4.85156 7.03125 5.625 7.03125H39.375ZM5.625 2.8125C2.52246 2.8125 0 5.33496 0 8.4375V36.5625C0 39.665 2.52246 42.1875 5.625 42.1875H39.375C42.4775 42.1875 45 39.665 45 36.5625V8.4375C45 5.33496 42.4775 2.8125 39.375 2.8125H5.625ZM12.6562 19.6875C13.2103 19.6875 13.7589 19.5784 14.2707 19.3664C14.7825 19.1544 15.2476 18.8436 15.6394 18.4519C16.0311 18.0601 16.3419 17.595 16.5539 17.0832C16.7659 16.5714 16.875 16.0228 16.875 15.4688C16.875 14.9147 16.7659 14.3661 16.5539 13.8543C16.3419 13.3425 16.0311 12.8774 15.6394 12.4856C15.2476 12.0939 14.7825 11.7831 14.2707 11.5711C13.7589 11.3591 13.2103 11.25 12.6562 11.25C12.1022 11.25 11.5536 11.3591 11.0418 11.5711C10.53 11.7831 10.0649 12.0939 9.67314 12.4856C9.2814 12.8774 8.97064 13.3425 8.75863 13.8543C8.54662 14.3661 8.4375 14.9147 8.4375 15.4688C8.4375 16.0228 8.54662 16.5714 8.75863 17.0832C8.97064 17.595 9.2814 18.0601 9.67314 18.4519C10.0649 18.8436 10.53 19.1544 11.0418 19.3664C11.5536 19.5784 12.1022 19.6875 12.6562 19.6875Z" fill="white"/></svg>
                                  </div>
                                </div>
                                <div className='flex ml-[3%]'>
                                  <button className = "text-[13px] w-[35%] h-[31px] bg-white rounded-xl">Add new post</button>
                                </div>
                           </div>
                        </div>

                        {/* post  */}
                        <div className='flex justify-center w-[100%] h-auto mt-[20px] mb-[20px]'>
                           <div className='bg-[#4F4F4F] w-[90%] h-auto rounded-[10px] p-[3%] pl-[6%]  '>
                               <div className='flex items-center gap-[2%]'>
                                  <div className='w-[40px] h-[40px] bg-[#D9D9D9] rounded-full '></div>
                                  <div className='text-[#fff]'>user 1</div>
                               </div>
                               <div>
                                  <div className='text-[#ffff]'>Lorem ipsum dolor sit amet, consectetur adt.</div>
                                  <img className='w-[85%]' src="../../../public/img.png" />
                               </div>
                               <div className='flex items-center m-0 mr-[15%] justify-between mt-[3%] '>
                                  <div className='flex items-center gap-[1%] w-[92px]'>
                                    <div><svg width="15" height="15" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.69609 18.775L12.9311 29.3188C13.3559 29.7563 13.9166 30 14.5 30C15.0834 30 15.6441 29.7563 16.0689 29.3188L26.3039 18.775C28.0258 17.0063 29 14.525 29 11.9312V11.5688C29 7.2 26.1396 3.475 22.2371 2.75625C19.6543 2.28125 17.0262 3.2125 15.1797 5.25L14.5 6L13.8203 5.25C11.9738 3.2125 9.3457 2.28125 6.76289 2.75625C2.86035 3.475 0 7.2 0 11.5688V11.9312C0 14.525 0.974219 17.0063 2.69609 18.775Z" fill="white"/></svg></div>
                                    <div className='text-[#ffff]'>13 likes</div>
                                  </div>
                                  <div className='flex items-center gap-[1%] '>
                                    <div><svg width="15" height="15" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.0017 13C29.0017 20.1813 22.5107 26 14.5017 26C12.4003 26 10.4066 25.6 8.60539 24.8813C7.93137 25.425 6.83254 26.1688 5.5298 26.7938C4.17043 27.4438 2.53352 28 0.90793 28C0.539766 28 0.21125 27.7563 0.0696484 27.3813C-0.0719531 27.0063 0.00734374 26.5813 0.262227 26.2938L0.279219 26.275C0.296211 26.2562 0.318867 26.2312 0.352852 26.1875C0.415156 26.1125 0.511445 25.9937 0.630391 25.8312C0.862617 25.5187 1.17414 25.0563 1.49133 24.4813C2.05773 23.4438 2.59582 22.0812 2.70344 20.55C1.00422 18.425 0.00167969 15.8187 0.00167969 13C0.00167969 5.81875 6.4927 0 14.5017 0C22.5107 0 29.0017 5.81875 29.0017 13Z" fill="white"/></svg></div>
                                    <div className='text-[#ffff]'>comments</div>
                                  </div>
                               </div>
                           </div>
                        </div>
                          {/* post only write without img */}
                        <div className='flex justify-center w-[100%] h-auto '>
                           <div className='bg-[#4F4F4F] w-[90%] h-auto rounded-[10px] p-[3%] mb-[20px]'>
                               <div className='flex items-center gap-[2%]'>
                                  <div className='w-[40px] h-[40px] bg-[#D9D9D9] rounded-full '></div>
                                  <div className='text-[#fff]'>user 1</div>
                               </div>
                               <div>
                                  <div className='mb-[2px] text-[#ffff]'>hello world</div>
                               </div>
                               <div className='flex items-center m-0 mr-[15%] justify-between mt-[3%] '>
                                  <div className='flex items-center gap-[1%] w-[92px]'>
                                    <div><svg width="15" height="15" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.69609 18.775L12.9311 29.3188C13.3559 29.7563 13.9166 30 14.5 30C15.0834 30 15.6441 29.7563 16.0689 29.3188L26.3039 18.775C28.0258 17.0063 29 14.525 29 11.9312V11.5688C29 7.2 26.1396 3.475 22.2371 2.75625C19.6543 2.28125 17.0262 3.2125 15.1797 5.25L14.5 6L13.8203 5.25C11.9738 3.2125 9.3457 2.28125 6.76289 2.75625C2.86035 3.475 0 7.2 0 11.5688V11.9312C0 14.525 0.974219 17.0063 2.69609 18.775Z" fill="white"/></svg></div>
                                    <div className='text-[#ffff]'>300 likes</div>
                                  </div>
                                  <div className='flex items-center gap-[1%] '>
                                    <div><svg width="15" height="15" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.0017 13C29.0017 20.1813 22.5107 26 14.5017 26C12.4003 26 10.4066 25.6 8.60539 24.8813C7.93137 25.425 6.83254 26.1688 5.5298 26.7938C4.17043 27.4438 2.53352 28 0.90793 28C0.539766 28 0.21125 27.7563 0.0696484 27.3813C-0.0719531 27.0063 0.00734374 26.5813 0.262227 26.2938L0.279219 26.275C0.296211 26.2562 0.318867 26.2312 0.352852 26.1875C0.415156 26.1125 0.511445 25.9937 0.630391 25.8312C0.862617 25.5187 1.17414 25.0563 1.49133 24.4813C2.05773 23.4438 2.59582 22.0812 2.70344 20.55C1.00422 18.425 0.00167969 15.8187 0.00167969 13C0.00167969 5.81875 6.4927 0 14.5017 0C22.5107 0 29.0017 5.81875 29.0017 13Z" fill="white"/></svg></div>
                                    <div className='text-[#ffff]'>comments</div>
                                  </div>
                               </div>
                           </div>
                        </div>
                  </div>
                  <Rightcomponent/>
            </div>
     </section>
    </Container>
  )
}

export default Home


