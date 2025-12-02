/**
 * The MaiaCampusEventControllerController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/MaiaCampusEventControllerService');
const createBooking = async (request, response) => {
  await Controller.handleRequest(request, response, service.createBooking);
};

const createEvent = async (request, response) => {
  await Controller.handleRequest(request, response, service.createEvent);
};

const createRoom = async (request, response) => {
  await Controller.handleRequest(request, response, service.createRoom);
};

const createTag = async (request, response) => {
  await Controller.handleRequest(request, response, service.createTag);
};

const createUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.createUser);
};

const deleteBooking = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteBooking);
};

const deleteEvent = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteEvent);
};

const deleteRoom = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteRoom);
};

const deleteTag = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteTag);
};

const deleteUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteUser);
};

const getAvailableRooms = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAvailableRooms);
};

const getBookingById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getBookingById);
};

const getBookings = async (request, response) => {
  await Controller.handleRequest(request, response, service.getBookings);
};

const getEventById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getEventById);
};

const getEvents = async (request, response) => {
  await Controller.handleRequest(request, response, service.getEvents);
};

const getEventsByDate = async (request, response) => {
  await Controller.handleRequest(request, response, service.getEventsByDate);
};

const getEventsByRoom = async (request, response) => {
  await Controller.handleRequest(request, response, service.getEventsByRoom);
};

const getEventsByTag = async (request, response) => {
  await Controller.handleRequest(request, response, service.getEventsByTag);
};

const getOccupiedRooms = async (request, response) => {
  await Controller.handleRequest(request, response, service.getOccupiedRooms);
};

const getRoomById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getRoomById);
};

const getRooms = async (request, response) => {
  await Controller.handleRequest(request, response, service.getRooms);
};

const getTagById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getTagById);
};

const getTags = async (request, response) => {
  await Controller.handleRequest(request, response, service.getTags);
};

const getUserById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getUserById);
};

const getUsers = async (request, response) => {
  await Controller.handleRequest(request, response, service.getUsers);
};

const getUsersByEvent = async (request, response) => {
  await Controller.handleRequest(request, response, service.getUsersByEvent);
};

const searchEvents = async (request, response) => {
  await Controller.handleRequest(request, response, service.searchEvents);
};

const updateBooking = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateBooking);
};

const updateEvent = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateEvent);
};

const updateRoom = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateRoom);
};

const updateTag = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateTag);
};

const updateUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateUser);
};


module.exports = {
  createBooking,
  createEvent,
  createRoom,
  createTag,
  createUser,
  deleteBooking,
  deleteEvent,
  deleteRoom,
  deleteTag,
  deleteUser,
  getAvailableRooms,
  getBookingById,
  getBookings,
  getEventById,
  getEvents,
  getEventsByDate,
  getEventsByRoom,
  getEventsByTag,
  getOccupiedRooms,
  getRoomById,
  getRooms,
  getTagById,
  getTags,
  getUserById,
  getUsers,
  getUsersByEvent,
  searchEvents,
  updateBooking,
  updateEvent,
  updateRoom,
  updateTag,
  updateUser,
};
