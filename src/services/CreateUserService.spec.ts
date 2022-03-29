import { CreateUserService } from "./CreateUserService";
import { createConnection } from "typeorm";

beforeAll(async ()=>{
  await createConnection();
});

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}
describe("Creating users", () => {
  it("Creating user should be ok", async () => {
    const createUserService = new CreateUserService();
    const userData: IUserRequest  = {
      name: "test",
      email: "test@test.com.br",
      admin: false,
      password: "1234"
    }
    const user = await createUserService.execute(userData);
    console.log(user);
    expect(user).toHaveProperty("id");

    
  });
});