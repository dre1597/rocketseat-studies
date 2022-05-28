import { prisma } from '../../prisma';
import { LessonsRepository, CreateLessonData } from '../LessonsRepository';

export class PrismaLessonsRepository implements LessonsRepository {
  async create(data: CreateLessonData) {
    await prisma.lesson.create({
      data,
    });
  }
}
