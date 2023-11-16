const express = require('express');
const { getAllUsers, createUsers, getUserById, updateUserById, patchUserById, deleteUserById } = require('../service/user.service');
const { buildResponse } = require('../helper/buildRespone');
const { isValidId, isValidUserBody } = require('../helper/validation');

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const data = await getAllUsers();
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/:id', isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post('/', isValidUserBody, async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createUsers(name, surname, email, pwd);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put('/:id', isValidId, isValidUserBody, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd } = req.body;
    const data = await updateUserById(id, name, surname, email, pwd);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.patch('/:id', isValidId, isValidUserBody, async (req, res) => {
  try {
    const { id } = req.params;
    const clientObj = req.body;
    const data = await patchUserById(id, clientObj);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete('/:id', isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUserById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
