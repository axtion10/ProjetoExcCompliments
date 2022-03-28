import { Request, Response } from "express";
import { IUserAdmin } from "../domain/requestDto";
import { ListUsersService } from "../services/ListUsersService";


class ListUsersController {
  async handle(request: Request, response: Response) {
    const filters: IUserAdmin = request.query;
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute(filters);
    return response.json(users);
  }

}

export { ListUsersController };