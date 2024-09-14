export interface Thumb {
  id: string;
  key: string;
  url: string;
  isPublic: boolean;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: number;
  name: string;
  image: string;
  thumb: Thumb;
}

export interface TemplateSelectionStepProps {
  templateCards: Template[];
}
