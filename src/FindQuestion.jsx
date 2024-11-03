//FindQuestion.jsx

import React, { useEffect, useState } from 'react';
import { fetchQuestions } from './utils/firebase'
import Draggable from 'react-draggable';
import './FindQuestion.css';


function FindQuestion() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState({
    tag: '',
    title: ''
  });

  useEffect(() => {
    fetchQuestions(setQuestions);
  }, []);

  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    // Update the filter state
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  
    // Filter the questions based on the updated filter
    var filtered = questions;
    if (name === 'tag') {
      filtered = questions.filter(question => question.tags.includes(value));
    } 
    else if (name === 'title') {
      filtered = questions.filter(question => 
        question.title.toLowerCase().includes(value.toLowerCase())
      );
    }
  
    // Update the filtered questions state
    setFilteredQuestions(filtered);
  };


  const toggleDetails = (id) => {
    setQuestions(questions.map(question => {
      if (question.id === id) {
        return { ...question, expanded: !question.expanded };
      }
      else{
        return question;
      }
    }));
  };

  return (
    <div className="find-question">
      <h1>Find Question</h1>
      <div className="filters">
        <input
          type="text"
          name="tag"
          placeholder="Filter by tag"
          value={filter.tag}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Filter by title"
          value={filter.title}
          onChange={handleFilterChange}
        />
      </div>
      <div className="question-list">
        {filteredQuestions.map((question) => (
          <Draggable key={question.id}>
            <div className="question-card">
              <h2>{question.title}</h2>
              <button onClick={() => toggleDetails(question.id)}>Details</button>
              {question.expanded && (
                <div className="question-details">
                  <p>{question.description}</p>
                  <p>Tags:{question.tags}</p>
                  <p>Date:{new Date(question.date.seconds * 1000).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default FindQuestion;
