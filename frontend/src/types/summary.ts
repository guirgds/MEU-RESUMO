export type SummaryVisibility = 'PUBLIC' | 'PRIVATE' | 'UNLISTED';

export type Summary = {
  id: string;
  title: string;
  content: string;
  visibility: SummaryVisibility;
  createdAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
  };
  subject: { id: string; name: string } | null;
  topic: { id: string; name: string } | null;
  attachments: Array<{ id: string; url: string; type: string; fileName: string | null }>;
};
