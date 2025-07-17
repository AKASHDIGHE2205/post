import { useSearchParams } from "react-router-dom";
import Logo from "../../assets/malpani-logo.webp"


import{useEffect} from "react"
import axios from "axios";
import { toast } from "sonner";
const Home = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');  
  


  
  useEffect(() => {   
    
  const getData = async()=>{
    if (email) {
      let body = {
        email_id:email
      }
     try {
      const response = await axios.post("http://192.168.179.23:5004/getData",body);
      console.log(response.data.isAuthenticated);
      
        toast.success(response.data.message);
        localStorage.setItem("MasterData",JSON.stringify(response.data));
        localStorage.setItem("Auth",response.data.isAuthenticated)

     } catch (error:any) {
      toast.error(error.response.data.message)
      
     }
    }
  } 
    getData();
    // if (lastName) {
    //   localStorage.setItem('lastName', lastName);
    // }
  }, [email]);

  return (
   <>
      {/* <div className="hero min-h-screen bg-base-200"> */}
      <div className="hero min-h-[90vh] bg-base-200 mb-5">
        <div className="hero-content flex-col lg:flex-row gap-5">
          <img src={Logo} className="h-48 w-32 rounded-lg shadow-2xl" />
          {/* <Image src="/malpani-logo.webp" alt="logo" width={500} height={500} className="h-48 w-32 rounded-lg shadow-2xl" /> */}
          <div>
            <h1 className="text-5xl font-bold">About Us!</h1>
            <p className="py-2">
              Malpani Group is well diversified business house active in Renewable energy, FMCG products, Amusement and Water Park, Real estate, Hotels etc.  Malpani Group’s success story is no ordinary one. Our unceasing commitment to the satisfaction of our customers as well as the society by way of sharing the rewards with all has been and always will be the secret to our phenomenal growth.
            </p>
            <p className="py-2">
              Our activities have given the small town of Sangamner as well as its surrounding areas a new modern face. Along with developing the infrastructure of Sangamner, we have managed to create social awareness, encourage education as well as inspire the people to dream big and aspire more without disturbing the rural roots. Malpani Group is glad to have played an active role in the transformation of Sangamner and in putting it on the industrial map of the world.
            </p>
            <p className="py-2">
              We are committed to drawing upon the wisdom of past generations while utilising the innovation and enthusiasm of present generation in scaling greater heights than ever before.
            </p>
            <br />
            <button className="btn btn-primary">Get Started</button>
            <div className="w-full h-7"></div>
          </div>
        </div>
        
      </div>
</>
  )
}

export default Home;
