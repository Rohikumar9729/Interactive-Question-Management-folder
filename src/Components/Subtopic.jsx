import React from 'react';
import { useStore } from '../assets/store';
import '../App.css';

function Subtopic({ topicIndex, onSelect }) {
  const { topics, addSubtopic, updateSubtopic, deleteSubtopic } = useStore();
  const [newSubtopic, setNewSubtopic] = React.useState('');
  const [editIndex, setEditIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');

  if (!topics[topicIndex]) return null;
  const subtopics = topics[topicIndex].subtopics || [];

  const handleAdd = () => {
    if (newSubtopic.trim()) {
      addSubtopic(topicIndex, newSubtopic);
      setNewSubtopic('');
    }
  };

  const handleUpdate = (index) => {
    updateSubtopic(topicIndex, index, editValue);
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div className="subtopic-container">
      <h3>Subtopics</h3>
      <ul style={{ padding: 0, margin: 0 }}>
        {subtopics.map((sub, idx) => (
          <li key={idx} className="subtopic-item" style={{ display: 'flex', alignItems: 'center' }}>
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
                  {sub.name}
                </span>
                <button onClick={() => { setEditIndex(idx); setEditValue(sub.name); }}>Edit</button>
                <button onClick={() => deleteSubtopic(topicIndex, idx)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <input
          value={newSubtopic}
          onChange={e => setNewSubtopic(e.target.value)}
          placeholder="Add new subtopic"
        />
        <button onClick={handleAdd}>Add Subtopic</button>
      </div>
    </div>
  );
}

export default Subtopic;
