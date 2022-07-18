const { getPrice } = require("./getPrice");
const { Client, GatewayIntentBits } = require("discord.js");
const { token, url, mongo_uri } = require("./config.json");
const priceDB = require("./models/priceDB.js");
const { default: mongoose } = require("mongoose");

mongoose.connect(mongo_uri);

const client = new Client({
  intents: GatewayIntentBits.DirectMessages,
});

const id = "717632064941195335";
var prevPrice;

client.on("ready", async () => {
  console.log("Ready");

  var prevPriceDoc = await priceDB.find().sort({ date: -1 });
  prevPrice = prevPriceDoc[0].price;

  setInterval(async () => {
    console.log("checking price");

    const price = await getPrice(url);

    if (price < prevPrice) {
      console.log("price changed");
      await client.users
        .fetch(id)
        .then((user) =>
          user.send(`Price changed from ₹${prevPrice} to ₹${price}`)
        );
      await priceDB.create({
        price: price,
        date: new Date(),
      });
      prevPrice = price;
    }
  }, 1000 * 60 * 10);
});

client.login(token);
