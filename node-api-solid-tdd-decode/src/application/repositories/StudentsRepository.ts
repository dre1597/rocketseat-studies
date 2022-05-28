import { Student } from '../../domain/entities';

export interface StudentsRepository {
  findById(id: string): Promise<Student | null>;
}
