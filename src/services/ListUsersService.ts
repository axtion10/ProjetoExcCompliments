import { getCustomRepository } from "typeorm";
import { IUserAdmin, IUserDbFilter, UserType } from "../domain/requestDto";
import { UsersRepositories } from "../repositories/UserRepositories";


class ListUsersService {
  async execute(filters: IUserAdmin) {
    const hasFilter = JSON.stringify(filters) !== '{}';
    const usersRepositories = getCustomRepository(UsersRepositories);
    if (hasFilter) {
      console.log(filters);
      const usersv2 = await usersRepositories.find({
        where: getAdminFilter(filters)
      });
      return usersv2;
    }
    const usersFinal = await usersRepositories.find();
    return usersFinal;
  }


}

function getAdminFilter(filter: IUserAdmin) {
  const queryFilter: IUserDbFilter = {}
  if (filter.name !== undefined) {
    queryFilter.name = filter.name;
  }
  if (filter.userType !== undefined) {
    queryFilter.admin = filter.userType === UserType.admin
  }
  return queryFilter;
}

export { ListUsersService };