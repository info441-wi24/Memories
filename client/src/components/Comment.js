import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Comment(props) {
    let comment = props.comment;
    return (
        <>
        <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-start">
                <div>
                  <h6 class="fw-bold text-primary mb-1">{comment.username}</h6>
                  <p class="text-muted small mb-0">
                    {comment.uploadDate}
                  </p>
                </div>
              </div>
              <p class="mt-3 mb-4 pb-2">
                {comment.comment}
              </p>
            </div>
          </div>
        </>
    )
}



