import React from 'react';

const Loading = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center justify-items-center mx-auto ">
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>

        </div>
    );
};

export default Loading;