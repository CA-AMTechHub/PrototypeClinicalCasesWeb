import { cases } from '@/lib/cases';
import ChatPageClient from '@/components/ChatPageClient';

export function generateStaticParams() {
  return cases.map((caseItem) => ({
    id: caseItem.id.toString(),
  }));
}

export default function ChatPage({ params }) {
  return <ChatPageClient params={params} />;
}