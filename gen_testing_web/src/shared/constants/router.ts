import { TestingList } from '../../modules/testingList';
import { GenTestingInput } from '../../modules/genTestingInput';
import { GenTestingList } from '../../modules/genTestingList';
import { MyTestingResults } from '../../modules/myTestingResults';
import { UserCreate } from '../../modules/usersCreate';
import { UserList } from '../../modules/usersList';
import { UserUpdate } from '../../modules/usersUpdate';
import { GenTestingCreate } from '../../modules/testingCreate'
import { GenList } from '../../modules/gensList';
import { GenCreate } from '../../modules/gensCreate';
import { GenUpdate } from '../../modules/gensUpdate';
import { subGenTestingInputReducer } from '../../modules/subGenTestingCreate/reducer';
import { PatientList } from '../../modules/patientListByDoctor';
import { PatientCreate } from '../../modules/patientCreate';
import { PatientUpdate } from '../../modules/patientUpdate';
import { PatientDetail } from '../../modules/patientDetail';
import { PatientTestingResultCreate } from '../../modules/patientTestingResultCreate';
import { PatientTestingResultUpdate } from '../../modules/patientTestingResultUpdate';
import { PatientTestingResultDetail } from '../../modules/listTestingResultByPatient';
import { GenTestingUpdate } from '../../modules/genTestingUpdate';
import { GenTestingListByPatient } from '../../modules/genTestingListByPatient';

export const routes = [
  {
    path: '/users',
    component: UserList,
    exact: true,
  },
  {
    path: '/users/create',
    component: UserCreate,
    exact: true,
  },
  {
    path: '/users/:id/update',
    component: UserUpdate,
    exact: true,
  },
  {
    path: '/gen_testing/:id/results/input',
    component: GenTestingInput,
    exact: true,
  },
  {
    path: '/gen_testing/:id/results',
    component: GenTestingList,
    exact: true,
  },
  {
    path: '/gen_testing/:testingId/results/:id',
    component: MyTestingResults,
    exact: true,
  },
  {
    path: '/gen_testing/create',
    component: GenTestingCreate,
    exact: true,
  },
  {
    path: '/gen_testing',
    component: TestingList,
    exact: true,
  },
  {
    path: '/gens',
    component: GenList,
    exact: true,
  },
  {
    path: '/gens/:id',
    component: GenUpdate,
    exact: true,
  },
  {
    path: '/gens/create',
    component: GenCreate,
    exact: true,
  },
  {
    path: '/gen_testing/:id/sub_testing/create',
    component: subGenTestingInputReducer,
    exact: true,
  },
  {
    path: '/patients',
    component: PatientList,
    exact: true,
  },
  {
    path: '/patients/create',
    component: PatientCreate,
    exact: true,
  },
  {
    path: '/patients/:id/update',
    component: PatientUpdate,
    exact: true,
  },
  {
    path: '/patients/:id/detail',
    component: PatientDetail,
    exact: true,
  },
  {
    path: '/patients/:id/testing_results/create',
    component: PatientTestingResultCreate,
    exact: true,
  },
  {
    path: '/patients/:id/testing_results/:testingResultId/list',
    component: GenTestingListByPatient,
    exact: true,
  },
  {
    path: '/patients/:id/testing_results/:testingResultId/update/:subTestingId',
    component: PatientTestingResultUpdate,
    exact: true,
  },
  {
    path: '/patients/my_result/:id',
    component: MyTestingResults,
    exact: true,
  },
  {
    path: '/patients/my_result',
    component: PatientTestingResultDetail,
    exact: true,
  },
  {
    path: '/gen_testing/:testingId/results/:id/update',
    component: GenTestingUpdate,
    exact: true,
  },

];
