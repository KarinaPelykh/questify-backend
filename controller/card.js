const Card = require("../model/card");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAllCards = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Card.find({ owner });

  res.status(200).json(data);
};

const createCard = async (req, res) => {
  const { _id: owner } = req.user;

  const data = await Card.create({ ...req.body, owner });

  res.status(200).json(data);
};

const editCardById = async (req, res) => {
  const { id } = req.params;

  const data = await Card.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(data);
};

const deleteCard = async (req, res) => {
  const { id } = req.params;

  const data = await Card.findByIdAndDelete(id);

  if (!data) {
    throw HttpError(404);
  }

  res.json("Delete success");
};

module.exports = {
  getAllCards: ctrlWrapper(getAllCards),
  createCard: ctrlWrapper(createCard),
  editCardById: ctrlWrapper(editCardById),
  deleteCard: ctrlWrapper(deleteCard),
};
