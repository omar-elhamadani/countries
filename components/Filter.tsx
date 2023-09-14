"use client";
import { Dispatch, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
export const regions = [
  { name: "All" },
  { name: "Africa" },
  { name: "Americas" },
  { name: "Asia" },
  { name: "Europe" },
  { name: "Oceania" },
];
interface FilterProps {
  dark: boolean;
  regionSelected: { name: string };
  setRegionSelected: Dispatch<React.SetStateAction<string>>;
}
const Filter = ({ dark, regionSelected, setRegionSelected }: FilterProps) => {
  return (
    <div className="flex flex-col">
      <p className={`ml-12 ${dark ? "text-white" : "text-black"}`}>
        filter by regions
      </p>
      <div className="flex self-center mx-8 ">
        <Listbox value={regionSelected} onChange={setRegionSelected}>
          <div className="relative mt-1 w-[160px]">
            <Listbox.Button
              className={`relative w-full cursor-default rounded-l ${
                !dark ? "bg-white" : "bg-gray-700"
              }
            ${dark ? "text-white" : "text-black"}
            py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
            >
              <span className="block truncate">{regionSelected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md ${
                  !dark ? "bg-white" : "bg-gray-700"
                }
               py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
              >
                {regions.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-gray-300 text-white"
                          : dark
                          ? "text-gray-300"
                          : "text-gray-600"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};
export default Filter;
