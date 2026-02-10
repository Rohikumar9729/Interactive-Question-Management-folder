import React from 'react';
import { useStore } from '../assets/store';
import '../App.css';

function Questions({ topicIndex, subtopicIndex }) {
  const { topics, addQuestion, updateQuestion, deleteQuestion, toggleVisitedQuestion } = useStore();
  const [newQuestionText, setNewQuestionText] = React.useState('');
  const [newQuestionLink, setNewQuestionLink] = React.useState('');
  const [editIndex, setEditIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState({ text: '', link: '' });

  if (!topics[topicIndex] || !topics[topicIndex].subtopics[subtopicIndex]) return null;
  const questions = topics[topicIndex].subtopics[subtopicIndex].questions || [];

  const handleAdd = () => {
    if (newQuestionText.trim()) {
      addQuestion(topicIndex, subtopicIndex, { text: newQuestionText, link: newQuestionLink });
      setNewQuestionText('');
      setNewQuestionLink('');
    }
  };

  const handleUpdate = (index) => {
    updateQuestion(topicIndex, subtopicIndex, index, editValue);
    setEditIndex(null);
    setEditValue({ text: '', link: '' });
  };

  return (
    <div className="question-container">
      <h4>Questions</h4>
      <ul style={{ padding: 0, margin: 0 }}>
        {questions.map((q, idx) => (
          <li key={idx} className="question-item" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={!!q.visited}
              onChange={() => toggleVisitedQuestion(topicIndex, subtopicIndex, idx)}
              style={{ marginRight: '0.7rem' }}
              title="Mark as visited"
            />
            {editIndex === idx ? (
              <>
                <input
                  value={editValue.text}
                  onChange={e => setEditValue(ev => ({ ...ev, text: e.target.value }))}
                  style={{ marginRight: '0.7rem', flex: 2 }}
                  placeholder="Question text"
                  autoFocus
                />
                <input
                  value={editValue.link}
                  onChange={e => setEditValue(ev => ({ ...ev, link: e.target.value }))}
                  style={{ marginRight: '0.7rem', flex: 2 }}
                  placeholder="Question link (optional)"
                />
                <button onClick={() => handleUpdate(idx)}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{ flex: 2, cursor: q.link ? 'pointer' : 'default', color: q.link ? '#2d5b8c' : undefined, textDecoration: q.link ? 'underline' : undefined }}
                  onClick={() => {
                    if (q.link) {
                      window.open(q.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  {q.text || q}
                </span>
                <button onClick={() => { setEditIndex(idx); setEditValue({ text: q.text || q, link: q.link || '' }); }}>Edit</button>
                <button onClick={() => deleteQuestion(topicIndex, subtopicIndex, idx)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          value={newQuestionText}
          onChange={e => setNewQuestionText(e.target.value)}
          placeholder="Add new question"
          style={{ flex: 2 }}
        />
        <button onClick={handleAdd}>Add Question</button>
      </div>
    </div>
  );
}

export default Questions;
