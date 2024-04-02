import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    const [regierror, setRegierror] = useState('');
    const [succes, setsucces] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const handleRegister = e => {
        e.preventDefault()
        const name =e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted =e.target.terms.checked;
        console.log(name ,email, password,accepted )
        if (password.length < 6) {
            setRegierror('you should be 6 character of password ');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegierror('your password should have one cappital latter');
            return;
        }
        else if(!accepted){
            setRegierror("please Accepts our terms and conditions")
            return;
        }
        // resrt error
        setRegierror('')
        setsucces('')
        // creat user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setsucces('user creat suuccessfully')

                // update profile
                updateProfile(result.user,{
                    displayName: name
                    ,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() =>console.log('profile updated'))
                .catch
               

                // send verification
                sendEmailVerification(result.user)
                .then(() =>{
                    alert('please check your email and verify your account')
                })
            })
            .catch(error => {
                console.error(error);
                setRegierror(error.message)

            })
            
    }

    return (
        <div className="">
            <div className="mx-auto w-1/2 ">
                <h2 className="text-3xl">please register</h2>
                <form onSubmit={handleRegister}>
                    <input className="my-4 p-2 w-1/2 border border-gray-500 rounded-md" placeholder="your name" type="text" name="name" id="" required />
                    <br />

                    <input className="my-4 p-2 w-1/2 border border-gray-500 rounded-md" placeholder="E mail" type="email" name="email" id="" required />
                    <br />


                    <div className="relative w-1/2">
                        <input className="mb-4 p-2 w-full  border border-gray-500 rounded-md"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id=""
                            required /> <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }
                        </span>
                    </div>

                    <br />

                    <div className="my-3">
                        <input type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms"> Accept our <a href="">terms and conditions</a></label>

                    </div>
                    <br />
                    <input className="btn btn-secondary w-1/2 " type="submit" value="Register" />


                </form>
                {
                    regierror && <p className="text-red-400">{regierror}</p>
                }
                {
                    succes && <p className="text-green-400">{succes}</p>
                }
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;