import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import * as request from 'supertest';

// UserController
describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const modelFix: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modelFix.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterEach(async () => {
    await dataSource.query('DELETE FROM "users"');
  });

  afterAll(async () => {
    await app.close();
  });

  // CREATE user
  it('/users (POST) creates a user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'ali@gmail.com', password: 'ali123' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('ali@gmail.com');
    expect(res.body.password).toBe('ali123');
  });

  // GET ALL users
  it('/users (GET) get all users', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'ali@gmail.com', password: 'ali123' });
    const res = await request(app.getHttpServer()).get('/users').expect(200);

    expect(res.body.length).toBe(1);
    expect(res.body[0].email).toBe('ali@gmail.com');
    expect(res.body[0].password).toBe('ali123');
  });

  // GET user BY ID
  it('/users/:id (GET) get user by id', async () => {
    const post = await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'ali@gmail.com', password: 'ali123' });

    const id = post.body.id;
    const res = await request(app.getHttpServer())
      .get(`/users/${id}`)
      .expect(200);

    expect(res.body.email).toBe('ali@gmail.com');
    expect(res.body.password).toBe('ali123');
  });

  // UPDATE user BY ID
  it('/users/:id (PATCH) update user by id', async () => {
    const post = await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'ali@gmail.com', password: 'ali123' });

    const id = post.body.id;
    const updated = await request(app.getHttpServer())
      .patch(`/users/${id}`)
      .send({ email: 'vali@gmail.com', password: 'vali123' })
      .expect(200);

    expect(updated.body.email).toBe('vali@gmail.com');
    expect(updated.body.password).toBe('vali123');
  });

  // DELETE user BY ID
  it('/users/:id (DELETE) delete user by id ', async () => {
    const post = await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'ali@gmail.com', password: 'ali123' });

    const id = post.body.id;
    await request(app.getHttpServer()).delete(`/users/${id}`).expect(200);
    await request(app.getHttpServer()).get(`/users/${id}`).expect(404);
  });
});

// PostController
describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const modelFix: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modelFix.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterEach(async () => {
    await dataSource.query('DELETE FROM "posts"');
  });

  afterAll(async () => {
    await app.close();
  });

  // CREATE post
  it('/posts (POST) creates a post', async () => {
    const res = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'post', content: 'posts' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('post');
    expect(res.body.content).toBe('posts');
  });

  // GET ALL posts
  it('/posts (GET) get all posts', async () => {
    await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'post', content: 'posts' });
    const res = await request(app.getHttpServer()).get('/posts').expect(200);

    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('post');
    expect(res.body[0].content).toBe('posts');
  });

  // GET post BY ID
  it('/posts/:id (GET) get post by id', async () => {
    const post = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'post', content: 'posts' });

    const id = post.body.id;
    const res = await request(app.getHttpServer())
      .get(`/posts/${id}`)
      .expect(200);

    expect(res.body.title).toBe('post');
    expect(res.body.content).toBe('posts');
  });

  // UPDATE post BY ID
  it('/posts/:id (PATCH) update post by id', async () => {
    const post = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'post', content: 'posts' });

    const id = post.body.id;
    const updated = await request(app.getHttpServer())
      .patch(`/posts/${id}`)
      .send({ title: 'post', content: 'posts' })
      .expect(200);

    expect(updated.body.title).toBe('post');
    expect(updated.body.content).toBe('posts');
  });

  // DELETE post BY ID
  it('/posts/:id (DELETE) delete post by id ', async () => {
    const post = await request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'post', content: 'posts' });

    const id = post.body.id;
    await request(app.getHttpServer()).delete(`/posts/${id}`).expect(200);
    await request(app.getHttpServer()).get(`/posts/${id}`).expect(404);
  });
});
