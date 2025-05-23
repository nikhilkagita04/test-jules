import { describe, it, expect } from 'vitest';
import { login, signup } from './authService';

describe('authService', () => {
  describe('login', () => {
    it('should return a mock user object on successful login', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = await login(email, password);
      
      expect(user).toBeDefined();
      expect(user.id).toBe('1');
      expect(user.name).toBe('Test User');
      expect(user.email).toBe(email);
    });
  });

  describe('signup', () => {
    it('should return a mock user object on successful signup', async () => {
      const name = 'New User';
      const email = 'newuser@example.com';
      const password = 'newpassword123';
      const user = await signup(name, email, password);
      
      expect(user).toBeDefined();
      expect(user.id).toBe('1'); // Mock service always returns '1' for now
      expect(user.name).toBe(name);
      expect(user.email).toBe(email);
    });
  });
});
