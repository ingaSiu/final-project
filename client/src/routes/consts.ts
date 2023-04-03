import AddQuestion from '../pages/AddQuestion/AddQuestion';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MainLayout from '../layout/MainLayout';
import QuestionPage from '../pages/QuestionPage/QuestionPage';
import Register from '../pages/Register/Register';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const QUESTION_PAGE_PATH = '/question/:id';
export const ADD_QUESTION_PATH = '/addquestion';

export const mainLayoutRoutes = {
  Layout: MainLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: QUESTION_PAGE_PATH, Component: QuestionPage },
    { path: ADD_QUESTION_PATH, Component: AddQuestion },
    { path: REGISTER_PATH, Component: Register },
    { path: LOGIN_PATH, Component: Login },
  ],
};
