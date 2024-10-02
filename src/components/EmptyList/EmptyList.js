import Image from 'next/image';
import React from 'react';
import img from "../../assets/13525-empty.gif"

const EmptyList = () => {
    return (
        <div className='shadow-md shadow-blue-200 max-w-80 mx-auto'>
            <Image src={img} alt='Empty image'></Image>
        </div>
    );
};

export default EmptyList;