


import React, { useState } from "react";
import { useStore } from "./assets/store";
import '../src/App.css';
import Questions from "./Components/Questions";

const App = () => {
  const { topics, updateTopic, updateSubtopic } = useStore();
  const [openTopic, setOpenTopic] = useState(null);
  const [openSubtopic, setOpenSubtopic] = useState(null);
  const [editTopicIdx, setEditTopicIdx] = useState(null);
  const [editTopicValue, setEditTopicValue] = useState("");
  const [editSubIdx, setEditSubIdx] = useState({ t: null, s: null });
  const [editSubValue, setEditSubValue] = useState("");

  return (
    <>
      <header className="main-heading">
        INTERACTIVE QUESTION MANAGEMENT
      </header>
      <section className="main-section" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '2rem' }}>
        <ul style={{ width: '100%', padding: 0, margin: 0 }}>
        {topics.map((topic, tIdx) => (
          <React.Fragment key={tIdx}>
            <li
              className="topic-item"
              style={{ cursor: 'pointer', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', width: '100%' }}
              onClick={() => {
                setOpenTopic(openTopic === tIdx ? null : tIdx);
                setOpenSubtopic(null);
              }}
            >
              {editTopicIdx === tIdx ? (
                <>
                  <input
                    value={editTopicValue}
                    onChange={e => setEditTopicValue(e.target.value)}
                    style={{ flex: 1, marginRight: '0.7rem' }}
                    autoFocus
                  />
                  <button onClick={e => { e.stopPropagation(); updateTopic(tIdx, editTopicValue); setEditTopicIdx(null); }}>Save</button>
                  <button onClick={e => { e.stopPropagation(); setEditTopicIdx(null); }}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{topic.name}</span>
                  {/* Toggle button removed */}
                  <button style={{ marginLeft: '0.5rem' }} onClick={e => { e.stopPropagation(); setEditTopicIdx(tIdx); setEditTopicValue(topic.name); }}>Edit</button>
                </>
              )}
            </li>
            {openTopic === tIdx && (
              <ul style={{ marginLeft: '2rem', marginBottom: '0.5rem', padding: 0 }}>
                {(topic.subtopics || []).map((sub, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <li
                      className="subtopic-item"
                      style={{ cursor: 'pointer', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', width: '100%' }}
                      onClick={e => {
                        e.stopPropagation();
                        setOpenSubtopic(openSubtopic === sIdx ? null : sIdx);
                      }}
                    >
                      {editSubIdx.t === tIdx && editSubIdx.s === sIdx ? (
                        <>
                          <input
                            value={editSubValue}
                            onChange={e => setEditSubValue(e.target.value)}
                            style={{ flex: 1, marginRight: '0.7rem' }}
                            autoFocus
                          />
                          <button onClick={e => { e.stopPropagation(); updateSubtopic(tIdx, sIdx, editSubValue); setEditSubIdx({ t: null, s: null }); }}>Save</button>
                          <button onClick={e => { e.stopPropagation(); setEditSubIdx({ t: null, s: null }); }}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <span style={{ flex: 1 }}>{sub.name}</span>
                          {/* Toggle button removed */}
                          <button style={{ marginLeft: '0.5rem' }} onClick={e => { e.stopPropagation(); setEditSubIdx({ t: tIdx, s: sIdx }); setEditSubValue(sub.name); }}>Edit</button>
                        </>
                      )}
                    </li>
                    {openSubtopic === sIdx && (
                      <div style={{ marginLeft: '2rem', marginBottom: '0.5rem', width: '90%' }}>
                        <Questions topicIndex={tIdx} subtopicIndex={sIdx} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </section>
    </>
  );
};

export default App;
