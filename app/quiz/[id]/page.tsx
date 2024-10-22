import { cases } from '@/lib/cases';
import QuizPageClient from '@/components/QuizPageClient';

export function generateStaticParams() {
  return cases.map((caseItem) => ({
    id: caseItem.id.toString(),
  }));
}

export default function QuizPage({ params }) {
  return <QuizPageClient params={params} />;
}