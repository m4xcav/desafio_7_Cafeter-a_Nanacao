const request = require('supertest');
const server = require('../index');
const jwt = require('jsonwebtoken');

describe('Operaciones CRUD de cafes', () => {
  it('Obteniendo un status 200 y la respuesta es un array', async () => {
    const { status, body } = await request(server).get('/cafes');
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
  });

  it('Obteniendo un status 404 al eliminar un cafe que no existe', async () => {
    const response = await request(server).delete('/cafes/5563').set('Authorization', 'token');
    expect(response.status).toBe(404);
  });

  it('Agregar nuevo cafe y obtener un status 201', async () => {
    const response = await request(server).post('/cafes').send({ id: 5, nombre: 'Cafe vainilla' });
    expect(response.status).toBe(201);
  });

  it('Actualizar un cafe, obtener un status 400 por parametro diferente payload', async () => {
    const jwtToken = jwt.sign({ id: 1 }, 'secret');
    const idCafe = 5;
    const payload = jwt.verify(jwtToken, 'secret');

    if (payload.id !== idCafe) {
      const response = await request(server).put(`/cafes/${idCafe}`).set('Authorization', jwtToken);
      expect(response.status).toBe(400);
    }
  });
});