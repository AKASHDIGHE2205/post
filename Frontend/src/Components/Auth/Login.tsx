import { useState, FormEvent } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { StoreUserData } from "../../Features/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [changePass, setPasschange] = useState(true);
    const changeIcon = changePass === true ? false : true;
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
   
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(user);

        let body= {
            email: user.email,
            password: user.password, 


        }
        try {
            const response = await axios.post("http://192.168.182.26:5003/log-in",body);
            if (response.status ===200) {
                toast.success(response.data.message);
                
            }            
            dispatch(StoreUserData({ data: response.data }));
            navigate("/");
        } catch (error: any) {
         toast.error(error.response.data.message);            
        }
    }
    const handleInput = (e: FormEvent) => {
        const { name, value }: any = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
  return (
    <div className="hero mt-5" >
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-[60rem] max-w-sm shadow-2xl">
                    <div className="flex justify-center mt-5"> <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-36 rounded-full">
                        <IoPersonCircleOutline  size={47} className="w-full bg-primary text-white" />
                        </div>
                    </div></div>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email<span className="text-error ml-1">*</span></span>
                            </label>
                            <input onChange={handleInput} name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password<span className="text-error ml-1">*</span></span>
                            </label>    
                            <input onChange={handleInput} name="password" type={changeIcon ? "text ":"password"} placeholder="password" className="input input-bordered" required />
                            <span className='absolute right-2 mr-8 top-[57%] py-1' onClick={() => setPasschange(changeIcon)}  > {changeIcon ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}</span>
                            <div className="flex justify-around">
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <label className="label flex justify-end">
                                <Link to="/register" className="label-text-alt link link-hover">Don't have an account?</Link>
                            </label>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Login;
