const USE_LOCAL = import.meta.env.VITE_USE_LOCAL_DATA === "true";
const BASE_URL = "https://restcountries.com/v3.1";
const FIELDS = "name,flags,region,subregion,capital,population,languages,currencies,borders,cca3";

export async function fetchAllCountries() {
  if (USE_LOCAL) {
    const data = (await import("../data/data.json")).default;
    return data;
  }
  const res = await fetch(`${BASE_URL}/all?fields=${FIELDS}`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

export async function fetchCountryByName(name) {
  if (USE_LOCAL) {
    const data = (await import("../data/data.json")).default;
    return data.find((c) => c.name.common.toLowerCase() === name.toLowerCase());
  }
  const res = await fetch(`${BASE_URL}/name/${name}?fullText=true&fields=${FIELDS}`);
  if (!res.ok) throw new Error("Failed to fetch country");
  const data = await res.json();
  return data[0];
}
