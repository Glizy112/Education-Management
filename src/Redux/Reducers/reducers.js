import {
  SET_USER_INFO,
  SET_SHOW_PROFILE,
  SET_USER_ID,
  SET_USER_NAME,
  SET_SHOW_MODAL,
  SET_USER_EMAIL,
  SET_CHECKED,
  SET_USER_IMAGE,
  SET_SCHOOL_ID,
  SET_VALUE,
  SET_TEACHER_ID,
  SET_USER_DOB,
  SET_USER_ADDRESS,
  SET_USER_PHONE,
  SET_ROLE_ID,
  SET_Dowload,
  SET_DOWNLOAD,
  SET_PTM_TIME,
  SET_MPIN_TOGGLE,
  SET_TIME_TABLE,
  SET_RELOAD,
  SET_ACADEMIC_YEAR,
  SET_OTHER_INFO,
  SET_MCQS,
} from '../Actions/actions';

const initialState = {
  userid: '',
  teacherid: '',
  academicyear: '',
  roleid: '',
  schoolid: '',
  username: '',
  useremail: '',
  userimage: '',
  userinfo: '',
  userdob: '',
  useraddress: '',
  userphone: '',
  showprofile: false,
  showmodal: false,
  checked: '',
  value: null,
  download: false,
  ptmtime: '',
  isSwitchOn: false,
  timetable: [],
  otherinfo:'',
  mcqs:'',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return {...state, userid: action.payload};
    case SET_TEACHER_ID:
      return {...state, teacherid: action.payload};
    case SET_ACADEMIC_YEAR:
      return {...state, academicyear: action.payload};
    case SET_ROLE_ID:
      return {...state, roleid: action.payload};
    case SET_OTHER_INFO:
      return {...state, otherinfo: action.payload};
    case SET_SCHOOL_ID:
      return {...state, schoolid: action.payload};
    case SET_USER_NAME:
      return {...state, username: action.payload};
    case SET_USER_EMAIL:
      return {...state, useremail: action.payload};
    case SET_USER_IMAGE:
      return {...state, userimage: action.payload};
    case SET_USER_INFO:
      return {...state, userinfo: action.payload};
    case SET_SHOW_PROFILE:
      return {...state, showprofile: action.payload};
    case SET_SHOW_MODAL:
      return {...state, showmodal: action.payload};
    case SET_CHECKED:
      return {...state, checked: action.payload};
    case SET_VALUE:
      return {...state, value: action.payload};
    case SET_USER_DOB:
      return {...state, userdob: action.payload};
    case SET_USER_ADDRESS:
      return {...state, useraddress: action.payload};
    case SET_USER_PHONE:
      return {...state, userphone: action.payload};
    case SET_DOWNLOAD:
      return {...state, download: action.payload};
    case SET_PTM_TIME:
      return {...state, ptmtime: action.payload};
    case SET_MPIN_TOGGLE:
      return {...state, isSwitchOn: action.payload};
    case SET_TIME_TABLE:
      return {...state, timetable: action.payload};
    case SET_MCQS:
      return {...state, mcqs: action.payload};
    default:
      return state;
  }
}

export default userReducer;
