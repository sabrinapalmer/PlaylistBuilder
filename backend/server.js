require("dotenv").config();
const cors = require("cors");
const express = require("express");
const request = require("request");
const querystring = require("querystring");
const mongoose = require("mongoose");
const searchSettingsRoutes = require("./routes/searchSettings");

const client_id = "ae9c85672ff84bf0867aeb851417d432";
const client_secret = "1f92f641a7c3405a9b311c9aab124cca";
const backend_redirect_uri = "http://localhost:4000/callback";

let access_token = "";

const setAccessToken = (token) => {
  access_token = token;
};

// create express app
const app = express();

// middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use((request, response, next) => {
  next();
});

// routes
app.use("/api/searchSettings", searchSettingsRoutes);

//connecting to spotify
app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: backend_redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: backend_redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        setAccessToken(access_token);

        res.redirect(
          "http://localhost:5173/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

//spotify helper function
const spotifyApiRequest = (url, params = {}, callback) => {
  const options = {
    url: url,
    headers: { Authorization: `Bearer ${access_token}` },
    qs: params,
    json: true,
  };
  request.get(options, callback);
};

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//fetch available genres
app.get("/api/genres", async (req, res) => {
  try {
    const response = await spotifyApiRequest(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds"
    );
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//fetch user's top artist
app.get("/api/top-artists", async (req, res) => {
  try {
    const response = await spotifyApiRequest(
      "https://api.spotify.com/v1/me/top/artists"
    );
    res.json(response.data.items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//fetch user's top tracks
app.get("/api/top-tracks", async (req, res) => {
  try {
    const response = await spotifyApiRequest(
      "https://api.spotify.com/v1/me/top/tracks"
    );
    res.json(response.data.items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//search spotify
app.get("/api/search", async (req, res) => {
  const { type, query } = req.query;
  try {
    const response = await spotifyApiRequest(
      "https://api.spotify.com/v1/search",
      { q: query, type }
    );
    res.json(response.data[type + "s"].items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // setting up listener
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
