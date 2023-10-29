import React from 'react'

const Waitlist = ({ isAuth }) => {
    return (
        <>
            {/* ========== MAIN CONTENT ========== */}
            <main
                id="content"
                role="main"
                className="relative max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto w-full h-full before:absolute before:top-0 before:left-1/2 before:bg-[url('../svg/component/squared-bg-element-dark.svg')] before:bg-no-repeat before:bg-top before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2"
            >
                <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl dark:text-white sm:text-4xl">
                        Get notified when we launch
                    </h1>
                    <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
                        <span className="bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-400 text-transparent">
                            Preline PRO
                        </span>
                    </h2>
                    <form>
                        <div className="mt-8 space-y-4">
                            <div>
                                <label
                                    htmlFor="hs-cover-with-gradient-form-name-1"
                                    className="sr-only"
                                >
                                    Full name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="hs-cover-with-gradient-form-name-1"
                                        className="shadow-xl border py-3 px-4 block w-full border-gray-200 shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                        defaultValue={localStorage.getItem("username")}
                                        placeholder="Full name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="hs-cover-with-gradient-form-email-1"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="hs-cover-with-gradient-form-email-1"
                                        className="shadow-xl border py-3 px-4 block w-full border-gray-200 shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                        defaultValue={localStorage.getItem("email")}
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                                >
                                    Join the waitlist
                                    <svg
                                        className="w-3 h-3"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Waitlist