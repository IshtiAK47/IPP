
export interface JjbaQuestionOption {
  text: string;
  value: string;
}

export interface JjbaQuestion {
  id: string;
  questionText: string; // For AI context
  displayText: string; // For UI
  options: JjbaQuestionOption[];
}

export const jjbaQuestions: JjbaQuestion[] = [
  {
    id: 'q1',
    questionText: 'Preferred Combat Style: What is your preferred way to engage in a confrontation?',
    displayText: 'When a fight breaks out, you prefer to:',
    options: [
      { text: 'Get up close and personal with powerful direct attacks.', value: 'Close-range barrage type' },
      { text: 'Attack from a distance, using precision or area-of-effect abilities.', value: 'Long-range specialist type' },
      { text: 'Outsmart your opponent with clever tricks and unpredictable moves.', value: 'Strategic and tricky type' },
      { text: 'Focus on protecting yourself or others, using defensive or supportive abilities.', value: 'Defensive or support type' },
    ],
  },
  {
    id: 'q2',
    questionText: 'Desired Ability Type: What kind of Stand power resonates most with you?',
    displayText: 'If you could have any superpower, you\'d choose:',
    options: [
      { text: 'Control over an element like fire, water, or electricity.', value: 'Elemental control' },
      { text: 'The ability to manipulate time or space.', value: 'Time or space manipulation' },
      { text: 'Powers that subtly influence minds or reality itself.', value: 'Mind or reality influence' },
      { text: 'Enhanced physical abilities like super strength or speed.', value: 'Enhanced physical prowess' },
      { text: 'Abilities that heal, buff, or otherwise support allies.', value: 'Healing or support abilities' },
    ],
  },
  {
    id: 'q3',
    questionText: 'Core Motivation or Fear: What drives you or what do you fear most?',
    displayText: 'Your strongest driving force or deepest fear is often related to:',
    options: [
      { text: 'The pursuit of ultimate power or knowledge.', value: 'Pursuit of power or knowledge' },
      { text: 'Protecting loved ones and fighting for justice.', value: 'Protecting others and justice' },
      { text: 'Understanding the mysteries of the universe or existence.', value: 'Uncovering mysteries' },
      { text: 'The fear of being helpless or losing control.', value: 'Fear of helplessness or loss of control' },
      { text: 'A desire for artistic expression or leaving a unique mark.', value: 'Desire for unique self-expression' },
    ],
  },
  {
    id: 'q4',
    questionText: 'Musical Preference (for Stand Name inspiration): What music genre best reflects your personality or taste?',
    displayText: 'Which music genre best vibes with your soul?',
    options: [
      { text: 'Classic Rock / Hard Rock / Metal (e.g., Queen, Led Zeppelin, Metallica)', value: 'Rock or Metal music' },
      { text: 'Pop / Electronic / Dance (e.g., Michael Jackson, Daft Punk, Lady Gaga)', value: 'Pop or Electronic music' },
      { text: 'Jazz / Soul / Funk (e.g., Miles Davis, James Brown, Stevie Wonder)', value: 'Jazz, Soul, or Funk music' },
      { text: 'Classical / Orchestral (e.g., Beethoven, Mozart)', value: 'Classical or Orchestral music' },
      { text: 'Hip-Hop / Rap (e.g., Wu-Tang Clan, Kendrick Lamar)', value: 'Hip-Hop or Rap music' },
      { text: 'Alternative / Indie (e.g., Radiohead, The Smiths)', value: 'Alternative or Indie music' },
    ],
  },
  {
    id: 'q5',
    questionText: 'Stand\'s Personality/Attitude: How would your Stand ideally behave or present itself?',
    displayText: 'Your Stand\'s general demeanor would be:',
    options:
      [
        { text: 'Aggressive and imposing, a clear threat.', value: 'Aggressive and imposing' },
        { text: 'Stoic and silent, mysterious and observant.', value: 'Stoic and mysterious' },
        { text: 'Mischievous and unpredictable, keeping foes guessing.', value: 'Mischievous and unpredictable' },
        { text: 'Elegant and precise, almost artistic in its movements.', value: 'Elegant and precise' },
        { text: 'Loyal and protective, an unwavering guardian.', value: 'Loyal and protective guardian' },
      ],
  },
];
