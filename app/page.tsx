import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CaseList from '@/components/CaseList';
import TeacherDashboard from '@/components/TeacherDashboard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Plataforma de Simulación Clínica</h1>
      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">Vista Estudiante</TabsTrigger>
          <TabsTrigger value="teacher">Vista Docente</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <CaseList />
        </TabsContent>
        <TabsContent value="teacher">
          <TeacherDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}