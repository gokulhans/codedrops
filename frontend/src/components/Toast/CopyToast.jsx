import React, { useEffect } from "react";

const CopyToast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return <div className="toast">{message}</div>;
};

export default CopyToast;