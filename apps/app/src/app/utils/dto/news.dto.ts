export interface NewsDto {
  id: string;
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  visibility: boolean;
  scheduledFor: string;
  isHighlighted: boolean;
  isSeo: boolean;
}

export interface CreateNewsDto {
  title: string;
  isSeo: boolean;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
  visibility?: boolean;
  isHighlighted?: boolean;
}

export interface UpdateNewsDto {
  id: string;
  title?: string;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
  visibility?: boolean;
  isHighlighted?: boolean;
  isSeo?: boolean;
}
