import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login_status, setLogin_status] = useState(""); 


    const handleEmail=(event)=>{
        setEmail(event.target.value);
    } 

    const handlePassword=(event)=>{
        setPassword(event.target.value);           
    }

    const login = () => {
        axios.get("http://www.mocky.io/v2/5d9d9219310000153650e30b").then(response => {
            console.log(response);
          setLogin_status(response.result);
        })

        setTimeout(()=> {
            setLogin_status("");
        }, 3000);
    }

    let password_errors = [];
    let email_errors = [];
    let disable = true;

    if(password == ""){
        password_errors.push("This is a required field");
    }
    if(password !== "" && password.length < 6){
        password_errors.push("Minimum 6 characters required");
    }
    if(password !== "" && !(password.match(/[A-Z]/))){
        password_errors.push("Password should contain 1 uppercase letter");
    }
    if(email == ""){
        email_errors.push("This is a required field");
    }
    if(email !== "" && email.length < 6){
        email_errors.push("Email should be more than 6 characters long");
    }
    if(email !== "" && !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email))){
        email_errors.push("Email should be valid");
    }
    if(email_errors.length == 0 && password_errors.length == 0){
        disable = false;
    }



    const style={
        boxShadow:"2px 2px 3px 3px #ccc",
        border:"2px #eee",
        padding:"20px",
        marginTop:"80px"
    }
            
    // let email_errors = (
    //     <div>
    //         {email == "" ? 
    //         <p style={{color:"red"}}>This is a required field</p> 
    //         : null}
    //         {(email !== "" && email.length < 6) ? 
    //         <p style={{color:"red"}}>Email should be more than 6 characters long</p> 
    //         : null}
    //         {(email!== "" && !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email))) 
    //         ? <p style={{color:"red"}}>Email should be valid</p> : null}
    //     </div>
    // )

    // password_errors = (
    //     <div>
            // {password == "" ? 
            // <p style={{color:"red"}}>This is a required field</p> 
            // : null}
            // {(password !== "" && password.length < 6) ? 
            //   <p style={{color:"red"}}>Minimum 6 characters required</p> 
            // : null}
            // {password !== "" && !(password.match(/[A-Z]/)) ? 
            //   <p style={{color:"red"}}>Password should contain 1 uppercase letter</p> 
            // : null}
    //     </div>
    // )

    
    return(
        
        <div className="container"> 
        <div className="row">
        <div className="col-md-4"></div>


        <div className="col-md-4">

        <div style={style}>

        <div align="center"> 
        <img src="https://s3.ap-south-1.amazonaws.com/tpng-images/random/original/6be52f0b-56bf-4fdc-abd3-0bec9e58610c.png" width="200" height="50"></img>
        <br/>
        <p>{login_status}</p>
        <h4>Sign in</h4>
        <h6>Use your Healthifyme Account</h6><br/>
        </div>

        <form> 
            <div class="form-group">
            <input type="text" class="form-control" value={email} 
             onChange={handleEmail} placeholder="Enter Your Email"/>
            </div>

            {email_errors.length > 0 ? 
              email_errors.map(error => <p style={{color:"#e60000"}}>{error}</p>)
            : null
            }

            <div class="form-group">
            <input type="text" class="form-control" value={password} 
              onChange={handlePassword} placeholder="Enter Your Password"/>
            </div>

            {password_errors.length > 0 ? 
              password_errors.map(error => <p style={{color:"#e60000"}}>{error}</p>)
            : null
            }

            <div className="form-group">
                <button type="submit" className="btn btn-success btn-block" 
                disabled={disable} onClick={login}>Login</button>
            </div> 
        </form>

        </div>
        </div>
               
        <div className="col-md-4"></div>
        </div>
        </div>
    );
}

export default App;