import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Comment(props) {
    let comment = props.comment;
    return (
        <>
        <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex flex-start">
                <div>
                  <h6 className="fw-bold text-primary mb-1">{comment.username}</h6>
                  <p className="text-muted small mb-0">
                    {comment.uploadDate}
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



