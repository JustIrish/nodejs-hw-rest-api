const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;

  const params = { owner: _id };

  if (favorite) {
    params.favorite = favorite;
  }

  const contacts = await Contact.find(params, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (removedContact) {
    return res.status(200).json({ message: "contact deleted" });
  } else {
    throw HttpError(404, "Not found");
  }
};

const updateById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
