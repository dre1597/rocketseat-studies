import { ChallengesRepository } from '../../application/repositories';
import { Challenge } from '../../domain/entities';

export class InMemoryChallengesRepository implements ChallengesRepository {
  public items: Challenge[] = [];

  async findById(id: string): Promise<Challenge | null> {
    const challengeFound = this.items.find((challenge) => challenge.id === id);

    if (!challengeFound) {
      return null;
    }

    return challengeFound;
  }
}
