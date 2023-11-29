const App = require("./models/app");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { restart } = require("nodemon");
const cors = require("cors");
mongoose
  .connect("mongodb://127.0.0.1:27017/GPS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });
app.use(cors());
app.get("/", async (req, res) => {
  const apps = await App.find().sort({ "Maximum Installs": -1 }).limit(10);
  res.json(apps);
});

app.get("/top-free", async (req, res) => {
  const pageSize = 10;
  const { page = 1 } = req.query;
  const apps = await App.find({ Free: true })
    .sort({ "Maximum Installs": -1 })
    .skip(page * pageSize)
    .limit(10);
  const total = await App.find({ Free: true }).count();

  res.json({ total, apps });
});

app.get("/top-paid", async (req, res) => {
  const pageSize = 10;
  const { page = 1 } = req.query;
  const apps = await App.find({ Free: false })
    .sort({ "Maximum Installs": -1 })
    .skip(page * pageSize)
    .limit(10);
  const total = await App.find({ Free: false }).count();

  res.json({ total, apps });
});

app.get("/categories", async (req, res) => {
  const categories = await App.aggregate([
    {
      $group: {
        _id: "$Category",
        value: { $sum: 1 },
      },
    },
    {
      $match: {
        _id: { $ne: null },
      },
    },
    {
      $sort: { value: -1 },
    },
    {
      $addFields: {
        name: "$_id",
      },
    },
  ]);

  res.json(categories);
});

app.get("/vulnerable", async (req, res) => {
  const result = await App.aggregate([
    {
      $addFields: {
        lastUpdated: {
          $dateFromString: {
            dateString: "$Last Updated",
          },
        },
      },
    },
    {
      $group: {
        _id: { $year: "$lastUpdated" },
        total: { $sum: 1 },
      },
    },
    {
      $addFields: {
        vulnerable: {
          $cond: {
            if: {
              $lte: [{ $subtract: [2021, "$_id"] }, 0],
            },
            then: "Not Vulnerable",
            else: {
              $cond: {
                if: {
                  $lte: [{ $subtract: [2021, "$_id"] }, 2],
                },
                then: "Slightly Vulnerable",
                else: {
                  $cond: {
                    if: {
                      $lte: [{ $subtract: [2021, "$_id"] }, 5],
                    },
                    then: "Moderately Vulnerable",
                    else: "Highly Vulnerable",
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$vulnerable",
        count: { $sum: "$total" },
      },
    },
  ]);

  const vulnerable = {
    "Not Vulnerable": 0,
    "Slightly Vulnerable": 1,
    "Moderately Vulnerable": 2,
    "Highly Vulnerable": 3,
  };

  result.sort((a, b) => vulnerable[a._id] - vulnerable[b._id]);

  res.json(result);
});

app.get("/year-wise-apps", async (req, res) => {
  try {
    const result = await App.aggregate([
      {
        $addFields: {
          releaseDateAsDate: {
            $dateFromString: {
              dateString: "$Released",
            },
          },
        },
      },
      {
        $group: {
          _id: { $year: "$releaseDateAsDate" },
          total: { $sum: 1 },
        },
      },
      {
        $setWindowFields: {
          sortBy: { _id: 1 },
          output: {
            cumulative: {
              $sum: "$total",
              window: { documents: ["unbounded", "current"] },
            },
          },
        },
      },
      {
        $match: {
          _id: { $ne: null },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
