"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cases } from '@/lib/cases';

export default function QuizPageClient({ params }) {
  const [currentCase, setCurrentCase] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hypothesis, setHypothesis] = useState('');

  useEffect(() => {
    const caseId = parseInt(params.id);
    const foundCase = cases.find(c => c.id === caseId);
    if (foundCase) {
      setCurrentCase(foundCase);
    }
  }, [params.id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentCase.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'open':
        return (
          <Textarea
            placeholder="Escribe tu respuesta aquí"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        );
      case 'multiple':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${index}`}
                  checked={(answers[question.id] || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const newAnswer = answers[question.id] || [];
                    if (checked) {
                      handleAnswer(question.id, [...newAnswer, option]);
                    } else {
                      handleAnswer(question.id, newAnswer.filter(item => item !== option));
                    }
                  }}
                />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      case 'single':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'truefalse':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`${question.id}-true`} />
              <Label htmlFor={`${question.id}-true`}>Verdadero</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`${question.id}-false`} />
              <Label htmlFor={`${question.id}-false`}>Falso</Label>
            </div>
          </RadioGroup>
        );
      case 'image':
        return (
          <div className="space-y-4">
            <div className="relative w-full h-64">
              <Image
                src={question.imageUrl}
                alt="Imagen de la pregunta"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <Textarea
              placeholder="Describe los hallazgos relevantes"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!currentCase) {
    return <div>Cargando...</div>;
  }

  const currentQuestion = currentCase.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/chat/${currentCase.id}`} passHref>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al chat
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Cuestionario: {currentCase.title}</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pregunta {currentQuestionIndex + 1} de {currentCase.questions.length}</CardTitle>
          <CardDescription>{currentQuestion.question}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderQuestion(currentQuestion)}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          <Button onClick={handleNext} disabled={currentQuestionIndex === currentCase.questions.length - 1}>
            Siguiente <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hipótesis diagnóstica</CardTitle>
          <CardDescription>Basándote en la información del caso y las preguntas anteriores, formula tu hipótesis diagnóstica.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Escribe tu hipótesis diagnóstica aquí"
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Enviar respuestas</Button>
        </CardFooter>
      </Card>
    </div>
  );
}