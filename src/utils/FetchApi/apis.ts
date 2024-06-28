import { CondOperator, RequestQueryBuilder } from '@dataui/crud-request';

const host = 'http://localhost:5001';

export const apis = {
  register: `${host}/admin/register`,
  login: `${host}/admin/login`,
  getAllExercise: (queries: any) => {
    const query = RequestQueryBuilder.create({
      page: queries.page,
      limit: queries.limit,
    }).query(true);
    return `${host}/exercise/all?${query}`;
  },
  getAllMuscleGroups: `${host}/exercise/muscle_group/all`,
  getMuscleGroups: (id: string) => `${host}/exercise/muscle_group/${id}`,
  uploadFile: `${host}/upload`,
  createMuscleGroup: `${host}/exercise/muscle_group/create`,
  deleteMuscleGroup: `${host}/exercise/muscle_group/delete`,
  editMuscleGroup: `${host}/exercise/muscle_group/edit`,
  createExercise: `${host}/exercise/create`,
  getExercise: (id: string) => `${host}/exercise/get/${id}`,
  editExercise: `${host}/exercise/edit`,
  deleteExercise: `${host}/exercise/delete`,
  getAllSet: (queries: any) => {
    const query = RequestQueryBuilder.create({
      page: queries.page,
    }).query(true);
    return `${host}/set/all?${query}`;
  },
  createSet: `${host}/set/create`,
  editSet: `${host}/set/edit`,
  getSet: (id: string) => `${host}/set/get/${id}`,
  getSchedule: (id: string) => `${host}/schedule/${id}`,
  getAllSchedule: (queries: any) => {
    const query = RequestQueryBuilder.create({
      page: queries.page,
      limit: queries.limit,
    }).query(true);
    return `${host}/schedule/all?${query}&filter={"createdBy":{"$eq":"Admin"}}`;
  },
  createSchedule: `${host}/schedule/create`,
  editSchedule: `${host}/schedule/edit`,
  getAllFood: (queries: any) => {
    const query = RequestQueryBuilder.create({
      page: queries.page,
    }).query(true);
    return `${host}/food/all?${query}`;
  },
  getAllNutrition: `${host}/food/nutrition/all`,
};
