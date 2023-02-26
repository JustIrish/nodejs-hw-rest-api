const { Contact } = require("../models/contact");

const { ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (removedContact) {
    return res.status(200).json({ message: "contact deleted" });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
};

const updateById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
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
