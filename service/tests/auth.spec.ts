import bodyParser from 'body-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { addErrorHandler } from '../src/middleware/handleErrors.middleware';
import router from '../src/modules/auth/auth.route';

const app = express();
const jwtToken =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFTUE9UTzM5IiwidGltZXN0YW1wIjoiMjAyMzA4MzExMDEwIiwibG9jYXRpb25Db2RlIjoiOTc0MzkiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IuC4lOC4suC4o-C4suC4geC4suC4meC4leC5jCIsImxhc3RuYW1lIjoiLiIsInNoYXJlZFVzZXIiOiJBU1BPVE8zOSIsInVzZXJUeXBlIjoiQVNQIiwicm9sZSI6IkFTUCIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IiIsInN1YiI6IlBBUlRORVJMREFQIiwicGluQ29kZSI6IiIsImF1dGhlbnRpY2F0aW9uIjoibmV3TG9naW4iLCJsb2NhdGlvbk9ubGluZSI6IiIsImZsYWdVc2VyVHlwZSI6IlNIQVJFIiwicm9sZUFjaW0iOiJBU1AiLCJvdXRQb3NpdGlvbiI6Ik1hbmFnZXIiLCJvdXRDaG5TYWxlcyI6IkFJUyBieSBQYXJ0bmVyIiwib3V0Q2huU2FsZXNDb2RlIjoiQVNQIiwib3UiOiJQQVJUTkVSIiwiaWF0IjoxNjkzNDUxNDAyLCJleHAiOjk5OTk5OTk5OTl9.Vr05CYMEo6zUnhpFjfIKwzKjlUN9mlSa2X4CsLM4PpY';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(addErrorHandler);

describe('GET auth/refresh-token', () => {
	it('should return Status ok', async () => {
		jest.mock('axios');
		const { default: axios } = require('axios');
		axios.get.mockResolvedValue({
			status: StatusCodes.OK,
		});

		const res = await request(app).get('/refresh-token').set('x-authorization', jwtToken);

		expect(res.statusCode).toEqual(StatusCodes.OK);
	});
});
