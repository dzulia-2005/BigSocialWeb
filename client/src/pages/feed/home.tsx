import React from 'react'
import { Posts} from  '../../data-dummy'
import Post from './components/post/post'
import Share from './components/share/share'



const Home:React.FC = () => {
  return (
  <>               
           {/* add post cont */}
               <Share/>

           {/* post  */}
              {Posts.map((p)=>(
                 <Post post = {p}/>
              ))}
     </>
  )
}

export default Home


