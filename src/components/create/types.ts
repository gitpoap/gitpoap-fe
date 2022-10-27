import { useCreationForm } from './useCreationForm';

export type CreationFormFields = {
  image: File | null;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  contributors: string[];
};

export type FormReturnTypes = ReturnType<typeof useCreationForm>;
