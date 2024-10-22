"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { User, Stethoscope, Clock, Edit, FileText, ToggleLeft } from 'lucide-react';
import Link from 'next/link';
import { cases } from '@/lib/cases';

export default function TeacherDashboard() {
  const [activeCases, setActiveCases] = useState(cases.map(c => c.id));

  const toggleCaseActive = (caseId: number) => {
    setActiveCases(prev => 
      prev.includes(caseId) 
        ? prev.filter(id => id !== caseId)
        : [...prev, caseId]
    );
  };

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
          <CardFooter className="flex flex-col space-y-2">
            <div className="flex justify-between w-full">
              <Link href={`/teacher/edit/${caseItem.id}`} passHref>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Editar Caso
                </Button>
              </Link>
              <Link href={`/chat/${caseItem.id}`} passHref>
                <Button>
                  <Stethoscope className="mr-2 h-4 w-4" /> Ver Simulación
                </Button>
              </Link>
            </div>
            <div className="flex justify-between w-full">
              <Link href={`/teacher/results/${caseItem.id}`} passHref>
                <Button variant="secondary">
                  <FileText className="mr-2 h-4 w-4" /> Ver Resultados
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <ToggleLeft className="h-4 w-4" />
                <Switch
                  checked={activeCases.includes(caseItem.id)}
                  onCheckedChange={() => toggleCaseActive(caseItem.id)}
                />
                <span>{activeCases.includes(caseItem.id) ? 'Activo' : 'Inactivo'}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}