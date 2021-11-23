import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const games = await this.repository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.games", "games")
      .where("users.id = :id", { id: `"${user_id}"` })
      .getOneOrFail();
    return games;
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const sql = "SELECT * FROM users ORDER BY first_name ASC";
    return this.repository.query(sql); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const sql = `SELECT * FROM users WHERE first_name ILIKE ${first_name} AND last_name ILIKE ${last_name}`;
    return this.repository.query(sql); // Complete usando raw query
  }
}
