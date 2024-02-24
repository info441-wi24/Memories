import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Tag(props) {
    return (
        <>
            <div>
                <div className="tag">
                    <p className="my-0">{props.tag}</p>
                </div>
            </div>
        </>
    )
}



