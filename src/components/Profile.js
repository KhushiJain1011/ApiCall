import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError('');

            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('https://start-your-tour-api.onrender.com/user/userprofile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });
                console.log("token: ", token);

                if (!response.ok) {
                    throw new Error('Failed to fetch profile information');
                }

                const data = await response.json();
                setProfileData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    if (!profileData) {
        return null;
    }

    const userDetails = profileData.data[0].user_details[0];

    return (
        <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

            <div className="flex items-center">
                <div className="mr-6">
                    <img
                        className="w-24 h-24 rounded-full object-cover"
                        src={userDetails.photo}
                        alt={userDetails.name}
                    />
                </div>

                <div className='grid grid-cols-2'>
                    <div className="mb-4 gap-2  flex  items-center" >
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <p className=" text-gray-700">{userDetails.name}</p>
                    </div>
                    <div className="mb-4 gap-2  flex  items-center">
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <p className="text-gray-700">{userDetails.email_address}</p>
                    </div>
                    <div className="mb-4 gap-2  flex  items-center">
                        <label className="block text-sm font-medium text-gray-700">Phone:</label>
                        <p className="text-gray-700">{profileData.data[0].phone}</p>
                    </div>
                    <div className="mb-4 gap-2  flex  items-center">
                        <label className="block text-sm font-medium text-gray-700">Gender:</label>
                        <p className=" text-gray-700">{userDetails.gender}</p>
                    </div>
                    <div className="mb-4 gap-2  flex  items-center">
                        <label className="block text-sm font-medium text-gray-700">State:</label>
                        <p className=" text-gray-700">{userDetails.state}</p>
                    </div>
                    <div className="mb-4  gap-2 flex  items-center">
                        <label className="block text-sm font-medium text-gray-700">City:</label>
                        <p className=" text-gray-700">{userDetails.city}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
