import { Challenge } from '../../domain/entities';

export interface ChallengesRepository {
  findById(id: string): Promise<Challenge | null>;
}
