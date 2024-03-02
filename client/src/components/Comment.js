import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Comment(props) {
    let comment = props.comment;
    const dateObj = new Date(props.comment.uploadDate);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const date = month[dateObj.getUTCMonth()] + " " + dateObj.getUTCDate() + ", " + dateObj.getUTCFullYear()

    return (
        <>
        <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex flex-start">
                <div>
                  {comment.email != undefined ? 
                  <Link className="text-primary text-decoration-none" to={"/profile/" + comment.email.split("@")[0]}>
                    <h6 className="fw-bold text-primary mb-1">{comment.username}</h6>
                  </Link> : <h6 className="fw-bold text-primary mb-1">{comment.username}</h6>
                  }
                  <p className="text-muted small mb-0">
                    {date}
                  </p>
                </div>
              </div>
              <p className="mt-3 mb-4 pb-2">
                {comment.comment}
              </p>
            </div>
          </div>
        </>
    )
}



