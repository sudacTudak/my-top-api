import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { AuthDto } from './../src/auth/dto/auth.dto';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './../src/auth/auth.constants';

const existedUser: AuthDto = {
  login: 'a@a.ru',
  password: '123456',
};

const notExistedUser: AuthDto = {
  login: 'aaa@a.ru',
  password: '12345678',
};

const existedUserWrongPassword: AuthDto = {
  ...existedUser,
  password: existedUser.password + '123456',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(existedUser)
      .expect(200)
      .then(({ body }: request.Response) => {
        const jwtToken = body.access_token;
        expect(jwtToken).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - fail (user doesn`t exist)', () => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(notExistedUser)
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND_ERROR,
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - fail (wrong user`s password)', () => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(existedUserWrongPassword)
      .expect(401, {
        statusCode: 401,
        message: WRONG_PASSWORD_ERROR,
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
