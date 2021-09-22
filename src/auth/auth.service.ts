import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    /** Inject the config sevice to use config on this service */
    private configService: ConfigService,
  ) {
    /** Get config env variable to use */
    console.log(this.configService.get('STAGE'));
  }

  async signUp(authCrendentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCrendentialsDto);
  }

  async signIn(authCrendentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validatePassword(authCrendentialsDto);
    if (!username) throw new UnauthorizedException('Invalid username or password');

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
