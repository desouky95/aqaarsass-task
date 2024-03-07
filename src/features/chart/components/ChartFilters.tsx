import { useSearchParams } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import cities from "../../../data/cities.json";
import { MdArrowDownward } from "react-icons/md";
import React, {
  Reducer,
  ReducerWithoutAction,
  useMemo,
  useReducer,
} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Select } from "../../../core/components/Select/Select";
import { Item, ItemText } from "@radix-ui/react-select";
import { FormControl } from "../../../core/components/FormControl/FormControl";
import { Button } from "../../../core/components/Button/Button";

type Filters = {
  state: string;
  "start-date": string;
};

export const ChartFilters = () => {
  const [params, setParams] = useSearchParams();

  const [filters, setFilters] = useReducer<Reducer<Filters, any>>(
    (state: Filters, action: Partial<Filters>) => {
      return { ...state, ...action };
    },
    {
      state: params.get("state") ?? "",
      "start-date": params.get("start-date") ?? "2022-01-01",
      
    }
  );

  const handleFilterChange = (name: string, value: any) => {
    params.set(name, value);
    setFilters({
      [name]: value,
    });
  };

  const applySearch = () => {
    setParams(params);
  };

  return (
    <div className="p-4 grid lg:grid-cols-6 gap-4 items-end">
      <FormControl label="المنطقة">
        <Select
          selected={cities[Number(filters.state)]}
          label="المنطقة"
          value={params.get("state") ?? undefined}
          onValueChange={(value) => handleFilterChange("state", value)}
        >
          <>
            <Item value="200">
              <ItemText>الكل</ItemText>
            </Item>
            {cities.map((city, index) => (
              <Item value={index.toString()} key={city}>
                <ItemText>{city}</ItemText>
              </Item>
            ))}
          </>
        </Select>
      </FormControl>
      <FormControl label="التاريخ">
        <Datepicker
          primaryColor="blue"
          placeholder={filters["start-date"]}
          asSingle={true}
          useRange={false}
          value={{
            startDate: new Date(filters["start-date"]) ?? "",
            endDate: null,
          }}
          onChange={(value) =>
            handleFilterChange("start-date", value?.startDate)
          }
        />
      </FormControl>
      <Button onClick={applySearch}>ابحث</Button>
    </div>
  );
};
