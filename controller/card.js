const Card = require("../model/card");

const { ctrlWrapper } = require("../helpers");

const getAllCards = async (req, res) => {
  const data = await Card.find();

  res.status(200).json(data);
};

module.exports = {
  getAllCards: ctrlWrapper(getAllCards),
};
