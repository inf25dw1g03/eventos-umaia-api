/**
 * The DefaultController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/DefaultService');
const bookingsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.bookingsGET);
};

const bookingsIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.bookingsIdDELETE);
};

const bookingsIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.bookingsIdGET);
};

const bookingsIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.bookingsIdPUT);
};

const bookingsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.bookingsPOST);
};

const eventsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.eventsGET);
};

const eventsIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.eventsIdDELETE);
};

const eventsIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.eventsIdGET);
};

const eventsIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.eventsIdPUT);
};

const eventsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.eventsPOST);
};

const roomsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.roomsGET);
};

const roomsIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.roomsIdDELETE);
};

const roomsIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.roomsIdGET);
};

const roomsIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.roomsIdPUT);
};

const roomsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.roomsPOST);
};

const tagsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.tagsGET);
};

const tagsIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.tagsIdDELETE);
};

const tagsIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.tagsIdGET);
};

const tagsIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.tagsIdPUT);
};

const tagsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.tagsPOST);
};

const usersGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersGET);
};

const usersIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersIdDELETE);
};

const usersIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersIdGET);
};

const usersIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersIdPUT);
};

const usersPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.usersPOST);
};


module.exports = {
  bookingsGET,
  bookingsIdDELETE,
  bookingsIdGET,
  bookingsIdPUT,
  bookingsPOST,
  eventsGET,
  eventsIdDELETE,
  eventsIdGET,
  eventsIdPUT,
  eventsPOST,
  roomsGET,
  roomsIdDELETE,
  roomsIdGET,
  roomsIdPUT,
  roomsPOST,
  tagsGET,
  tagsIdDELETE,
  tagsIdGET,
  tagsIdPUT,
  tagsPOST,
  usersGET,
  usersIdDELETE,
  usersIdGET,
  usersIdPUT,
  usersPOST,
};
