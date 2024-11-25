import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Login")
    const [error, setError] = useState("");
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Clear previous errors
        let newUrl = url;
        if (currState==="Login") {
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
        // Add your form submission logic here
        // For example: authentication API calls
        
        // Temporary success action
        setShowLogin(false);
    }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
       <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:
            <input
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                type="text" 
                placeholder='Your name' 
                required 
                aria-label="Your name"
                minLength="2"
            />}
            <input 
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                type="email" 
                placeholder='Your email' 
                required 
                aria-label="Your email"
            />    
            <input 
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                type="password" 
                placeholder='Password' 
                required 
                aria-label="Password"
                minLength="6"
            />    
        </div> 
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input 
                type="checkbox" 
                required 
                id="terms-checkbox"
                aria-label="Accept terms and conditions"
            />
            <label htmlFor="terms-checkbox">
                By continuing, I agree to the terms of use & Privacy policy.
            </label>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
        
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default LoginPopup
