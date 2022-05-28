import { Submission } from '../../domain/entities';
import { ChallengesRepository, StudentsRepository } from '../repositories';

type CreateChallengeSubmissionRequest = {
  studentId: string;
  challengeId: string;
};

export class CreateChallengeSubmission {
  constructor(
    private studentsRepository: StudentsRepository,
    private challengesRepository: ChallengesRepository
  ) {}
  async execute({ challengeId, studentId }: CreateChallengeSubmissionRequest) {
    const student = await this.studentsRepository.findById(studentId);

    if (!student) {
      throw new Error('Student does not exist');
    }

    const challenge = await this.challengesRepository.findById(challengeId);

    if (!challenge) {
      throw new Error('Challenge does not exist');
    }

    return Submission.create({
      challengeId,
      studentId,
    });
  }
}
