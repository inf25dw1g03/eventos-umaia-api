/* eslint-disable no-unused-vars */
const Service = require('./Service');
const connection = require('../utils/db'); 

/**
* Create a new booking
*
* booking Booking 
* no response value expected for this operation
* */
const createBooking = ({ booking }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        booking,
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
* event Event 
* no response value expected for this operation
* */
const createEvent = ({ event }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        event,
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
* room Room 
* no response value expected for this operation
* */
const createRoom = ({ room }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        room,
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
* tag Tag 
* no response value expected for this operation
* */
const createTag = ({ tag }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        tag,
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
* user User 
* returns user
* */
const createUser = ({ body }) => new Promise(async (resolve, reject) => {
  try {
    const user = body;
    console.log("INPUT:", user);
    const sql = `
      INSERT INTO user (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(
      sql,
      [user.name, user.email, user.password, user.role],
      (err, res) => {
        if (err) {
          console.log(err);
          return reject(Service.rejectResponse('Database error', 500));
        }

        const id = res.insertId;

        resolve(
          Service.successResponse({
            id,
            ...user
          }, 201)
        );
      }
    );

  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      )
    );
  }
});

/**
* Delete a booking
*
* id Integer 
* no response value expected for this operation
* */
const deleteBooking = ({ id }) => new Promise(
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
* Delete an event
*
* id Integer 
* no response value expected for this operation
* */
const deleteEvent = ({ id }) => new Promise(
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
* Delete a room
*
* id Integer 
* no response value expected for this operation
* */
const deleteRoom = ({ id }) => new Promise(
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
* Delete a tag
*
* id Integer 
* no response value expected for this operation
* */
const deleteTag = ({ id }) => new Promise(
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
* Delete a user
*
* id Integer 
* no response value expected for this operation
* */
const deleteUser = ({ id }) => new Promise(async (resolve, reject) => {
  try {

    connection.query(
      'DELETE FROM user WHERE id = ?',
      [id],
      (err, res) => {
        if (err || !res.affectedRows) {
          console.log(err);
          console.log(res);
          return reject(
            Service.rejectResponse('User not found', 404)
          );
        } else {
          console.log(res);
          resolve(
            Service.successResponse({
              deleted: id,
            })
          );
        }
      }
    );

  } catch (e) {
    reject(
      Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
    );
  }
});

/**
* Retrieve available rooms within a time interval
* Returns only rooms that have no scheduled events during the selected time range.
*
* from Date 
* to Date 
* returns List
* */
const getAvailableRooms = ({ from, to }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        from,
        to,
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
* Retrieve a booking by ID
*
* id Integer 
* returns booking
* */
const getBookingById = ({ id }) => new Promise(
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
* Retrieve all bookings
*
* returns List
* */
const getBookings = () => new Promise(
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
* Retrieve an event by ID
*
* id Integer 
* returns event
* */
const getEventById = ({ id }) => new Promise(
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
* Retrieve all events
*
* returns List
* */
const getEvents = () => new Promise(
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
* Retrieve events filtered by date
* Returns all events occurring on a specific date.
*
* date date 
* returns List
* */
const getEventsByDate = ({ date }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        date,
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
* Retrieve all events scheduled in a particular room
* Returns all events assigned to a specific room.
*
* id Integer 
* returns List
* */
const getEventsByRoom = ({ id }) => new Promise(
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
* Retrieve all events associated with a specific tag
* Returns all events categorized with the given tag.
*
* id Integer 
* returns List
* */
const getEventsByTag = ({ id }) => new Promise(
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
* Retrieve rooms that are occupied on a specific date
*
* date date 
* returns List
* */
const getOccupiedRooms = ({ date }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        date,
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
* Retrieve a room by ID
*
* id Integer 
* returns room
* */
const getRoomById = ({ id }) => new Promise(
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
* Retrieve all rooms
*
* returns List
* */
const getRooms = () => new Promise(
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
* Retrieve a tag by ID
*
* id Integer 
* returns tag
* */
const getTagById = ({ id }) => new Promise(
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
* Retrieve all tags
*
* returns List
* */
const getTags = () => new Promise(
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
* Retrieve a user by ID
*
* id Integer 
* returns user
* */
const getUserById = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const sql = 'SELECT * FROM `user` WHERE id = ?';

      connection.query(sql, [id], (err, rows) => {
        if (err) {
          return reject(Service.rejectResponse(
            'Database error',
            500
          ));
        }

        if (rows.length === 0) {
          // User not found → 404
          return reject(Service.rejectResponse(
            'User not found',
            404
          ));
        }

        resolve(Service.successResponse(rows[0]));
      });

    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 500,
      ));
    }
  },
);
/**
* Retrieve all users
*
* returns List
* */

const getUsers = () => new Promise(
  async (resolve, reject) => {
    try {
      const sql = 'SELECT * FROM `user`';

      connection.query(sql, (err, rows) => {
        if (err) {
          return reject(Service.rejectResponse(
            'Database error',
            500
          ));
        }

        // OK: return users
        resolve(Service.successResponse(rows));
      });

    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 500,
      ));
    }
  },
);
/**
* Retrieve all users registered for an event
* Returns the list of users who have a booking for this event.
*
* id Integer 
* returns List
* */
const getUsersByEvent = ({ id }) => new Promise(
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
* Search events by keywords
* Returns events whose title or description match the search query.
*
* query String 
* returns List
* */
const searchEvents = ({ query }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        query,
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
* Update an existing booking
*
* id Integer 
* booking Booking 
* no response value expected for this operation
* */
const updateBooking = ({ id, booking }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        booking,
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
* Update an existing event
*
* id Integer 
* event Event 
* no response value expected for this operation
* */
const updateEvent = ({ id, event }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        event,
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
* Update room information
*
* id Integer 
* room Room 
* no response value expected for this operation
* */
const updateRoom = ({ id, room }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        room,
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
* Update an existing tag
*
* id Integer 
* tag Tag 
* no response value expected for this operation
* */
const updateTag = ({ id, tag }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        tag,
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
* Update an existing user
*
* id Integer 
* user User 
* no response value expected for this operation
* */
const updateUser = ({ id, body }) => new Promise(async (resolve, reject) => {
  try {
    const user = body;
    const sql = `
      UPDATE user 
      SET name = ?, email = ?, password = ?, role = ?
      WHERE id = ?
    `;

    connection.query(
      sql,
      [user.name, user.email, user.password, user.role, id],
      (err, res) => {
        if (err) {
          console.log(err);
          return reject(Service.rejectResponse('Database error', 500));
        } else {
          console.log(res);

          // Seleccionar el usuario actualizado
          connection.query(
            'SELECT * FROM user WHERE id = ?',
            [id],
            (err2, res2) => {
              if (err2) {
                console.log(err2);
                return reject(Service.rejectResponse('Database error', 500));
              } else {
                console.log(res2[0]);
                resolve(
                  Service.successResponse(res2[0])
                );
              }
            }
          );
        }
      }
    );

  } catch (e) {
    reject(
      Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
    );
  }
});


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
