import React from 'react';
import { useStore } from '../assets/store';
import '../App.css';


function Questions({ topicIndex, subtopicIndex }) {
  const { topics, addQuestion, updateQuestion, deleteQuestion } = useStore();
  const [newQuestion, setNewQuestion] = React.useState('');
  const [editIndex, setEditIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');

  if (!topics[topicIndex] || !topics[topicIndex].subtopics[subtopicIndex]) return null;
  const questions = topics[topicIndex].subtopics[subtopicIndex].questions || [];

  const handleAdd = () => {
    if (newQuestion.trim()) {
      addQuestion(topicIndex, subtopicIndex, newQuestion);
      setNewQuestion('');
    }
  };

  const handleUpdate = (index) => {
    updateQuestion(topicIndex, subtopicIndex, index, editValue);
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div className="question-container">
      <h4>Questions</h4>
      <ul style={{ padding: 0, margin: 0 }}>
        {questions.map((q, idx) => (
          <li key={idx} className="question-item" style={{ display: 'flex', alignItems: 'center' }}>
            {editIndex === idx ? (
              <>
                <input
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  style={{ marginRight: '0.7rem', flex: 1 }}
                  autoFocus
                />
                <button onClick={() => handleUpdate(idx)}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                {q.link ? (
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, color: '#00e676', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    {q.text}
                  </a>
                ) : (
                  <span style={{ flex: 1 }}>{q.text || q}</span>
                )}
                <button onClick={() => { setEditIndex(idx); setEditValue(q.text || q); }}>Edit</button>
                <button onClick={() => deleteQuestion(topicIndex, subtopicIndex, idx)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <input
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
          placeholder="Add new question"
        />
        <button onClick={handleAdd}>Add Question</button>
      </div>
    </div>
  );
}

export default Questions;
