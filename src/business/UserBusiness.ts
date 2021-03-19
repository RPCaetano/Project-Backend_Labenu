import { UserDatabase } from "../data/UserDatabase";
import { LoginInputDTO, UserInputDTO } from "./entities/User";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/Idgenerator";

export class UserBusiness {

  constructor(
     private idGenerator: IdGenerator,
     private hashManager: HashManager,
     private authenticator: Authenticator,
     private userDatabase: UserDatabase,
  ) { }

  async createUser(user: UserInputDTO) {

     const id = this.idGenerator.generate();

     const hashPassword = await this.hashManager.hash(user.password);

     await this.userDatabase.createUser(
        id,
        user.name,
        user.nickname,
        user.email,
        hashPassword,
        
     );

     const accessToken = this.authenticator.generateToken({
        id,
            
     });

     return accessToken;
  }

  async getUserByEmail(user: LoginInputDTO) {

     const userFromDB = await this.userDatabase.getUserByEmail(user.email);

     const passwordIsCorrect = await this.hashManager.compare(
        user.password,
        userFromDB.password
     );

     const accessToken = this.authenticator.generateToken({
        id: userFromDB.id,
     });

     if (!passwordIsCorrect) {
        throw new CustomError(401, "Invalid credentials!");
     }

     return accessToken;
  }
}


