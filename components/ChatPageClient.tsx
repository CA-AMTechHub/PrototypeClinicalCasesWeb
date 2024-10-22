"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, ArrowLeft, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { cases } from '@/lib/cases';

export default function ChatPageClient({ params }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentCase, setCurrentCase] = useState(null);

  useEffect(() => {
    const caseId = parseInt(params.id);
    const foundCase = cases.find(c => c.id === caseId);
    if (foundCase) {
      setCurrentCase(foundCase);
      setMessages([
        { role: 'system', content: `Bienvenido a la simulación. Eres el médico atendiendo a ${foundCase.patientName}, ${foundCase.age} años, ${foundCase.gender}. Síntoma principal: ${foundCase.mainSymptom}. Comienza la consulta.` }
      ]);
    }
  }, [params.id]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { role: 'user', content: inputMessage }]);
      setInputMessage('');
      // Aquí simularíamos la respuesta del paciente
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Respuesta simulada del paciente.' }]);
      }, 1000);
    }
  };

  if (!currentCase) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" passHref>
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a casos
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{currentCase.title}</h1>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={currentCase.avatar} alt={currentCase.patientName} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            <span>{currentCase.patientName}</span>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto p-4">
        <div className="container mx-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-background p-4">
        <div className="container mx-auto">
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={handleSendMessage}>Enviar</Button>
          </div>
          <Link href={`/quiz/${currentCase.id}`} passHref>
            <Button variant="outline" className="w-full">
              <ClipboardList className="mr-2 h-4 w-4" /> Ir al cuestionario
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}