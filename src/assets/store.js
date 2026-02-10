
import { create } from 'zustand';

// Sample data structure
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
  addTopic: (name) => set((state) => ({
    topics: [...state.topics, { name, subtopics: [] }]
  })),
  updateTopic: (index, newName) => set((state) => {
    const topics = [...state.topics];
    topics[index].name = newName;
    return { topics };
  }),
  deleteTopic: (index) => set((state) => {
    const topics = [...state.topics];
    topics.splice(index, 1);
    return { topics };
  }),

  // Subtopic CRUD
  addSubtopic: (topicIndex, name) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics = [
      ...(topics[topicIndex].subtopics || []),
      { name, questions: [] }
    ];
    return { topics };
  }),
  updateSubtopic: (topicIndex, subtopicIndex, newName) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics[subtopicIndex].name = newName;
    return { topics };
  }),
  deleteSubtopic: (topicIndex, subtopicIndex) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics.splice(subtopicIndex, 1);
    return { topics };
  }),

  // Question CRUD
  addQuestion: (topicIndex, subtopicIndex, question) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics[subtopicIndex].questions = [
      ...(topics[topicIndex].subtopics[subtopicIndex].questions || []),
      typeof question === 'string' ? { text: question, link: '' } : question
    ];
    return { topics };
  }),
  updateQuestion: (topicIndex, subtopicIndex, questionIndex, newQuestion) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics[subtopicIndex].questions[questionIndex] =
      typeof newQuestion === 'string' ? { text: newQuestion, link: '' } : newQuestion;
    return { topics };
  }),
  deleteQuestion: (topicIndex, subtopicIndex, questionIndex) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subtopics[subtopicIndex].questions.splice(questionIndex, 1);
    return { topics };
  }),

  // Utility
  loadInitialData: (data) => set({ topics: data }),
}));

// Load sample data on first import
useStore.getState().loadInitialData(sampleTopics);

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