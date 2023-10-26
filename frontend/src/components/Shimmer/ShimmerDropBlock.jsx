import React from "react";

const ShimmerCodeBlock = () => {
    return (
        <>
            <div className="bg-white rounded-lg p-8 dark:bg-gray-800 shadow-md mb-4 border-gray-200  overflow-hidden">
                <div className="h-full">
                    <div className="p-2">
                        <h2 className="bg-gray-200 dark:bg-gray-700 animate-pulse h-6 w-1/4 mb-2" />
                        {/* <h1 className="w-1/2 mb-4 h-6 animate-pulse bg-gray-200" /> */}
                        <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-200 dark:bg-gray-600 " />
                        <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-200 dark:bg-gray-500 " />
                        <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-200 dark:bg-gray-600 " />
                        <div className="flex items-center flex-wrap ">
                            <a className="bg-indigo-200 dark:bg-gray-700  h-4 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></a>
                            <span className="bg-indigo-200 dark:bg-gray-700  w-16 mt-2 h-4 animate-pulse mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShimmerCodeBlock;