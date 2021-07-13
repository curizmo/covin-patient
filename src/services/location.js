import { getData } from "./fetch";

/**
 * @returns {Promise<object>}
 */
export function getAllCountries() {
  return getData('/location/countries');
}

/**
 * @param {string} countryCode
 * @returns {Promise<object>}
 */
export function getStatesByCountryCode(countryCode) {
  return getData(`/location/states/${countryCode}`);
}

/**
 * @param {string} countryCode
 * @param {string} stateCode
 * @returns {Promise<object>}
 */
export function getStateByCountryCodeAndStateCode(countryCode, stateCode) {
  return getData(`/location/state/${countryCode}/${stateCode}`);
}

/**
 * @param {string} countryCode
 * @param {string} stateCode
 * @returns {Promise<object>}
 */
export function getCitiesByCountryCodeAndStateCode(countryCode, stateCode) {
  return getData(`/location/cities/${countryCode}/${stateCode}`);
}
