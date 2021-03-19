import { AuthenticationData, ImageInputDTO } from "./entities/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";
import { IdGenerator } from "./services/Idgenerator";
import { getCreatedDate } from "./services/getCreateDate";

export class ImageBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private authenticator: Authenticator,
      private imageDatabase: ImageDatabase,
   ) { }

   async registryImage(image: ImageInputDTO, authorization: string | undefined) {

      const tokenData: AuthenticationData = this.authenticator.getData(authorization!)

      if (!tokenData) {
         throw new CustomError(403, "Invalid Token")
      }

            console.log(image.subtitle)
            console.log(image.author)
            console.log(image.tags)
            console.log(image.file)
            console.log(image.collection)
      if (
         !image.subtitle ||
         !image.author ||
         !image.tags ||
         !image.file ||
         !image.collection
     ) {
      throw new CustomError(400, "'subtitle', 'author', 'tags', 'file' and 'collection' must be informed!");
     }

      const id = this.idGenerator.generate();

      const date = getCreatedDate(1)

      await this.imageDatabase.registryImage(
         id,
         image.subtitle,
         image.author,
         date,
         image.tags,
         image.file,
         image.collection
      );

      return "Registry Done!";
   }

   async getImageById(id: string, authorization: string | undefined) {

      const tokenData: AuthenticationData = this.authenticator.getData(authorization!)

      if (!tokenData) {
         throw new CustomError(403, "Invalid Token")
      }

      const image = await this.imageDatabase.getImageById(id);

      if (!image) {
         throw new CustomError(404, "Image Not Found!");
      }

      return image;
   }

   async getAllImages(authorization: string | undefined) {

      const tokenData: AuthenticationData = this.authenticator.getData(authorization!)

      if (!tokenData) {
         throw new CustomError(403, "Invalid Token")
      }

      const images = await this.imageDatabase.getAllImages();

      if (!images) {
         throw new CustomError(404, "Image Not Found!");
      }

      return images;
   }
   
   //   async deleteImageById(authorization: string | undefined) {

   //    const tokenData: AuthenticationData = this.authenticator.getData(authorization!)

   //    if (!tokenData) {
   //       throw new CustomError(403, "Invalid Token")
   //    }

   //    const images = await this.imageDatabase.getAllImages();

   //    if (!images) {
   //       throw new CustomError(404, "Image Not Found!");
   //    }

   //    return images;
   // }
}