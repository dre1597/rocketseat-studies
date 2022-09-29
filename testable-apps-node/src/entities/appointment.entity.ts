export type AppointmentEntityProps = {
  costumer: string;
  startsAt: Date;
  endsAt: Date;
}

export class AppointmentEntity {
  private props: AppointmentEntityProps;

  constructor(props: AppointmentEntityProps) {
    const {startsAt, endsAt} = props;

    if (startsAt <= new Date()) {
      throw new Error('Invalid start date');
    }

    if (endsAt <= startsAt) {
      throw new Error('Invalid end date');
    }

    this.props = props;
  }

  get costumer() {
    return this.props.costumer;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

}