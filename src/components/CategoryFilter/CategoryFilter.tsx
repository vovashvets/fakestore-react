import React, {useEffect, useState} from "react";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {getFakeCategories} from "../../api/fakestore/FakeStoreServise";
import './CategoryFilter.css';

export const CategoryFilter = () => {
  const [categories, setCategories] = useState<[]>();

  useEffect(() => {
    getFakeCategories().then((data) => {setCategories(data)});
  }, [])

  return (
    <>
      <FormGroup className='category-filter'>
        <h4>Categories</h4>
        {categories?.map((category: string, index: number) =>
          <FormControlLabel
            control={<Checkbox />}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
            key={index}
          />
        )}
      </FormGroup>
    </>
  )
}