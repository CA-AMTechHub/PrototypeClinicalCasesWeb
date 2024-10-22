export interface CaseImage {
  url: string;
  description: string;
}

export interface Question {
  id: number;
  type: 'open' | 'multiple' | 'single' | 'truefalse' | 'image';
  question: string;
  options?: string[];
  imageUrl?: string;
}

export interface ClinicalCase {
  id: number;
  title: string;
  patientName: string;
  age: number;
  gender: string;
  mainSymptom: string;
  duration: string;
  difficulty: string;
  avatar: string;
  fullDescription: string;
  images: CaseImage[];
  questions: Question[];
}

export const cases: ClinicalCase[] = [
  {
    id: 1,
    title: "Dolor abdominal agudo",
    patientName: "María García",
    age: 45,
    gender: "Femenino",
    mainSymptom: "Dolor abdominal intenso",
    duration: "30 minutos",
    difficulty: "Intermedio",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    fullDescription: "La paciente presenta un cuadro de dolor abdominal agudo...",
    images: [
      {
        url: "https://example.com/abdominal-xray.jpg",
        description: "Radiografía abdominal mostrando distensión intestinal"
      }
    ],
    questions: [
      {
        id: 1,
        type: 'open',
        question: '¿Cuáles son los síntomas principales que presenta la paciente?',
      },
      {
        id: 2,
        type: 'multiple',
        question: '¿Cuáles de los siguientes síntomas son consistentes con el cuadro clínico de la paciente?',
        options: ['Fiebre', 'Dolor abdominal', 'Náuseas', 'Diarrea'],
      },
    ]
  },
  // ... Otros casos clínicos
];