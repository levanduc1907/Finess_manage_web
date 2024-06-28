import { LocalAccountService } from '../modules';
import { CheckLogic } from '../resources';
import { apis } from './apis';
import {
  TCreateExercise,
  TCreateMuscleGroup,
  TCreateSchedule,
  TCreateSetBody,
  TExercise,
  TFetchBaseOutput,
  TFood,
  TMuscleGroup,
  TNutrition,
  TPagingResponse,
  TSchedule,
  TSetItem,
} from './types';

const CommonCall = async <T>(
  api: RequestInfo,
  init: RequestInit = {},
): Promise<TFetchBaseOutput<T>> => {
  const account = LocalAccountService.get();
  console.log('locla', account);
  try {
    let headers: Headers | [string, string][] | { [key: string]: string } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (init) {
      //overide Content-type
      headers = {
        ...headers,
        ...init.headers,
      };
    }
    if (account?.token && typeof api === 'string') {
      headers = {
        ...headers,
        Authorization: account.token,
      };
    }
    const apiInit = { ...init, headers };
    const response = await fetch(api, apiInit);

    const result = await response.json();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === CheckLogic.No_internet) {
      throw new Error('No internet');
    }
    throw error;
  }
};

export const FetchApi = {
  login: async (body: any) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await fetch(apis.login, apiInit);
    return res;
  },

  register: async (body: any) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return fetch(apis.register, apiInit);
  },

  getAllExercise: async (query: { page?: number; limit?: number }) => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await CommonCall<TPagingResponse<TExercise[]>>(
      apis.getAllExercise(query),
      apiInit,
    );
    return res;
  },

  getMuscleGroup: async (id: string) => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await CommonCall<TMuscleGroup>(
      apis.getMuscleGroups(id),
      apiInit,
    );
    return res;
  },

  getAllMuscleGroup: async () => {
    const apiInit: RequestInit = {
      method: 'GET',
    };

    const res = await CommonCall<TMuscleGroup[]>(
      apis.getAllMuscleGroups,
      apiInit,
    );
    return res;
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    const account = LocalAccountService.get();
    formData.append('file', file);

    console.log(file, 'fffff');
    const apiInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: account.token!,
      },
      body: formData,
    };
    const response = await fetch(apis.uploadFile, apiInit);

    const result = await response.json();

    return result;
  },

  createMuscleGroup: (body: TCreateMuscleGroup) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall<TMuscleGroup>(apis.createMuscleGroup, apiInit);
  },

  deleteMuscleGroup: (body: { id: string }) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall(apis.deleteMuscleGroup, apiInit);
  },

  editMuscleGroup: (body: TCreateMuscleGroup & { id: string }) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall<TMuscleGroup>(apis.editMuscleGroup, apiInit);
  },
  createExercise: (body: TCreateExercise) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall<TMuscleGroup>(apis.createExercise, apiInit);
  },

  getExercise: async (id: string) => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await CommonCall<TExercise>(apis.getExercise(id), apiInit);
    return res;
  },
  editExercise: (body: TCreateExercise & { id: string }) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall<TExercise>(apis.editExercise, apiInit);
  },

  deleteExercise: (body: { id: string }) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall(apis.deleteExercise, apiInit);
  },

  getAllSet: async (query: { page: number }) => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await CommonCall<TPagingResponse<TSetItem[]>>(
      apis.getAllSet(query),
      apiInit,
    );
    return res;
  },
  createSet: (body: TCreateSetBody) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall<TSetItem>(apis.createSet, apiInit);
  },
  editSet: (body: TCreateSetBody & { id: string }) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    console.log('bodyyyyyy', body);
    return CommonCall<TSetItem>(apis.editSet, apiInit);
  },
  getSet: async (id: string) => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await CommonCall<TSetItem>(apis.getSet(id), apiInit);
    return res;
  },
  getAllSchedule: async (query: { page?: number; limit?: number }) => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    console.log(apis.getAllSchedule(query));
    const res = await CommonCall<TPagingResponse<TSchedule[]>>(
      apis.getAllSchedule(query),
      apiInit,
    );
    return res;
  },
  getSchedule: async (id: string) => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await CommonCall<TSchedule>(apis.getSchedule(id), apiInit);
    return res;
  },

  createSchedule: (body: TCreateSchedule) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall<TSchedule>(apis.createSchedule, apiInit);
  },
  editSchedule: (body: TCreateSchedule) => {
    const apiInit: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    return CommonCall<TSchedule>(apis.editSchedule, apiInit);
  },
  deleteSchedule: (body: { id: string }) => {
    const apiInit: RequestInit = {
      method: 'DELETE',
    };

    return CommonCall(apis.getSchedule(body.id), apiInit);
  },
  getAllFood: async (query: { page?: number; limit?: number }) => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await CommonCall<TPagingResponse<TFood[]>>(
      apis.getAllFood(query),
      apiInit,
    );
    return res;
  },
  getAllNutrition: async () => {
    const apiInit: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res = await CommonCall<TPagingResponse<TNutrition[]>>(
      apis.getAllNutrition,
      apiInit,
    );
    return res;
  },
};
