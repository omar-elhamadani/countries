"use client";
import Image from "next/image";
import { CountryCard, Filter, Navbar, SearchBar } from "@/components";
import { Nunito_Sans } from "next/font/google";
import { useState } from "react";
import data from "../public/data.json";
import { regions } from "@/components/Filter";
import searchParams from "../components/CountryCard";
import { useRouter } from "next/navigation";
import { countryProps } from "@/types";
export default function Home({ searchParams }) {
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState("");
  const [regionSelected, setRegionSelected] = useState(regions[0]);
  const searchCountry = searchParams.country;
  const router = useRouter();
  const handleSearch = (country:countryProps) => {

    updateSearchParams(country.name);
  };

  const updateSearchParams = (country: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (country) {
      searchParams.set("country", country);
    } else {
      searchParams.delete("country");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname, { scroll: false });
  };
  const goBack = () => {
    const newPathname = window.location.pathname;
    router.push(newPathname, { scroll: false });
  };
  if (searchCountry) {
    const selectedCountry = data.filter(
      (country) => country.name == searchCountry
    )[0];

    return (
      <main
        className={`flex min-h-screen flex-col ${
          dark ? " bg-gray-800" : " bg-gray-200"
        }`}
      >
        <Navbar dark={dark} setDark={setDark} />
        <div className=" w-fit bg-white m-8 rounded-full">
          <button className="flex  mx-4 my-2" onClick={goBack}>
            <Image
              src="/arrow.svg"
              alt="arrow"
              width={15}
              height={15}
              className=" self-center mr-1"
            />
            <p>Back</p>
          </button>
        </div>
        <div className="flex max-lg:flex-col flex-row">
        <img
          src={selectedCountry.flag}
          alt="flag"
          className="object-cover w-[480px] h-[300px] flex mx-auto"
        />
        <div className={`ml-8 ${dark ? "text-white" : "text-black"}`}>
          <h1 className=" font-bold text-2xl mb-6 mt-8">{selectedCountry.name}</h1>
          <p className="mb-2">
            <span className=" font-semibold mr-3 ">Native Name: </span>
            {selectedCountry.nativeName}
          </p>
          <p className="mb-2">
            <span className=" font-semibold mr-3 ">Top Level Domain: </span>
            {selectedCountry.topLevelDomain}
          </p>
          <p className="mb-2">
            <span className=" font-semibold mr-3 ">Population: </span>
            {selectedCountry.population}
          </p>
          <p className="mb-2">
            <span className=" font-semibold mr-3 ">Currencies: </span>
            {selectedCountry.currencies[0].name}
          </p>
          <p className="mb-2">
            <span className=" font-semibold mr-3 ">Region: </span>
            {selectedCountry.region}
          </p>
          <p className="mb-2">
            <span className=" font-semibold mr-3 ">Languages: </span>
            {selectedCountry.languages.map((x) => `${x.name}, `)}
          </p>
          <p className="mb-2">
            <span className=" font-semibold mr-3 ">Sub Region: </span>
            {selectedCountry.subregion}
          </p>
           <p  className="mb-2">
            <span className=" font-semibold mr-3 ">Capital: </span>
            {selectedCountry.capital}
          </p>
          <h4 className="font-bold">Border Countries:</h4>
          <div className="flex justify-around w-1/2 flex-wrap">
          {selectedCountry.borders.map((code)=>(
            data.map((country)=>{
             if(country.alpha3Code==code){
              return <button className="p-1 m-2 bg-white rounded-lg text-black" onClick={()=>handleSearch(country)}>{country.name}</button>
             } 
            })
          ))}
        </div>
        </div>
        </div>

      </main>
    );
  } else {
    return (
      <main
        className={`flex min-h-screen flex-col ${
          dark ? " bg-gray-800" : " bg-gray-200"
        }`}
      >
        <Navbar dark={dark} setDark={setDark} />
        <div className="flex w-full mt-4 justify-between">
          <SearchBar
            dark={dark}
            selected={selected}
            setSelected={setSelected}
          />
          <Filter
            dark={dark}
            regionSelected={regionSelected}
            setRegionSelected={setRegionSelected}
          />
        </div>
        <div className="home__countries-wrapper flex flex-wrap justify-around my-16">
          {!selected ? (
            regionSelected.name == "All" ? (
              data.map((country) => (
                <CountryCard
                  dark={dark}
                  country={country}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))
            ) : (
              data
                .filter((country) => country.region == regionSelected.name)
                .map((country) => (
                  <CountryCard
                    dark={dark}
                    country={country}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))
            )
          ) : (
            <CountryCard
              dark={dark}
              country={selected}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </div>
      </main>
    );
  }
}
