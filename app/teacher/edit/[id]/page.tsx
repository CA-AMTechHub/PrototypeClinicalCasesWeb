import { cases } from '@/lib/cases';
import CaseEditForm from '@/components/CaseEditForm';

export function generateStaticParams() {
  return cases.map((caseItem) => ({
    id: caseItem.id.toString(),
  }));
}

export default function EditCasePage({ params }) {
  const caseId = parseInt(params.id);
  const caseToEdit = cases.find(c => c.id === caseId);

  if (!caseToEdit) {
    return <div>Caso no encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Editar Caso: {caseToEdit.title}</h1>
      <CaseEditForm caseData={caseToEdit} />
    </div>
  );
}