import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const user = req.user;
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return {
      message: 'User info from Google',
      user: req.user,
      access_token,
    };
  }

  async validateOAuthUser(oauthUser: any): Promise<any> {
    let user = await this.usersService.findOneByEmail(oauthUser.email);
    if (!user) {
      user = await this.usersService.create({
        email: oauthUser.email,
        name: oauthUser.firstName,
        password: '', // or generate a random password
        role: 'user',
      });
    }
    return user;
  }
}
