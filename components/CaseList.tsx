"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Stethoscope, Clock } from 'lucide-react';
import Link from 'next/link';

const cases = [
  {
    id: 1,
    title: "Dolor abdominal agudo",
    patientName: "María García",
    age: 45,
    gender: "Femenino",
    mainSymptom: "Dolor abdominal intenso",
    duration: "30 minutos",
    difficulty: "Intermedio",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    title: "Dificultad respiratoria",
    patientName: "Carlos Rodríguez",
    age: 60,
    gender: "Masculino",
    mainSymptom: "Disnea progresiva",
    duration: "45 minutos",
    difficulty: "Avanzado",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    title: "Cefalea intensa",
    patientName: "Ana Martínez",
    age: 28,
    gender: "Femenino",
    mainSymptom: "Dolor de cabeza severo",
    duration: "20 minutos",
    difficulty: "Principiante",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
];

export default function CaseList() {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((caseItem) => (
        <Card key={caseItem.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{caseItem.title}</CardTitle>
            <CardDescription>Caso Clínico #{caseItem.id}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage src={caseItem.avatar} alt={caseItem.patientName} />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{caseItem.patientName}</p>
                <p className="text-sm text-gray-500">{caseItem.age} años, {caseItem.gender}</p>
              </div>
            </div>
            <p className="mb-2"><strong>Síntoma principal:</strong> {caseItem.mainSymptom}</p>
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4" />
              <span>{caseItem.duration}</span>
            </div>
            <Badge variant="secondary">{caseItem.difficulty}</Badge>
          </CardContent>
          <CardFooter>
            <Link href={`/chat/${caseItem.id}`} passHref>
              <Button className="w-full">
                <Stethoscope className="mr-2 h-4 w-4" /> Iniciar Simulación
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}