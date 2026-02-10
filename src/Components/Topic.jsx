import React from 'react';
import { useStore } from '../assets/store';
import '../App.css';


function Topic({ onSelect }) {
  const { topics, addTopic, updateTopic, deleteTopic } = useStore();
  const [newTopic, setNewTopic] = React.useState('');
  const [editIndex, setEditIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');

  const handleAdd = () => {
    if (newTopic.trim()) {
      addTopic(newTopic);
      setNewTopic('');
    }
  };

  const handleUpdate = (index) => {
    updateTopic(index, editValue);
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div className="topic-container">
      <h2>Topics</h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {topics.map((topic, idx) => (
          <li key={idx} className="topic-item" style={{ display: 'flex', alignItems: 'center' }}>
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
                <span onClick={() => onSelect && onSelect(idx)} style={{ flex: 1 }}>
                  {topic.name}
                </span>
                <button onClick={() => { setEditIndex(idx); setEditValue(topic.name); }}>Edit</button>
                <button onClick={() => deleteTopic(idx)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <input
          value={newTopic}
          onChange={e => setNewTopic(e.target.value)}
          placeholder="Add new topic"
        />
        <button onClick={handleAdd}>Add Topic</button>
      </div>
    </div>
  );
}

export default Topic;
