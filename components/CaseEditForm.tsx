"use client"

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClinicalCase, Question, CaseImage } from '@/lib/cases';
import { Trash2 } from 'lucide-react';

export default function CaseEditForm({ caseData }: { caseData: ClinicalCase }) {
  const [editedCase, setEditedCase] = useState<ClinicalCase>(caseData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCase(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, field: keyof CaseImage, value: string) => {
    const newImages = [...editedCase.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setEditedCase(prev => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setEditedCase(prev => ({
      ...prev,
      images: [...prev.images, { url: '', description: '' }]
    }));
  };

  const removeImage = (index: number) => {
    setEditedCase(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedCase(prev => ({
          ...prev,
          images: [...prev.images, { url: reader.result as string, description: '' }]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...editedCase.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setEditedCase(prev => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: editedCase.questions.length + 1,
      type: 'open',
      question: '',
    };
    setEditedCase(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const removeQuestion = (index: number) => {
    setEditedCase(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios en el servidor
    console.log('Caso actualizado:', editedCase);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... (otros campos del formulario) ... */}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Imágenes</CardTitle>
        </CardHeader>
        <CardContent>
          {editedCase.images.map((image, index) => (
            <div key={index} className="mb-4 flex items-center">
              <div className="flex-grow mr-2">
                <Input
                  placeholder="URL de la imagen"
                  value={image.url}
                  onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Descripción de la imagen"
                  value={image.description}
                  onChange={(e) => handleImageChange(index, 'description', e.target.value)}
                />
              </div>
              <Button type="button" variant="destructive" onClick={() => removeImage(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex space-x-2">
            <Button type="button" onClick={addImage}>Agregar URL de Imagen</Button>
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              Subir Imagen
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Preguntas</CardTitle>
        </CardHeader>
        <CardContent>
          {editedCase.questions.map((question, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-between mb-2">
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                  className="w-1/2 p-2 border rounded"
                >
                  <option value="open">Abierta</option>
                  <option value="multiple">Opción Múltiple</option>
                  <option value="single">Opción Única</option>
                  <option value="truefalse">Verdadero/Falso</option>
                  <option value="image">Con Imagen</option>
                </select>
                <Button type="button" variant="destructive" onClick={() => removeQuestion(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Pregunta"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                className="mb-2"
              />
              {(question.type === 'multiple' || question.type === 'single') && (
                <Textarea
                  placeholder="Opciones (una por línea)"
                  value={question.options?.join('\n') || ''}
                  onChange={(e) => handleQuestionChange(index, 'options', e.target.value.split('\n'))}
                  rows={4}
                  className="mb-2"
                />
              )}
              {question.type === 'image' && (
                <select
                  value={question.imageUrl || ''}
                  onChange={(e) => handleQuestionChange(index, 'imageUrl', e.target.value)}
                  className="mb-2 w-full p-2 border rounded"
                >
                  <option value="">Seleccionar imagen</option>
                  {editedCase.images.map((image, imgIndex) => (
                    <option key={imgIndex} value={image.url}>
                      {image.description || `Imagen ${imgIndex + 1}`}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <Button type="button" onClick={addQuestion}>Agregar Pregunta</Button>
        </CardContent>
      </Card>

      <Button type="submit">Guardar Cambios</Button>
    </form>
  );
}