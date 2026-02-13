import { create } from 'zustand';
const LOCAL_STORAGE_KEY = 'iqm_topics';
const sampleTopics = [
  {
    name: 'Array',
    subtopics: [
      {
        name: 'Basics',
        questions: [
          {
            text: 'Set Matrix Zeroes',
            link: 'https://leetcode.com/problems/longest-balanced-subarray-i/description/?envType=daily-question&envId=2026-02-10'
          },
          {
            text: 'Pascal Triangle',
            link: 'https://leetcode.com/problems/longest-balanced-subarray-i/description/?envType=daily-question&envId=2026-02-10'
          }
        ]
      }
    ]
  },
  {
    name: 'Sliding window',
    subtopics: [
      {
        name: 'Basics',
        questions: [
          {
            text: 'Set Matrix Zeroes',
            link: 'https://leetcode.com/problems/longest-balanced-subarray-i/description/?envType=daily-question&envId=2026-02-10'
          },
          {
            text: 'Pascal Triangle',
            link: 'https://leetcode.com/problems/longest-balanced-subarray-i/description/?envType=daily-question&envId=2026-02-10'
          }
        ]
      }
    ]
  },
  {
    name: 'Dynamic programming',
    subtopics: [
      {
        name: 'Basics',
        questions: [
          {
            text: 'Set Matrix Zeroes',
            link: 'https://leetcode.com/problems/longest-balanced-subarray-i/description/?envType=daily-question&envId=2026-02-10'
          },
          {
            text: 'Pascal Triangle',
            link: 'https://leetcode.com/problems/longest-balanced-subarray-i/description/?envType=daily-question&envId=2026-02-10'
          }
        ]
      }
    ]
  },
  {
    name: 'Linked List',
    subtopics: [
      {
        name: 'Operations',
        questions: [
          {
            text: 'Reverse a Linked List',
            link: 'https://leetcode.com/problems/longest-balanced-subarray-i/description/?envType=daily-question&envId=2026-02-10'
          }
        ]
      }
    ]
  },
  {
    name: 'Doubly Linked List',
    subtopics: [
      {
        name: 'Operations',
        questions: ['Reverse a Linked List']
      }
    ]
  },
  {
    name: 'Binary tree',
    subtopics: [
      {
        name: 'Operations',
        questions: ['Reverse a Linked List']
      }
    ]
  },
  {
    name: 'Graph',
    subtopics: [
      {
        name: 'Operations',
        questions: ['Reverse a Linked List']
      }
    ]
  }
];

