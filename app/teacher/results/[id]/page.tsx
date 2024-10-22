import { cases } from '@/lib/cases';
import ResultsPageClient from '@/components/ResultsPageClient';

export function generateStaticParams() {
  return cases.map((caseItem) => ({
    id: caseItem.id.toString(),
  }));
}

export default function ResultsPage({ params }) {
  return <ResultsPageClient params={params} />;
}