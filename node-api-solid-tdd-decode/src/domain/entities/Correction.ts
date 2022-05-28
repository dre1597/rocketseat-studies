import { Entity } from '../../core/domain';

type TCorrectionProps = {
  grade: number;
  submissionId: string;
  createdAt: Date;
};

export class Correction extends Entity<TCorrectionProps> {
  private constructor(props: TCorrectionProps, id?: string) {
    super(props, id);
  }

  static create(props: TCorrectionProps, id?: string) {
    return new Correction(props);
  }
}
