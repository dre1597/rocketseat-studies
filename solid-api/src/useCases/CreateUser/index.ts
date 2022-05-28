import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { FakeUsersRepository } from "../../repositories/implementations/FakeUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProviders = new MailtrapMailProvider();
const postgresUsersRepository = new FakeUsersRepository();

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProviders
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
