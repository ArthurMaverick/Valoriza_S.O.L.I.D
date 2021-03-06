import { AddUser, CreateUser } from '../../domain/usecases'
import {
  AddId,
  Hasher,
  AddAccountRepository,
  FindUserAccountRepository,
  CheckAccountByEmailRepository
} from '../rules/db'

export class DbAddUser implements CreateUser {
  constructor (
      private readonly addId: AddId,
      private readonly hasher: Hasher,
      private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
      private readonly addAccountRepository: AddAccountRepository,
      private readonly findAccountRepository: FindUserAccountRepository
  ) {}

  async createUser (incompleteUser: AddUser.Params): Promise<AddUser.User> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(incompleteUser.email)

    if (!exists) {
      const uuid = this.addId.uuid()
      const passwordHasher = await this.hasher.hash(incompleteUser.password)
      const completeUser = { ...incompleteUser, id: uuid, password: passwordHasher }
      await this.addAccountRepository.addUser(completeUser)
      const user = await this.findAccountRepository.findUserById(uuid)
      return user
    }

    return exists && false
  }
}
