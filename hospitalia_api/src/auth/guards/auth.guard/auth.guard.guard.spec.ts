import { describe } from 'node:test';
import { AuthGuardGuard } from './auth.guard.guard';

void describe('AuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuardGuard()).toBeDefined();
  });
});
