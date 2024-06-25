export interface AbstractEntity {
  id: number;
  created: Date;
  updated: Date;
  createdBy: string;
  updatedBy?: string;
}