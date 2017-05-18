// TODO: Tests for everything here

var districtLookup = {
  '114': require('./cd114')
};

var STATE_TO_FIPS = {
  'GA': '13',
  'KY': '21',
  'MD': '24',
  'MS': '28',
  'NY': '36',
  'NC': '37',
  'OH': '39',
  'PA': '42',
  'SC': '45',
  'TN': '47',
  'VA': '51',
  'WV': '54',
  'AL': '01'
};

var stateToFips = function(state) {
  return STATE_TO_FIPS[state.toUpperCase()];
}

/**
 * Returns a normalized version of a FIPS-like code as a string.
 */
var normalizeCode = function(val) {
  var code = val;

  if (Number.isInteger(code)) {
    code = code.toString();   
  }

  if (code.length == 1) {
    code = "0" + code;
  }

  return code; 
};

/**
 * Returns true if at least part of a congressional district is in Appalachia.
 *
 * @param {string} state Two letter state abbreviation. For example "PA".
 * @param {(string|number)} Congressional district number. For example 1 or "01".
 * @param {(string|number)} Congress whose boundaries are used.  Defaults to 114.
 */
var districtInAppalachia = function(state, district, congress) {
  congress = congress ? normalizeCode(congress) : '114';

  var stateFips = stateToFips(state);
  var districtCode = normalizeCode(district);

  if (districtLookup[congress] && 
      districtLookup[congress][stateFips] &&
      districtLookup[congress][stateFips][districtCode]) {
    return true;
  }

  return false;
};

module.exports = districtInAppalachia; 
