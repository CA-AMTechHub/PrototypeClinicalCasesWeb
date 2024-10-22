import TeacherDashboard from '@/components/TeacherDashboard';

export default function TeacherPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Panel del Docente</h1>
      <TeacherDashboard />
    </div>
  );
}