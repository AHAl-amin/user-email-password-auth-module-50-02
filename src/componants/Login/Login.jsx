import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [regierror, setRegierror] = useState('');
    const [succes, setsucces] = useState('');
    const emailRef =useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        // ?add validation

        setRegierror('')
        setsucces('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if(result.user.emailVerified){
                    setsucces('user logged in Successfully')
                }
                else{
                    alert('Please verify your email and address')
                }
                setsucces('user logged in suuccessfully')
                // send verification email
                sendEmailVerification(result.user)
                .then(() =>{
                    alert('please check your email and verification account')
                })
            })
            .catch(error => {
                console.error(error);
                setRegierror(error.message)
            }
            )
 
    }
    const handleForgetPassword = () =>{
        console.log('set reset email')
        const email =emailRef.current.value;
        if(!email){
         
            console.log('please provide and email',emailRef.current.value);
            return;
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            console.log('please write a valid email')
            return;
        }
        // send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('please check your email')
        })
        .catch(error =>{
            console.error(error)
        })

    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email"
                            ref={emailRef}
                             className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password"
                                name="password" className="input input-bordered" required />
                            <label className="label">
                                <button onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</button>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        regierror && <p className="text-red-400">{regierror}</p>
                    }
                    {
                        succes && <p className="text-green-400">{succes}</p>
                    }
                    <p>New to this website?please <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;