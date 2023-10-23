const { checkResult } = require("./utils");

// creating a test suited for the checkresult function
describe("Util: checkResult", () => {
  // object that represents a category item

  it("should return expected object", () => {
    const results = [
      {
        author: "June Osborne",
        title: "The handman's tale",
      },
    ];
    const favourites = {
      author: "June Osborne",
      title: "The handman's tale",
    };

    const resultItemCheck = checkResult(results, favourites);

    expect(resultItemCheck).not.toBeUndefined();
  });

  it("should return undefined", () => {
    const results = [
      {
        author: "Luther Vandross",
        title: "Dance with my father",
      },
    ];
    const favourites = {
      author: "June Osborne",
      title: "The handman's tale",
    };

    const resultItemCheck = checkResult(results, favourites);

    expect(resultItemCheck).toBeUndefined();
  });
});
