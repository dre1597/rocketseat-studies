import { Challenge, Student } from '../../domain/entities';
import { InMemoryChallengesRepository } from '../../tests/repositories/InMemoryChallengesRepository';
import { InMemoryStudentsRepository } from '../../tests/repositories/InMemoryStudentsRepository';
import { CreateChallengeSubmission } from './CreateChallengeSubmission';

describe('Create challenge submission use case', () => {
  test('should be able to create a new challenge submission', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const challengesRepository = new InMemoryChallengesRepository();

    const student = Student.create({
      name: 'any_name',
      email: 'any_email@email.com',
    });

    const challenge = Challenge.create({
      instructionsUrl: 'any_url',
      title: 'any_title',
    });

    studentsRepository.items.push(student);
    challengesRepository.items.push(challenge);

    const sut = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository
    );

    const response = sut.execute({
      studentId: student.id,
      challengeId: challenge.id,
    });

    expect(response).toBeTruthy();
  });
});
