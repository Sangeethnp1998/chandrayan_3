const app = require('../app');
const request = require('supertest');



describe('Spacecraft Control API', () => {
    test('should move forward, rotate, move upward, move backward, and rotate correctly', async () => {
      const response = await request(app)
        .post('/spacecraft/send-commands')
        .send({ commands: ["f", "r", "u", "b", "l"] });
  
      expect(response.status).toBe(200);
      expect(response.body.finalPosition).toEqual({ x: 0, y: 1, z: -1 });
      expect(response.body.finalDirection).toBe('N');
    });
  
    test('should give output for multiple Forward and Backward movements', async () => {
        const response = await request(app)
          .post('/spacecraft/send-commands')
          .send({ commands: ["f", "f", "b", "f", "b"] });
    
        expect(response.status).toBe(200);
        expect(response.body.finalPosition).toEqual({ x: 0, y: 1, z: -1 });
        expect(response.body.finalDirection).toBe('N');
      });
    
  });