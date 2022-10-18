import React, {useEffect, useState} from "react";
import {Button, Checkbox, FormControlLabel, FormGroup, Slider} from "@mui/material";
import {getFakeCategories} from "../../api/fakestore/FakeStoreServise";
import './CategoryFilter.css';
import {firstSymbolCapitalize} from "../../utils/GlobalUtils";
import {useProducts} from "../../hooks/products";

export const CategoryFilter = () => {
  const [categories, setCategories] = useState<[]>([]);
  const {minMaxPriceRange} = useProducts();
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    let categoriesMap = new Map();
    getFakeCategories()
      .then((data) => {
        setCategories(data);
        data?.forEach((category: string) => {
          categoriesMap.set(category, false)
        })
        setSelectedCategories(categoriesMap);
      })
  }, [])

  const handlePriceRangeChange = (event: any, value: any) => {
    setPriceRange(value);
  }

  const handleSubmit = () => {

  }

  const handleReset = () => {
    setPriceRange([0, 0]);
    // selectedCategories?.set('electronics', false)
    // setSelectedCategories(selectedCategories);
  }

  const handleCategoryChange = (event: any, value: any) => {
    let update = selectedCategories;

    if (update?.get(event.target.id)) {
      update?.set(event.target.id, false);
    } else {
      update?.set(event.target.id, true);
    }

    setSelectedCategories(update);

    // if (value) {
    //   setSelectedCategories(prev => [...prev, event.target.id]);
    // } else {
    //   let filteredArr = selectedCategories.filter(v => v !== event.target.id)
    //   setSelectedCategories(filteredArr);
    // }
  }

  return (
    <>
      <FormGroup className='category-filter'>
        <h4>Categories</h4>
        {categories?.map((category: string, index: number) =>
          <FormControlLabel
            control={
              <Checkbox
                id={category}
                onChange={handleCategoryChange}
                checked={selectedCategories?.get(category)}
              />
            }
            label={firstSymbolCapitalize(category)}
            key={index + category}
          />
        )}
      </FormGroup>
      <h4>Price</h4>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={priceRange}
        min={minMaxPriceRange[0]}
        max={minMaxPriceRange[1]}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        step={10}
      />
      <Button
        variant="outlined"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button
        onClick={handleReset}
      >
        Reset
      </Button>
    </>
  )
}