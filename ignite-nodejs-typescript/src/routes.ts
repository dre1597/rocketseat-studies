import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService';

export function createCourse(request: Request, response: Response) {
  CreateCourseService.execute({
    name: 'Node JS',
    duration: 10,
    educator: 'Dani',
  });

  return response.send();
}
