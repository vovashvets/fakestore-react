import React, {ChangeEvent} from "react";
import {Button, Checkbox, FormControlLabel, FormGroup, Slider} from "@mui/material";
import './ProductsFilter.css';
import {firstSymbolCapitalize} from "../../utils/GlobalUtils";
import {useProducts} from "../../hooks/products";

interface ProductsFilterProps {
  priceRange: number | number[]
  selectedCategories: Map<string, boolean>
  handleFilters: () => void
  handleCategoryChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlePriceRangeChange: (event: Event, value: number | number[]) => void
  handleFiltersReset: () => void
}

export const ProductsFilter = (props: ProductsFilterProps) => {
  const {categories, minMaxPriceRange} = useProducts();

  return (
    <>
      <FormGroup className='category-filter'>
        <h4>Categories</h4>
        {categories?.map((category: string, index: number) =>
          <FormControlLabel
            control={
              <Checkbox
                id={category}
                onChange={props.handleCategoryChange}
                checked={!!props.selectedCategories?.get(category)}
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
        value={props.priceRange}
        min={minMaxPriceRange[0]}
        max={minMaxPriceRange[1]}
        onChange={props.handlePriceRangeChange}
        valueLabelDisplay="auto"
        step={10}
      />
      <Button
        variant="outlined"
        onClick={props.handleFilters}
      >
        Apply
      </Button>
      <Button
        onClick={props.handleFiltersReset}
      >
        Reset
      </Button>
    </>
  )
}