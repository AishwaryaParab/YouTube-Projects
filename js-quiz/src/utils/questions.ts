export interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
  export const questions: Question[] = [
    {
      question: "What does 'JS' stand for in JavaScript?",
      options: ["JavaSource", "JustScript", "JavaScript", "JellyScript"],
      answer: "JavaScript",
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "IBM"],
      answer: "Netscape",
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "<!--", "#", "/*"],
      answer: "//",
    },
  ];