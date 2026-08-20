export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  isActive: boolean;
  details?: string;
};