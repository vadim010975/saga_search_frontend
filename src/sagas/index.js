import { takeLatest, put, spawn, debounce, retry } from "redux-saga/effects";
import { searchSkills } from "../api/index";
import {
  searchSkillsRequest,
  changeSearchField,
  searchSkillsSuccess,
  searchSkillsFailure,
  clearList,
} from "../slices/skills.js";

function filterChangeSearchAction({ type}) {
  return type === changeSearchField().type;
}

// worker
function* handleChangeSearchSaga(action) {
  if (action.payload.search.trim() != "") {
    yield put(searchSkillsRequest(action.payload.search)); // dispatch({ type: '', payload: '' })
  } else {
    yield put(clearList());
  }
}

// watcher
function* watchChangeSearchSaga() {
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga);
}

// worker
function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000; // ms
    const data = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload
    );
    // const data = yield call(searchSkills, action.payload);
    yield put(searchSkillsSuccess(data)); // dispatch
  } catch (e) {
    yield put(searchSkillsFailure(e.message)); // dispatch
  }
}

// watcher
function* watchSearchSkillsSaga() {
  yield takeLatest(searchSkillsRequest().type, handleSearchSkillsSaga);
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}
