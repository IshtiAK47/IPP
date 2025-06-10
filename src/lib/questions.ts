export interface QuestionOption {
  text: string;
  value: string; 
}

export interface Question {
  id: string;
  questionText: string; 
  displayText: string; 
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    questionText: 'Energy Source: How do you recharge your energy levels primarily?',
    displayText: 'After a busy week, you prefer to recharge by:',
    options: [
      { text: 'Engaging in social activities with a group of people.', value: 'Socializing with others in group settings' },
      { text: 'Spending quiet time alone or with a very small circle of close friends.', value: 'Spending time alone or in small, intimate gatherings' },
    ],
  },
  {
    id: 'q2',
    questionText: 'Information Gathering: How do you prefer to take in and process new information?',
    displayText: 'When learning something new, you are more interested in:',
    options: [
      { text: 'Focusing on concrete facts, details, and practical applications.', value: 'Practical applications and real-world details' },
      { text: 'Exploring abstract theories, underlying patterns, and future possibilities.', value: 'Theories, concepts, and future possibilities' },
    ],
  },
  {
    id: 'q3',
    questionText: 'Decision Making Style: What guides your decisions more often?',
    displayText: 'When faced with an important decision, you tend to prioritize:',
    options: [
      { text: 'Objective logic, consistency, and impartial analysis.', value: 'Logical analysis and objective criteria' },
      { text: 'The impact on people involved, empathy, and maintaining harmony.', value: 'How it affects people and maintaining harmony' },
    ],
  },
  {
    id: 'q4',
    questionText: 'Lifestyle Preference: How do you prefer to organize your outer world?',
    displayText: 'You generally feel more comfortable when your life is:',
    options: [
      { text: 'Structured, planned, and organized, with clear schedules and closure.', value: 'Planned and orderly, with a clear sense of control' },
      { text: 'Flexible, spontaneous, and adaptable, keeping options open.', value: 'Spontaneous and flexible, open to new experiences' },
    ],
  },
  {
    id: 'q5',
    questionText: 'Attention to Detail vs. Big Picture: What naturally captures your attention more?',
    displayText: 'In a project or discussion, you are more likely to focus on:',
    options: [
      { text: 'The specific components, tasks, and factual data.', value: 'The specifics of what is being said or done' },
      { text: 'The overall concept, connections between ideas, and emerging possibilities.', value: 'The overall theme and underlying message or potential' },
    ],
  },
];
