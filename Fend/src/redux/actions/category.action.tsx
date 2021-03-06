import { Dispatch } from 'redux';
import axios from '../../helpers/axios';
import { categoriesConstants } from './constants';

type IcategoryList = {
  categorieList: [];
};

export const getAllCategory = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: categoriesConstants.GET_ALL_CATEGORIES_REQUEST,
      payload: {},
    });

    const res = await axios.get('/category/get');
    console.log(res);

    if (res.status === 200) {
      const { categoriesList }: { categoriesList: IcategoryList } = res.data;

      dispatch({
        type: categoriesConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoriesList },
      });
    } else {
      dispatch({
        type: categoriesConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form: any) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: categoriesConstants.ADD_NEW_CATEGORY_REQUEST });
    const res = await axios.post('/category/create', form, {
      headers: {
        'Content-Type': 'application/json',

        Authorization: localStorage.getItem('token'),
      },
    });
    console.log(res.data);
    if (res.status === 200) {
      dispatch({
        type: categoriesConstants.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data },
      });

      dispatch(getAllCategory());
    } else {
      dispatch({
        type: categoriesConstants.ADD_NEW_CATEGORY_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
