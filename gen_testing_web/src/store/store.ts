import { combineReducers } from 'redux';
import { userListReducer } from '../modules/usersList/reducer';
import { genTestingInputReducer } from '../modules/genTestingInput/reducer';
import { loginReducer } from '../modules/login/reducer';
import { userCreateReducer } from '../modules/usersCreate/reducer';
import { userUpdateReducer } from '../modules/usersUpdate/reducer';
import { genTestingListReducer } from '../modules/genTestingList/reducer';
import { myTestingResultsReducer } from '../modules/myTestingResults/reducer';
import { testingListReducer } from '../modules/testingList/reducer';
import { testingCreateReducer } from '../modules/testingCreate/reducer';
import { genListReducer } from '../modules/gensList/reducer';
import { genCreateReducer } from '../modules/gensCreate/reducer';
import { genUpdateReducer } from '../modules/gensUpdate/reducer';
import { subGenTestingInputReducer } from '../modules/subGenTestingCreate/reducer';
import { patientListByDoctorReducer } from '../modules/patientListByDoctor/reducer';
import { patientUpdateReducer } from '../modules/patientUpdate/reducer';
import { patientCreateReducer } from '../modules/patientCreate/reducer';
import { patientDetailReducer } from '../modules/patientDetail/reducer';
import { patientTestingResultCreateReducer } from '../modules/patientTestingResultCreate/reducer';
import { patientTestingResultUpdateReducer } from '../modules/patientTestingResultUpdate/reducer';
import { patientTestingDetailReducer } from '../modules/listTestingResultByPatient/reducer';
import { genTestingUpdateReducer } from '../modules/genTestingUpdate/reducer';
import { genTestingListByPatientReducer } from '../modules/genTestingListByPatient/reducer'

export const rootReducer = combineReducers({
  userList: userListReducer,
  genTestingInput: genTestingInputReducer,
  login: loginReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  genTestingList: genTestingListReducer,
  myTestingResults: myTestingResultsReducer,
  gentTestingCreate: genTestingListReducer,
  testingList: testingListReducer,
  testingCreate: testingCreateReducer,
  genList: genListReducer,
  genCreate: genCreateReducer,
  genUpdate: genUpdateReducer,
  subGenTestingInput: subGenTestingInputReducer,
  patientListByDoctor: patientListByDoctorReducer,
  patientUpdate: patientUpdateReducer,
  patientCreate: patientCreateReducer,
  patientDetail: patientDetailReducer,
  patientTestingResultCreate: patientTestingResultCreateReducer,
  patientTestingResultUpdate: patientTestingResultUpdateReducer,
  patientTestingDetail: patientTestingDetailReducer,
  genTestingUpdate: genTestingUpdateReducer,
  genTestingListByPatient: genTestingListByPatientReducer,
});
