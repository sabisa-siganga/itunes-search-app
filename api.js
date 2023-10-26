// creating express server
const express = require("express");
// mod.cjs
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
// importing helmet
const helmet = require("helmet");
const { checkResult } = require("./utils");

// initializing express to app variable
const app = express();

// Setting a port, use process.env.PORT if available, or default to 8080
const PORT = process.env.PORT || 8080;

// Use Helmet middleware
app.use(helmet());

// using middleware to parse JSON data
app.use(express.json());

// initializing a list variable to store a list of web project items
const resultItems = [];

let nextFavoriteId = resultItems.length;

app.get("/itunes-search", async (req, res) => {
  try {
    //  iTunes search Url
    const apiUrl = "https://itunes.apple.com/search";

    // accessing query params
    let term = req.query.term;
    let media = req.query.media;
    // let entity = req.query.entity;
    let limit = req.query.limit;

    // let entity = req.query.entity;

    // Query parameters
    const params = {
      term: term,
      media: media,
      //   entity: entity,
      limit: limit || 25,
    };
    console.log(term);

    // Construct the URL with query parameters
    const url = new URL(apiUrl);
    url.search = new URLSearchParams(params).toString();

    // Make the GET request using fetch()
    const response = await fetch(url);
    const data = await response.json();

    const dataResults = data.results.map((result, index) => {
      return {
        id: index + 1,
        image: result.artworkUrl100,
        title: result.trackName,
        author: result.artistName,
      };
    });

    // Respond with the data from the iTunes API
    res.json({ resultCount: dataResults.length, results: dataResults });
  } catch (error) {
    console.error("Error making the request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while making the request." });
  }
});

/**
 * Adding the item to favourites
 */
app.post("/favourites", (req, res) => {
  const favouritesItem = req.body;

  const check = checkResult(resultItems, favouritesItem);

  if (!check) {
    //   creating the next id
    nextFavoriteId += 1;

    resultItems.push({ ...favouritesItem, id: nextFavoriteId });

    res.status(201).json({
      message: "Successfully added to favourite list",
      resultItem: {
        ...favouritesItem,
        id: nextFavoriteId,
      },
    });
    return;
  }

  res.status(400).json({
    message: "Data already exist",
  });
});

// Getting the items from the favourites
app.get("/favourites", (req, res) => {
  res.json(resultItems);
});

// Deleting the item
app.delete("/favourites/:id", (req, res) => {
  const itemId = req.params.id;

  // Find item index
  const itemIndex = resultItems.findIndex(
    (item) => item.id === parseInt(itemId)
  );

  // Checking if the index has been found the delete the item
  if (itemIndex > -1) {
    resultItems.splice(itemIndex, 1);

    res.status(201).json({
      message: "Item has been successfully deleted",
      favourites: resultItems,
    });

    return;
  }

  res.status(400).json({
    error: "Failed to delete the item",
  });
});

// serving the app
app.listen(PORT, () => console.log(`https://localhost:${PORT}`));
