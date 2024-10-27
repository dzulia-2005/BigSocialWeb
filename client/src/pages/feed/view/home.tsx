import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/post/post';
import Share from '../components/share/share';


interface PostData {
   _id: number;
   desc: string;
   img: string;
   date: string;
   like: number;
   comment: number;
   userId: number;
   profilepicture:string;
   username:string;
}
const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/post/timeline/67192d061187af3fd7c2218a');
        console.log(res);
        setPosts(res.data); 
      } catch (err) {
        setError("Failed to fetch posts"); 
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Share/>
      {posts.map((post) => (
      <Post key={post._id} post={post} />
      ))}
    </>
  );
};

export default Home;
