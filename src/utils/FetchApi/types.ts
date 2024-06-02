export type TFetchBaseOutput<T> = {
  data: T;
  message: string;
  code: string;
};

export type TPagingResponse<T> = {
  data: T;
  total: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type TMuscleGroup = {
  _id: string;
  imageUrl: string;
  name: string;
  description: string;
};

export type TCreateMuscleGroup = {
  image: string;
  name: string;
  description: string;
};
export type TExercise = {
  _id: string;
  type: 'rep' | 'time';
  imageUrl: string;
  muscleGroups: string[];
  videoUrl: string;
  name: string;
  description: string;
  caloriesPerUnit: number;
};

export type TCreateExercise = {
  image: string;
  name: string;
  type: 'rep' | 'time';
  muscleGroups: string[];
  description: string;
  video: string;
};

export type TSetItem = {
  _id: string;
  name: string;
  type: string;
  description: string;
  totalTimes: number;
  totalCalories: number;
  imageUrl: string;
  exercises: {
    exercise: TExercise;
    quantity: number;
    time: number;
    _id: string;
  }[];
};

export type TCreateSetBody = {
  _id?: string;
  name: string;
  type: string;
  description: string;
  totalTimes: number;
  totalCalories: number;
  imageUrl: string;
  exercises: {
    exercise: string;
    quantity: number;
    time: number;
  }[];
};