export const useStore = create((set) => ({
  topics: [],

  // Topic CRUD
  addTopic: (name) => set((state) => {
    const topics = [...state.topics, { name, subtopics: [] }];
    saveTopics(topics);
    return { topics };
  }),
  updateTopic: (index, newName) => set((state) => {
    const topics = [...state.topics];
    topics[index].name = newName;
    saveTopics(topics);
    return { topics };
  }),
  deleteTopic: (index) => set((state) => {
    const topics = [...state.topics];
    topics.splice(index, 1);
    saveTopics(topics);
    return { topics };
  }),

  // Subtopic CRUD
  addSubtopic: (topicIndex, name) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics = [
      ...(topics[topicIndex].subtopics || []),
      { name, questions: [] }
    ];
    saveTopics(topics);
    return { topics };
  }),
  updateSubtopic: (topicIndex, subtopicIndex, newName) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics[subtopicIndex].name = newName;
    saveTopics(topics);
    return { topics };
  }),
  deleteSubtopic: (topicIndex, subtopicIndex) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics.splice(subtopicIndex, 1);
    saveTopics(topics);
    return { topics };
  }),

  // Question CRUD
  addQuestion: (topicIndex, subtopicIndex, question) => set((state) => {
    const topics = [...state.topics];
    const qObj = typeof question === 'string' ? { text: question, link: '', visited: false } : { ...question, visited: question.visited || false };
    topics[topicIndex].subtopics[subtopicIndex].questions = [
      ...(topics[topicIndex].subtopics[subtopicIndex].questions || []),
      qObj
    ];
    saveTopics(topics);
    return { topics };
  }),
  updateQuestion: (topicIndex, subtopicIndex, questionIndex, newQuestion) => set((state) => {
    const topics = [...state.topics];
    const prev = topics[topicIndex].subtopics[subtopicIndex].questions[questionIndex];
    topics[topicIndex].subtopics[subtopicIndex].questions[questionIndex] =
      typeof newQuestion === 'string' ? { text: newQuestion, link: '', visited: prev && prev.visited } : { ...newQuestion, visited: (newQuestion.visited !== undefined ? newQuestion.visited : (prev && prev.visited)) };
    saveTopics(topics);
    return { topics };
  }),

  toggleVisitedQuestion: (topicIndex, subtopicIndex, questionIndex) => set((state) => {
    const topics = [...state.topics];
    const q = topics[topicIndex].subtopics[subtopicIndex].questions[questionIndex];
    if (q) q.visited = !q.visited;
    saveTopics(topics);
    return { topics };
  }),
  deleteQuestion: (topicIndex, subtopicIndex, questionIndex) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics[subtopicIndex].questions.splice(questionIndex, 1);
    saveTopics(topics);
    return { topics };
  }),

  
  moveTopic: (fromIndex, toIndex) => set((state) => {
    const topics = [...state.topics];
    if (fromIndex < 0 || fromIndex >= topics.length || toIndex < 0 || toIndex >= topics.length) return { topics };
    const [item] = topics.splice(fromIndex, 1);
    topics.splice(toIndex, 0, item);
    saveTopics(topics);
    return { topics };
  }),

  moveSubtopic: (topicIndex, fromIndex, toIndex, targetTopicIndex) => set((state) => {
    const topics = [...state.topics];
    const srcTopic = topics[topicIndex];
    const dstTopic = typeof targetTopicIndex === 'number' ? topics[targetTopicIndex] : srcTopic;
    if (!srcTopic || !dstTopic) return { topics };
    const fromList = srcTopic.subtopics || [];
    const toList = dstTopic.subtopics || [];
    if (fromIndex < 0 || fromIndex >= fromList.length) return { topics };
    const [item] = fromList.splice(fromIndex, 1);
    if (dstTopic === srcTopic) {
      // reorder within same topic
      toList.splice(toIndex, 0, item);
      topics[topicIndex].subtopics = toList;
    } else {
      // move between topics
      toList.splice(toIndex, 0, item);
      topics[topicIndex].subtopics = fromList;
      topics[targetTopicIndex].subtopics = toList;
    }
    saveTopics(topics);
    return { topics };
  }),

  moveQuestion: (topicIndex, subtopicIndex, fromIndex, toIndex, targetTopicIndex, targetSubtopicIndex) => set((state) => {
    const topics = [...state.topics];
    const srcTopic = topics[topicIndex];
    const dstTopic = typeof targetTopicIndex === 'number' ? topics[targetTopicIndex] : srcTopic;
    if (!srcTopic || !dstTopic) return { topics };
    const srcSub = srcTopic.subtopics[subtopicIndex];
    const dstSub = (typeof targetSubtopicIndex === 'number') ? dstTopic.subtopics[targetSubtopicIndex] : srcSub;
    if (!srcSub || !dstSub) return { topics };
    const fromList = srcSub.questions || [];
    const toList = dstSub.questions || [];
    if (fromIndex < 0 || fromIndex >= fromList.length) return { topics };
    const [item] = fromList.splice(fromIndex, 1);
    toList.splice(toIndex, 0, item);
    // assign back
    topics[topicIndex].subtopics[subtopicIndex].questions = fromList;
    topics[(typeof targetTopicIndex === 'number' ? targetTopicIndex : topicIndex)].subtopics[(typeof targetSubtopicIndex === 'number' ? targetSubtopicIndex : subtopicIndex)].questions = toList;
    saveTopics(topics);
    return { topics };
  }),

  // Utility
  loadInitialData: (data) => set({ topics: data }),
}));

// LocalStorage helpers
function saveTopics(topics) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(topics));
  } catch (e) {
    void e;
  }
}

function loadTopics() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    void e;
  }
  return null;
}

// Load from localStorage or fallback to sample data
const storedTopics = loadTopics();
useStore.getState().loadInitialData(storedTopics || sampleTopics);

// Export all operations for external use
export const addTopic = useStore.getState().addTopic;
export const updateTopic = useStore.getState().updateTopic;
export const deleteTopic = useStore.getState().deleteTopic;
export const addSubtopic = useStore.getState().addSubtopic;
export const updateSubtopic = useStore.getState().updateSubtopic;
export const deleteSubtopic = useStore.getState().deleteSubtopic;
export const addQuestion = useStore.getState().addQuestion;
export const updateQuestion = useStore.getState().updateQuestion;
export const deleteQuestion = useStore.getState().deleteQuestion;
export const moveTopic = useStore.getState().moveTopic;
export const moveSubtopic = useStore.getState().moveSubtopic;
export const moveQuestion = useStore.getState().moveQuestion;