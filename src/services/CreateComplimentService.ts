import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UserRepositories";
import { NotFound } from "../server";


interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}


class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if(user_sender === user_receiver){
      throw new Error("You can't send a compliment to yourself!");
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if(!userReceiverExists) {
      throw new NotFound("Receiving user does not exist!");
    }

    const userSenderExists = await usersRepositories.findOne(user_sender);

    if(!userSenderExists) {
      throw new NotFound("Sending user does not exist!");
    }



    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    await complimentsRepositories.save(compliment);

    return compliment;

  }

}

export { CreateComplimentService };