import { StorageService } from "./StorageService";
import { TokenModel } from "./models/TokenModel";

export const tokenService = new StorageService<TokenModel>("TOKEN_KEY")