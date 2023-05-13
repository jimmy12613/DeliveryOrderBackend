const assert = require("chai").assert;
const utils = require("../utils");

describe("Utils", () => {

  describe("#isValidCoordinate", () => {
    it("should return true when coordinate is valid", () => {
      const coordinate = ["12.123456", "-88.888888"];

      const result = utils.isValidCoordinate(coordinate);
      assert.isTrue(result);
    });

    it("should throw error when latitude is invalid", () => {
      const coordinate = ["90.1", "-12.123456"]; // Invalid latitude

      assert.throws(
        () => utils.isValidCoordinate(coordinate),
        Error,
        "Invalid latitude"
      );
    });

    it("should throw error when longitude is invalid", () => {
      const coordinate = ["40", "180.1"]; // Invalid longitude

      assert.throws(
        () => utils.isValidCoordinate(coordinate),
        Error,
        "Invalid longitude"
      );
    });
  });

  describe("#isValidOrder", () => {
    it("should return true when both origin and destination are valid coordinates", () => {
      const origin = ["37.419734", "-122.0827784"];
      const destination = ["37.417670", "-122.079595"];

      const result = utils.isValidOrder(origin, destination);
      assert.isTrue(result);
    });

    it("should throw error when origin is invalid", () => {
      const origin = ["90.1", "-74.005974"]; // Invalid latitude
      const destination = ["34.052235", "-118.243683"]; // Los Angeles

      assert.throws(
        () => utils.isValidOrder(origin, destination),
        Error,
        "Invalid latitude"
      );
    });
    
    it("should return false when origin array length is not 2", () => {
      const origin = ["12.123456"];
      const destination = ["12.13245", "-12.123456"];

      const result = utils.isValidOrder(origin, destination);
      assert.isFalse(result);
    });

    it("should return false when destination array length is not 2", () => {
      const origin = ["12.13245", "-12.123456"]; // New York
      const destination = ["34.052235", "12.13245", "-12.123456"]; // Only latitude provided

      const result = utils.isValidOrder(origin, destination);
      assert.isFalse(result);
    });

  });

  describe("#isValidPageAndLimit", () => {
    it("should return true when page and limit are valid", () => {
      const page = 1;
      const limit = 5;

      const result = utils.isValidPageAndLimit(page, limit);
      assert.isTrue(result);
    });

    it("should return false when page is not an integer", () => {
      const page = 1.5;
      const limit = "10";

      const result = utils.isValidPageAndLimit(page, limit);
      assert.isFalse(result);
    });

    it("should return false when page or limit is null", () => {
      const page = null;
      const limit = null;

      const result = utils.isValidPageAndLimit(page, limit);
      assert.isFalse(result);
    });
  });
});
