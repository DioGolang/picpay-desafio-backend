import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindByEmailStrategy } from '../../../@core/entities/strategies/find-by-email/find-by-email.strategy';
import { User } from '../../../@core/entities/user.entity';
import { Store } from '../../../@core/entities/store.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userFindByEmailStrategy: FindByEmailStrategy<User>;
  let storeFindByEmailStrategy: FindByEmailStrategy<Store>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UserFindByEmailStrategy',
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: 'StoreFindByEmailStrategy',
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userFindByEmailStrategy = module.get<FindByEmailStrategy<User>>('UserFindByEmailStrategy');
    storeFindByEmailStrategy = module.get<FindByEmailStrategy<Store>>('StoreFindByEmailStrategy');
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validate', () => {
    it('should validate user by email and password', async () => {
      const user = { email: 'test@example.com', verifyPassword: jest.fn().mockResolvedValue(true) } as unknown as User;
      (userFindByEmailStrategy.findByEmail as jest.Mock).mockResolvedValue(user);

      const result = await authService.validate('test@example.com', 'password');

      expect(result).toBe(user);
      expect(user.verifyPassword).toHaveBeenCalledWith('password');
    });

    it('should validate store by email and password', async () => {
      const store = { email: 'store@example.com', verifyPassword: jest.fn().mockResolvedValue(true) } as unknown as Store;
      (userFindByEmailStrategy.findByEmail as jest.Mock).mockResolvedValue(null);
      (storeFindByEmailStrategy.findByEmail as jest.Mock).mockResolvedValue(store);

      const result = await authService.validate('store@example.com', 'password');

      expect(result).toBe(store);
      expect(store.verifyPassword).toHaveBeenCalledWith('password');
    });

    it('should return null if email not found', async () => {
      (userFindByEmailStrategy.findByEmail as jest.Mock).mockResolvedValue(null);
      (storeFindByEmailStrategy.findByEmail as jest.Mock).mockResolvedValue(null);

      const result = await authService.validate('nonexistent@example.com', 'password');

      expect(result).toBeNull();
    });
  });

  describe('generateToken', () => {
    it('should generate JWT token for user', () => {
      const user = { email: 'test@example.com', id: '1' } as User;
      const token = 'jwt-token';
      (jwtService.sign as jest.Mock).mockReturnValue(token);

      const result = authService.generateToken(user);

      expect(result).toBe(token);
      expect(jwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
    });

    it('should generate JWT token for store', () => {
      const store = { email: 'store@example.com', id: '2' } as Store;
      const token = 'jwt-token';
      (jwtService.sign as jest.Mock).mockReturnValue(token);

      const result = authService.generateToken(store);

      expect(result).toBe(token);
      expect(jwtService.sign).toHaveBeenCalledWith({ email: store.email, sub: store.id });
    });

    it('should throw an error if user or store is not found', () => {
      expect(() => authService.generateToken(null)).toThrow(HttpException);
    });
  });
});
