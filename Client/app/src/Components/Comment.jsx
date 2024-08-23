import React, { useState, useEffect } from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';
import './Comment.css';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    
    fetch('http://localhost:3001/api/comments')
      .then(res => res.json())
      .then(data => {
        

        const validatedComments = data.map(comment => {
          if (!comment.user || !comment.user.username) {
            throw new Error('Invalid comment data: Missing user or username');
          }
          return {
            userId: comment.user._id,
            comId: comment._id,
            fullName: comment.user.username,
            text: comment.content,
            replies: []
          };
        });
        setComments(validatedComments);
      })
      .catch(err => console.error('Error fetching comments:', err));
  }, []);

  const handleAddComment = (data) => {
    if (!newComment) return;
    console.log('Token being sent:', token);

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then(res => {
        console.log('Response status:', res.status);
        if (res.status === 401) {
          throw new Error('Unauthorized: Invalid or expired token');
        }
        return res.json();
      })
      .then(data => {
        if (!data.user || !data.user.username) {
          throw new Error('Invalid comment data: Missing user or username');
        }
        setComments([...comments, {
          userId: data.user._id,
          comId: data._id,
          fullName: data.user.username,
          text: data.content,
          replies: []
        }]);
        setNewComment('');
      });
  };

  return (
    <div className="comment-section">
      <CommentSection
        currentUser={{
          currentUserId: '01a',
          currentUserFullName: 'Riya Negi'
        }}
        logIn={{
          loginLink: 'http://localhost:3001/api/login',
          signupLink: 'http://localhost:3001/api/register'
        }}
        commentData={comments}
        onSubmitAction={handleAddComment}
        currentData={(data) => {
          console.log('Current data', data);
        }}
      />
     
    </div>
  );
};

export default Comment;