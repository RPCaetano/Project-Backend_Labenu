import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

   private static TABLE_NAME = "fullstack_users";

   private static toUserModel(user: any): User {
      return new User(
         user.id,
         user.name,
         user.nickname,
         user.email,
         user.password,
        
         
      );
      }

   public async createUser(
      id: string,
      name: string,
      nickname:string,
      email: string,
      password: string,
       ): Promise<void> {
      try {
         await BaseDatabase.connection
            .insert({
               id,
               name,
               nickname,
               email,
               password,
               
            })
            .into(UserDatabase.TABLE_NAME);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getUserByEmail(email: string): Promise<User> {
      try {
         const result = await BaseDatabase.connection
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email });

         return UserDatabase.toUserModel(result[0]);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }
}