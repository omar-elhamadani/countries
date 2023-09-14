import { countryProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CountryCardProps {
  dark: boolean;
  country: countryProps;
}
const CountryCard = ({ country, dark }: CountryCardProps) => {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  return (
    <div
      className={`w-[280px] h-[330px] ${
        dark ? " bg-gray-700" : "bg-white"
      } mb-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl`}
    >
      <button className="w-full" onClick={handleSearch}>
        <img
          src={country.flags.png}
          alt="flag"
          className="object-cover w-full h-[150px] rounded-t-xl "
        />
      </button>

      <h2
        className={`p-4 text-xl font-semibold ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {country.name}
      </h2>
      <p className={`ml-4 ${dark ? "text-white" : "text-black"}`}>
        <span className={`font-semibold ${dark ? "text-white" : "text-black"}`}>
          Population:
        </span>{" "}
        {country.population}
      </p>
      <p className={`ml-4 ${dark ? "text-white" : "text-black"}`}>
        <span className={`font-semibold ${dark ? "text-white" : "text-black"}`}>
          Region:
        </span>{" "}
        {country.region}
      </p>
      <p className={`ml-4 ${dark ? "text-white" : "text-black"}`}>
        <span className={`font-semibold ${dark ? "text-white" : "text-black"}`}>
          Capital:
        </span>{" "}
        {country.capital}
      </p>
    </div>
  );
};
export default CountryCard;
