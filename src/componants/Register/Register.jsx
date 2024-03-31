import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useState } from "react";


const Register = () => {
const [regierror ,setRegierror] =useState('');
const [succes ,setsucces] = useState('')
const handleRegister = e =>{
    e.preventDefault()
    const email =e.target.email.value;
    const password =e.target.password.value;
    console.log(email, password)
    if(password.length < 6){
        setRegierror('you should be 6 character of password ');
        return;
    }
    // resrt error
    setRegierror('')
    setsucces('')
    // creat user
    createUserWithEmailAndPassword(auth,email,password)
    .then(result =>{
        console.log(result.user);
        setsucces('user creat suuccessfully')
    })
    .catch(error =>{
        console.error(error);
       setRegierror(error.message)

    })
}

    return (
        <div className="">
           <div className="mx-auto w-1/2 text-center">
           <h2 className="text-3xl">please register</h2>
            <form onSubmit={handleRegister}>
                <input className="my-4 p-2 w-1/2 border border-gray-500 rounded-md"placeholder="E mail" type="email" name="email" id="" required/>
                <br />
                <input className="mb-4 p-2 w-1/2 border border-gray-500 rounded-md"placeholder="Password" type="password" name="password" id=""required />
                <br />
                <input className="btn btn-secondary w-1/2 " type="submit" value="Register" />
            </form>
            {
                regierror && <p className="text-red-400">{regierror}</p>
            }
            {
                succes && <p className="text-green-400">{succes}</p>
            }
           </div>
        </div>
    );
};

export default Register;