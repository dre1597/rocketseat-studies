import { Entity } from '../../core/domain';

type TSubmissionProps = {
  challengeId: string;
  studentId: string;
  createdAt?: Date;
};

export class Submission extends Entity<TSubmissionProps> {
  private constructor(props: TSubmissionProps, id?: string) {
    super(props, id);
  }

  static create(props: TSubmissionProps, id?: string) {
    return new Submission({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    });
  }
}
