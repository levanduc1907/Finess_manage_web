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

export type TSchedule = {
  name: string;
  imageUrl?: string;
  type: 'Weekly' | 'Cyclic';
  createdBy: 'User' | 'Admin';
  createdById: string;
  week?: {
    Monday?: TSetItem[];
    Tuesday?: TSetItem[];
    Wednesday?: TSetItem[];
    Thursday?: TSetItem[];
    Friday?: TSetItem[];
    Saturday?: TSetItem[];
    Sunday?: TSetItem[];
  };
  days?: {
    dayNumber: number;
    sets: TSetItem[];
  }[];
  repeatAfterDays?: number;
};

export type TCreateSchedule = {
  id?: string;
  name: string;
  imageUrl?: string;
  type: 'Weekly' | 'Cyclic';
  week?: {
    Monday?: string[];
    Tuesday?: string[];
    Wednesday?: string[];
    Thursday?: string[];
    Friday?: string[];
    Saturday?: string[];
    Sunday?: string[];
  };
  days?: {
    dayNumber: number;
    sets: string[];
  }[];
  repeatAfterDays?: number;
};

export const foodCategories = [
  'Fruit',
  'Vegetable',
  'Meat&Fish',
  'Dairy',
  'Grain',
  'Sweets',
  'Other',
] as const;
export type TFoodCategory = (typeof foodCategories)[number];

// Define an enum for measure units
export const measureUnits = ['kg', 'liter'] as const;
export type TMeasureUnit = (typeof measureUnits)[number];

export type TNutrition = {
  _id: string;
  name: string;
  calories: number;
};

export type TFood = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: TFoodCategory;
  measureUnit: TMeasureUnit;
  nutritions: {
    nutrition: TNutrition;
    quantity: number;
    _id: string;
  }[];

  caloriesPerUnit: number;
  createdAt: string;
  updatedAt: string;
  id: string;
};
