import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShimmerDropBlock from "./../../../components/Shimmer/ShimmerDropBlock";
import { useQuery } from '@tanstack/react-query'
import axiosClient from "../../../axios";
import DropBlock from "../../../components/DropBlock/DropBlock";


const ViewDrop = () => {

    const { id } = useParams();

    const fetchDrop = async () => {
        // const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
        // const headers = {
        //     Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        // };
        // const response = await axiosClient.get(`/drop/${id}`, { headers });
        const response = await axiosClient.get(`/drop/${id}`);
        return response.data.data; // Assuming your API response contains an array of drops
    };

    const { data: drop, isLoading, isError, error } = useQuery({
        queryKey: ['viewdrop'],
        queryFn: fetchDrop,
    });

    if (isLoading) {
        return <>
            <div className="w-full max-w-3xl sm:pt-8 p-4 pt-6 sm:px-0">
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
        <>
            <div className="min-h-screen flex align-center justify-self-center w-full max-w-6xl">
                <div className="mx-auto my-auto pt-12">
                    <DropBlock
                        dropname={drop.dropname}
                        dropbody={drop.dropbody}
                        tags={drop.tags}
                        userid={drop.user._id}
                        username={drop.user.name}
                        dropid={drop._id}
                        hideview={true}
                        expand={true}
                    />

                </div>
            </div>
        </>
    );
};

export default ViewDrop;