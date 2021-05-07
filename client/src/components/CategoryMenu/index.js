import React, { useEffect } from 'react';
//import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
//import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';

import { useSelector, useDispatch } from 'react-redux';
import { updateCategories, updateCurrentCategory } from './categoryMenuSlice';

function CategoryMenu() {
  // const [state, dispatch] = useStoreContext();

  // const { categories } = state;

  const { categories, currentCategory } = useSelector((state) => state.categoryMenu);
  const dispatch = useDispatch();

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  //console.log('category data: ', categoryData);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      dispatch(updateCategories(categoryData))
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(updateCategories(categories));
      });
    };
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
