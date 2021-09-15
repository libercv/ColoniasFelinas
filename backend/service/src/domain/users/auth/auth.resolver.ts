import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserCredentials } from '../dto/user-credentials';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Query(() => Boolean, { name: 'signin' })
  async signInUser(@Args('userCredentials') userCredentials: UserCredentials): Promise<boolean> {
    return this.service.signIn(userCredentials);
  }
}
