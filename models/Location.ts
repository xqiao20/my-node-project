/**
 * @file Declares Location data type representing location in latitude and longitude
 */

/**
 * @typedef Location Represents the location information in latitude and longitude
 * @property {number} latitude the latitude number of the location
 * @property {number} longitude the longitude number of the location
 */
export default class Location {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
};
