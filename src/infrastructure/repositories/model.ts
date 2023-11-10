import { profileModel } from "../../modules/profiles/entities";
import { userModel } from "../../modules/users/entities";

export const models = [
    ...profileModel,
    ...userModel
  ];
   