


const Login:React.FC = ()=>{
    

    function register(){
        
    }

    return(
        <div className="bg-[#424448] h-screen flex items-center">
            <form className="w-100 p-20 mx-auto bg-[#212121]" onSubmit={register}>
                <div className="text-[#ffff] text-center text-3xl mb-5"> Sign in</div>
                <input type="text" placeholder="Username,Phone or Email"className="block w-full bg-[#4F4F4F] text-[#ffff] h-12  rounded-lg mb-2 p-2" />
                <input type="password"placeholder="Password" className="w-64 bg-[#4F4F4F] text-[#ffff h-12 rounded-lg mb-2 p-2"/>
                <button className="bg-[#FFFFFF] block w-full h-12 rounded-lg mb-3">Login in</button>
                <div className="text-[#ffff] text-center" >
                    or Sign up
                </div>
            </form>
        </div>
    )
}
export default Login;