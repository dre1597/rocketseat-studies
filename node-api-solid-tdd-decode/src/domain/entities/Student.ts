import { Entity } from '../../core/domain';

type TStudentsProps = {
  name: string;
  email: string;
};

export class Student extends Entity<TStudentsProps> {
  private constructor(props: TStudentsProps, id?: string) {
    super(props, id);
  }

  static create(props: TStudentsProps, id?: string) {
    return new Student(props);
  }
}
