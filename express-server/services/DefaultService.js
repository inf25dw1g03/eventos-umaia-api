/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List all bookings
*
* returns List
* */
const bookingsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete a booking
*
* id Integer 
* no response value expected for this operation
* */
const bookingsIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get a booking by id
*
* id Integer 
* returns Booking
* */
const bookingsIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update a booking
*
* id Integer 
* bookingInput BookingInput 
* no response value expected for this operation
* */
const bookingsIdPUT = ({ id, bookingInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        bookingInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a new booking
*
* bookingInput BookingInput 
* no response value expected for this operation
* */
const bookingsPOST = ({ bookingInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        bookingInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* List all events
*
* returns List
* */
const eventsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete an event
*
* id Integer 
* no response value expected for this operation
* */
const eventsIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get event by ID
*
* id Integer 
* returns Event
* */
const eventsIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update an event
*
* id Integer 
* eventInput EventInput 
* no response value expected for this operation
* */
const eventsIdPUT = ({ id, eventInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        eventInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a new event
*
* eventInput EventInput 
* no response value expected for this operation
* */
const eventsPOST = ({ eventInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        eventInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* List all rooms
*
* returns List
* */
const roomsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete a room
*
* id Integer 
* no response value expected for this operation
* */
const roomsIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get a room by id
*
* id Integer 
* returns Room
* */
const roomsIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update a room
*
* id Integer 
* roomInput RoomInput 
* no response value expected for this operation
* */
const roomsIdPUT = ({ id, roomInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        roomInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a new room
*
* roomInput RoomInput 
* no response value expected for this operation
* */
const roomsPOST = ({ roomInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        roomInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* List all tags
*
* returns List
* */
const tagsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete a tag
*
* id Integer 
* no response value expected for this operation
* */
const tagsIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get a tag by id
*
* id Integer 
* returns Tag
* */
const tagsIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update a tag
*
* id Integer 
* tagInput TagInput 
* no response value expected for this operation
* */
const tagsIdPUT = ({ id, tagInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        tagInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a new tag
*
* tagInput TagInput 
* no response value expected for this operation
* */
const tagsPOST = ({ tagInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        tagInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* List all users
*
* returns List
* */
const usersGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete a user
*
* id Integer 
* no response value expected for this operation
* */
const usersIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get a user by id
*
* id Integer 
* returns User
* */
const usersIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update a user
*
* id Integer 
* userInput UserInput 
* no response value expected for this operation
* */
const usersIdPUT = ({ id, userInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        userInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a new user
*
* userInput UserInput 
* returns User
* */
const usersPOST = ({ userInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

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
