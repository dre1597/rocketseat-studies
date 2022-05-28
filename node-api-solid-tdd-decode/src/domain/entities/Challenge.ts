import { Entity } from '../../core/domain';

type TChallengeProps = {
  title: string;
  instructionsUrl: string;
};

export class Challenge extends Entity<TChallengeProps> {
  private constructor(props: TChallengeProps, id?: string) {
    super(props, id);
  }

  static create(props: TChallengeProps, id?: string) {
    return new Challenge(props);
  }
}
