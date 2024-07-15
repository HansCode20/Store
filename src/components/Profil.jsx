import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Image Assets
import Avatar from '../assets/Images/DefaultAvatar.jpg';

// Notifacitions Sonner
import { toast } from 'sonner';

// Redux Logout
import { logout } from '../Auth/UseAuth';

// React Icons
import { FaRegTrashCan } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu"; 
import { IoMdLogOut } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";


// Firebase Database
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from '../Auth/Firebase';
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newRole, setNewRole] = useState(''); 
    const [uploading, setUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const storedUsername = localStorage.getItem('username');
            const storedProfileImage = localStorage.getItem('profileImage');

            if (storedUser && storedUsername) {
                setUser({ ...storedUser, username: storedUsername });
                setProfileImage(storedProfileImage || Avatar);
            }
        };
        fetchUser();
    }, []);

    // Jika user tidak mengupload Profile Image, maka yang ditampilkan Avatar
    useEffect(() => {
        if (profileImage === undefined) {
            setProfileImage(Avatar);
        }
    }, []);

    // Jika sudah mengupload Maka Tampilanya berubah
    useEffect(() => {
        if (uploadedImage) {
            setUploadedImage(profileImage);
        }
    }, [uploadedImage, profileImage]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleUploadImage = () => {
        if (!profileImage || profileImage === Avatar) return;

        const storageRef = ref(storage, `profileImages/${user.uid}/${profileImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, profileImage);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setUploading(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'users', user.uid), { profileImageUrl: downloadURL });
                    setUploadedImage(downloadURL);
                    localStorage.setItem('profileImage', downloadURL);
                    setProfileImage(downloadURL);
                    setUploading(false);
                    toast.success('Profile image updated successfully');

                    // Emit custom event after updating profile image
                    window.dispatchEvent(new CustomEvent('profileUpdated'));
                });
            }
        );
    };

    const handleDeleteImage = async () => {
        try {
            const profileImageUrl = localStorage.getItem('profileImage');
            if (profileImageUrl && profileImageUrl !== Avatar) {
                const imageRef = ref(storage, profileImageUrl);
                await deleteObject(imageRef);
            }
            
            localStorage.removeItem('profileImage');
            setUploadedImage(null);
            setProfileImage(Avatar);

            await updateDoc(doc(db, 'users', user.uid), { profileImageUrl: '' });

            toast.success('Profile image deleted successfully');
            window.dispatchEvent(new CustomEvent('profileUpdated'));
        } catch (error) {
            console.error('Error deleting image: ', error);
            toast.error('Failed to delete profile image');
        }
    };


    const handleUpdateProfile = async () => {
        try {
            if (newUsername || newRole) {
                const timestamp = serverTimestamp();

                await updateDoc(doc(db, 'users', user.uid), { 
                    username: newUsername,
                    role: newRole,
                    updatedAt: timestamp,
                });

                if (newUsername) {
                localStorage.setItem('username', newUsername);
                setUser((prevUser) => ({ ...prevUser, username: newUsername }));
                console.log("Updated username in LocalStorage:", newUsername);
                toast.success('Username updated successfully');
                }
                
                if (newRole) {
                localStorage.setItem('role', newRole);
                setUser((prevUser) => ({ ...prevUser, role: newRole }));
                console.log("Updated role in LocalStorage:", newRole);
                toast.success('Role updated successfully');
                }

                // Emit custom event after updating username
                window.dispatchEvent(new CustomEvent('profileUpdated'));
            } else {
                toast.error('Please enter a new username or role');
            }
        } catch (error) {
            console.error('Firebase Error:', error);

            if (error.code === 'auth/operation-not-allowed') {
                toast.error('Please verify the new email address before updating.');
            } else {
                toast.error('Failed to update profile');
            }
        }
    };

    const handleLogout = async () => {
        const auth = getAuth();
        await auth.signOut();
        logout();
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out successfully');
        dispatchEvent(new Event('userLogout'));
    };

    if (!user) {
        return (
            <Link to="/login ">
                <button className='flex gap-4 justify-center items-center mt-[200px] lg:mt-[350px] md:mt-[200px] mx-auto bg-black hover:bg-gray-400 text-white font-bold py-3 px-5 rounded text-sm lg:text-2xl'>
                    <IoLogIn className='text-3xl'/>
                    <span>Login</span>
                </button>
            </Link>
        );
    }

   

    return (
        <div className='flex justify-center items-center h-screen mt-[55px] lg:mt-10 md:mt-10 bg-gray-800'>
            <div className='space-y-5'>
                <h1 className='text-center text-3xl font-bold text-white'>Profile</h1>
                <img src={profileImage} alt="avatar profile" className='w-40 h-40 rounded-full mx-auto object-cover' />
                <p className='text-center text-white font-bold'>{user.username}</p>
                <p className='text-center text-white font-bold'>{user.email}</p>

                    {/* Edit Profile Modal */}
                    <div className='flex justify-center items-center gap-5 bg-white shadow-md rounded-full w-full p-5'>
                        <LuPenLine className="text-2xl font-bold"/>
                        <button className="btn text-xl font-bold " onClick={() => document.getElementById('my_modal_3').showModal()}>
                            Edit Profile
                        </button>
                    </div>
            
                <button className="btn  w-full rounded-full p-5 bg-red-500 hover:bg-red-700 text-white font-bold mt-4" onClick={handleLogout}>
                    <div className='flex justify-center items-center mx-auto gap-5'>
                    <IoMdLogOut className='text-2xl font-bold   '/>
                    <span className=' text-xl'>Logout</span>
                    </div>
                </button>

                <dialog id="my_modal_3" className="modal rounded-lg bg-black]">
                    <div className="modal-box p-20 mt-20 lg:mt-0 md:mt-0">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className='flex flex-col  lg:flex-row md:flex-row justify-between '>
                            <div className=' mt-5 '>
                            <input type="file" onChange={handleImageChange} className='  '/>
                            </div>
                            <div className='flex items-center mt-4 '>
                                <button onClick={handleUploadImage} className=' p-2 mr-4 bg-blue-500 text-white rounded'>
                                    {uploading ? 'Uploading...' : <FiUpload className='text-xl  '/>}
                                </button>
                                <button onClick={handleDeleteImage} className=' p-2 bg-red-500 text-white rounded'>
                                    <FaRegTrashCan className='text-xl '/>
                                </button>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <input
                                type="text"
                                placeholder="New Username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded mt-2'
                            />

                            <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded mt-2'
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <button onClick={handleUpdateProfile} className='mt-4 p-2 bg-white text-black rounded w-full'>
                                Update Profile
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Profile;
