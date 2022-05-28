import { Specification } from '../../models/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from './ISpecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private readonly specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      create_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find((specification) => specification.name === name);
    return specification;
  }
}

export { SpecificationsRepository };
