"use client";
import { Dispatch, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import data from "../public/data.json";
import { countryProps } from "@/types";
interface SearchBarProps {
  dark: boolean;
  selected: string;
  setSelected: Dispatch<React.SetStateAction<string>>;
}
const SearchBar = ({ dark, selected, setSelected }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const filteredPeople =
    query === ""
      ? data
      : data.filter((country) =>
          country.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="mt-[22px] mx-8 w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div
            className={`relative w-full cursor-default overflow-hidden rounded-lg ${
              dark ? " bg-gray-700" : "bg-white"
            } text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}
          >
            <Combobox.Input
              className={`w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 ${
                dark ? " bg-gray-700" : "bg-white"
              }
              ${dark ? "text-white" : "text-black"}
              `}
              placeholder="Search for a country..."
              displayValue={(country: countryProps) => country.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md ${
                dark ? " bg-gray-700" : "bg-white"
              } py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
            >
              {filteredPeople.length === 0 && query !== "" ? (
                <div
                  className={`${dark ? " bg-gray-700" : "bg-white"}
                  ${dark ? "text-white" : "text-black"}
                  relative cursor-default select-none py-2 px-4 text-gray-700`}
                >
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((country) => (
                  <Combobox.Option
                    key={country.numericCode}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-gray-300 text-white"
                          : dark
                          ? "text-gray-300"
                          : "text-gray-600"
                      }`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {country.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
export default SearchBar;
