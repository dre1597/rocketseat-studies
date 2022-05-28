import { StudentsRepository } from '../../application/repositories';
import { Student } from '../../domain/entities';

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = [];

  async findById(id: string): Promise<Student | null> {
    const studentFound = this.items.find((student) => student.id === id);

    if (!studentFound) {
      return null;
    }

    return studentFound;
  }
}
