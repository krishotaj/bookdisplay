import React from 'react';
import Book from '../Components/Book';
import Comment from '../Components/Comment';
import './Home.css';

const Home = () => {
  const scrollToComments = () => {
    const element = document.getElementById('comment-section');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <Book />
      <button onClick={scrollToComments} className="scroll-button">View Comments</button>
      <div id="comment-section">
        <Comment />
      </div>
    </div>
  );
};

export default Home;
