"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cases } from '@/lib/cases';

// Simulación de resultados de estudiantes
const mockStudentResults = [
  {
    id: 1,
    name: "Estudiante 1",
    chat: [
      { role: 'user', content: "Hola, ¿cuáles son sus síntomas principales?" },
      { role: 'assistant', content: "Tengo un dolor abdominal intenso que comenzó hace unas horas." },
      // ... más mensajes del chat
    ],
    quizAnswers: [
      { question: "¿Cuáles son los síntomas principales que presenta la paciente?", answer: "Dolor abdominal agudo" },
      { question: "¿Cuáles de los siguientes síntomas son consistentes con el cuadro clínico de la paciente?", answer: ["Dolor abdominal", "Náuseas"] },
      // ... más respuestas del cuestionario
    ],
    hypothesis: "Basado en los síntomas, sospecho que podría tratarse de una apendicitis aguda."
  },
  // ... más resultados de estudiantes
];

export default function ResultsPageClient({ params }) {
  const [currentCase, setCurrentCase] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const caseId = parseInt(params.id);
    const foundCase = cases.find(c => c.id === caseId);
    if (foundCase) {
      setCurrentCase(foundCase);
      // Aquí normalmente cargaríamos los resultados reales desde el servidor
      setResults(mockStudentResults);
    }
  }, [params.id]);

  if (!currentCase) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/teacher" passHref>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al panel
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Resultados: {currentCase.title}</h1>
      
      {results.map((student) => (
        <Card key={student.id} className="mb-6">
          <CardHeader>
            <CardTitle>{student.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chat">
              <TabsList>
                <TabsTrigger value="chat">Chat de Simulación</TabsTrigger>
                <TabsTrigger value="quiz">Respuestas del Cuestionario</TabsTrigger>
              </TabsList>
              <TabsContent value="chat">
                <div className="space-y-4">
                  {student.chat.map((message, index) => (
                    <div key={index} className={`p-2 rounded ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                      <strong>{message.role === 'user' ? 'Estudiante:' : 'Paciente:'}</strong> {message.content}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="quiz">
                <div className="space-y-4">
                  {student.quizAnswers.map((answer, index) => (
                    <div key={index}>
                      <p className="font-semibold">{answer.question}</p>
                      <p>{Array.isArray(answer.answer) ? answer.answer.join(", ") : answer.answer}</p>
                    </div>
                  ))}
                  <div>
                    <p className="font-semibold">Hipótesis diagnóstica:</p>
                    <p>{student.hypothesis}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}