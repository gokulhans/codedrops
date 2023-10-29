import React from "react";
import DropBlocksList from "../../components/Dropblock/DropBlockList";
import axiosClient from "../../axios";
import { useQuery } from "@tanstack/react-query";
import ShimmerSearch from "../../components/Shimmer/ShimmerSearch";
import ShimmerDropBlock from "../../components/Shimmer/ShimmerDropBlock";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { id, user } = useParams()
    const fetchUserDrops = async () => {
        // const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
        // const headers = {
        //     Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        // };
        // const response = await axiosClient.get(`/drop/user/${id}`, { headers });
        const response = await axiosClient.get(`/drop/user/${id}`);
        return response.data; // Assuming your API response contains an array of drops
    };

    const { data: drops, isLoading, isError, error } = useQuery({
        queryKey: ['userdrops'],
        queryFn: fetchUserDrops,
    });

    if (isLoading) {
        return <>
            <div className="w-full max-w-3xl sm:pt-8 p-4 pt-6 sm:px-0">
                <ShimmerSearch />
                <ShimmerDropBlock />
                <ShimmerDropBlock />
                <ShimmerDropBlock />
                <ShimmerDropBlock />
            </div>
        </>
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex align-center justify-self-center w-full">
            <DropBlocksList dropBlocks={drops} title={`Drops By ${user}`} />
        </div>
    );
};

export default Profile;