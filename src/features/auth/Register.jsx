

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";


const SignUp = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [validaction, setValidaction] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup();
    };


    const handleSignup = async () => {
        try {
            // 1. create user in firebase auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // 2. get user
            const user = userCredential.user;

            // 3. save extra data in firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: "owner",          // 🔥 ADD THIS
                organizationId: user.uid, // optional but recommended
                createdAt: new Date(),
            });


            // 4. success message
            toast.success("Account created successfully");

            // 5. clear form
            setFirstName("");
            setLastName("");
            setEmailId("");
            setPassword("");
            navigate("/task")


        } catch (error) {
            console.log(error.message);
            setValidaction(error.message);
        }
    };


    return (
        <>

            <div className='grid grid-cols-1'>
                <form className=" sm:p-8 p-6 w-full" onSubmit={handleSubmit}>
                    <div className="md: mb-8">
                        <h1 className="text-slate-900 text-3xl font-semibold">Register</h1>
                    </div>

                    <div className="grid lg:grid-cols-1 gap-8">
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">First Name</label>
                            <input name="name" type="text" className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-2.5 rounded-md border border-gray-200 focus:bg-transparent focus:border-black outline-none transition-all" placeholder="Enter name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Last Name</label>
                            <input name="lname" type="text" className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-2.5 rounded-md border border-gray-200 focus:bg-transparent focus:border-black outline-none transition-all" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Email Id</label>
                            <input name="email" type="text" className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-2.5 rounded-md border border-gray-200 focus:bg-transparent focus:border-black outline-none transition-all" placeholder="Enter email" value={email} onChange={(e) => setEmailId(e.target.value)} />
                        </div>

                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
                            <input name="password" type="password" className="bg-slate-100 w-full text-slate-800 text-sm px-4 py-2.5 rounded-md border border-gray-200 focus:bg-transparent focus:border-black outline-none transition-all" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {validaction && <p className="text-red-600 mt-2 text-sm">{validaction}</p>}


                    </div>
                    <div className="mt-8">
                        <button type="submit" className="py-2.5 px-6 text-sm tracking-wide rounded-md text-white font-medium bg-slate-800 hover:bg-slate-900 focus:outline-none transition-all cursor-pointer">
                            Sign up
                        </button>
                        <div>
                            <p className="text-slate-600 text-sm mt-6 text-center">Already have an account?  <Link
                                to="/login"
                                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                            >
                                Login here
                            </Link></p>

                        </div>
                    </div>
                </form>
            </div>

        </>
    )

};
export default SignUp