/* eslint-disable no-unused-vars */
const Service = require('./Service');
const connection = require('../utils/db'); 


/**
* Create a new booking
*
* booking Booking 
* no response value expected for this operation
* */
const createBooking = ({ body }) => new Promise(async (resolve, reject) => {
  try {
    
    const booking = body;
    //console.log ("INPUT: ", booking)
    const { user_id, event_id } = booking;
    connection.query('SELECT * FROM user WHERE id = ?', [user_id], (err, userRes) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      if (!userRes[0]) {
        return reject(Service.rejectResponse('User not found', 404));
      }

      connection.query('SELECT * FROM event WHERE id = ?', [event_id], (err, eventRes) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        if (!eventRes[0]) {
          return reject(Service.rejectResponse('Event not found', 404));
        }

        connection.query(
          'SELECT * FROM booking WHERE user_id = ? AND event_id = ?',
          [user_id, event_id],
          (err, conflictRes) => {

            if (err) {
              console.log(err);
              return reject(err);
            }

            if (conflictRes.length > 0) {
              return reject(
                Service.rejectResponse(
                  'User already has a booking for this event',
                  409
                )
              );
            }

            const created_at = new Date();

            connection.query(
              'INSERT INTO booking (user_id, event_id, created_at) VALUES (?, ?, ?)',
              [user_id, event_id, created_at],
              (err, insertRes) => {

                if (err) {
                  console.log(err);
                  return reject(err);
                }

                console.log(insertRes);
                const id = insertRes.insertId
                resolve(
                  Service.successResponse({
                    user_id,
                    event_id,
                    created_at
                  })
                );

              }
            );
          }
        );
      });
    });
  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});

/**
* Create a new event
*
* event Event 
* no response value expected for this operation
* */
const createEvent = ({ body }) => new Promise(async (resolve, reject) => {
  try {
    

    const event = body;

    // Validación básica
    if (!event || !event.title || !event.room_id || !event.tag_id ||
        !event.start_datetime || !event.end_datetime) {
      reject(Service.rejectResponse('Invalid data', 400));
      return;
    }
    event.start_datetime = event.start_datetime.slice(0, 19).replace("T", " ");
    event.end_datetime = event.end_datetime.slice(0, 19).replace("T", " ");

    // Validar que exista room
    connection.query('SELECT * FROM room WHERE id = ?', [event.room_id], (err1, resRoom) => {
      if (err1) {
        console.log(err1);
        reject(Service.rejectResponse('Database error', 500));
        return;
      }
      if (resRoom.length === 0) {
        reject(Service.rejectResponse('Room not found', 404));
        return;
      }

      // Validar que exista tag
      connection.query('SELECT * FROM tag WHERE id = ?', [event.tag_id], (err2, resTag) => {
        if (err2) {
          console.log(err2);
          reject(Service.rejectResponse('Database error', 500));
          return;
        }
        if (resTag.length === 0) {
          reject(Service.rejectResponse('Tag not found', 404));
          return;
        }

        // Validar conflicto de horarios
        const conflictQuery = `
          SELECT * FROM event 
          WHERE room_id = ?
          AND (
            (start_datetime < ? AND end_datetime > ?)
            OR (start_datetime < ? AND end_datetime > ?)
            OR (? <= start_datetime AND ? >= end_datetime)
          )
        `;

        connection.query(
          conflictQuery,
          [
            event.room_id,
            event.end_datetime, event.start_datetime,
            event.end_datetime, event.start_datetime,
            event.start_datetime, event.end_datetime
          ],
          (err3, conflicts) => {
            if (err3) {
              console.log(err3);
              reject(Service.rejectResponse('Database error', 500));
              return;
            }

            if (conflicts.length > 0) {
              reject(Service.rejectResponse('The room is occupied during this time period', 409));
              return;
            }

            // INSERT real
            connection.query(
              'INSERT INTO event (title, description, room_id, tag_id, start_datetime, end_datetime) VALUES (?, ?, ?, ?, ?, ?)',
              [
                event.title,
                event.description || null,
                event.room_id,
                event.tag_id,
                event.start_datetime,
                event.end_datetime
              ],
              (err4, resInsert) => {
                if (err4) {
                  console.log(err4);
                  reject(Service.rejectResponse('Database error', 500));
                } else {
                  resolve(Service.successResponse({
                    id: resInsert.insertId,
                    ...event
                  }, 201));
                }
              }
            );
          }
        );
      });
    });

  } catch (e) {
    reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
  }
});

/**
* Create a new room
*
* room Room 
* no response value expected for this operation
* */
const createRoom = ({ body }) => new Promise(async (resolve, reject) => {
  try {
    const room = body;
    const { name, capacity, building, description } = room;
    connection.query(
      'SELECT * FROM room WHERE name = ?',
      [name],
      (err, res) => {

        if (err) {
          console.log(err);
          return reject(err);
        }

        if (res.length > 0) {
          return reject(
            Service.rejectResponse(
              'A room with this name already exists',
              409
            )
          );
        }

        connection.query(
          'INSERT INTO room (name, capacity, building, description) VALUES (?, ?, ?, ?)',
          [name, capacity, building, description || null],
          (err, insertRes) => {

            if (err) {
              console.log(err);
              return reject(err);
            }

            console.log(insertRes);
            resolve(
              Service.successResponse({
                id: insertRes.insertId,
                name,
                capacity,
                building,
                description: description || null
              })
            );
          }
        );
      }
    );

  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});

/**
* Create a new tag
*
* tag Tag 
* no response value expected for this operation
* */
const createTag = ({ body }) => new Promise(async (resolve, reject) => {
  try {
    const tag = body;

    // Validación básica
    if (!tag || !tag.name) {
      reject(Service.rejectResponse('Invalid data', 400));
      return;
    }

    // Comprobar si el nombre ya existe
    connection.query(
      'SELECT * FROM tag WHERE name = ?',
      [tag.name],
      (err, res) => {
        if (err) {
          console.log(err);
          reject(Service.rejectResponse('Database error', 500));
          return;
        }

        if (res.length > 0) {
          reject(Service.rejectResponse('A tag with this name already exists', 409));
          return;
        }

        // INSERT real
        connection.query(
          'INSERT INTO tag (name) VALUES (?)',
          [tag.name],
          (err2, res2) => {
            if (err2) {
              console.log(err2);
              reject(Service.rejectResponse('Database error', 500));
            } else {
              console.log(res2.insertId);
              const id = res2.insertId
              resolve(Service.successResponse({
                id: res2.insertId,
                name: tag.name
              }));
            }
          }
        );
      }
    );

  } catch (e) {
    reject(
      Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
    );
  }
});

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
const deleteBooking = ({ id }) => new Promise(async (resolve, reject) => {
  try {

    connection.query('SELECT * FROM booking WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      if (!res[0]) {
        return reject(Service.rejectResponse('Booking not found', 404));
      }

      connection.query('DELETE FROM booking WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        console.log(result);

        resolve(
          Service.successResponse({
            message: 'Booking deleted',
            id
          })
        );
      });

    });

  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});


/**
* Delete an event
*
* id Integer 
* no response value expected for this operation
* */
const deleteEvent = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    connection.query(
      'DELETE FROM event WHERE id = ?',
      [id],
      (err, res) => {
        if (err) {
          console.log(err);

          // Error por FK → tiene reservas
          if (err.errno === 1451) {
            reject(Service.rejectResponse('The event has associated bookings', 409));
            return;
          }

          reject(Service.rejectResponse('Database error', 500));
          return;
        }

        if (!res.affectedRows) {
          reject(Service.rejectResponse('Event not found', 404));
          return;
        }

        resolve(Service.successResponse({ deleted: id }));
      }
    );

  } catch (e) {
    reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
  }
});

/**
* Delete a room
*
* id Integer 
* no response value expected for this operation
* */
const deleteRoom = ({ id }) => new Promise(async (resolve, reject) => {
  try {

    connection.query('SELECT * FROM room WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      if (!res[0]) {
        return reject(Service.rejectResponse('Room not found', 404));
      }

      connection.query(
        'SELECT * FROM event WHERE room_id = ?',
        [id],
        (err, eventRes) => {

          if (err) {
            console.log(err);
            return reject(err);
          }

          if (eventRes.length > 0) {
            return reject(
              Service.rejectResponse(
                'Room has associated events',
                409
              )
            );
          }

          connection.query(
            'DELETE FROM room WHERE id = ?',
            [id],
            (err, deleteRes) => {

              if (err) {
                console.log(err);
                return reject(err);
              }

              console.log(deleteRes);

              if (deleteRes.affectedRows === 0) {
                return reject(Service.rejectResponse('Room not found', 404));
              }

              resolve(
                Service.successResponse({
                  message: 'Room deleted',
                  id
                })
              );
            }
          );
        }
      );
    });

  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});

/**
* Delete a tag
*
* id Integer 
* no response value expected for this operation
* */
const deleteTag = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    connection.query(
      'DELETE FROM tag WHERE id = ?',
      [id],
      (err, res) => {
        if (err) {
          console.log(err);

          // Si la FK salta, es que hay eventos usando este tag
          if (err.errno === 1451) {
            reject(Service.rejectResponse('Tag is associated with events', 409));
            return;
          }

          reject(Service.rejectResponse('Database error', 500));
          return;
        }

        if (!res.affectedRows) {
          reject(Service.rejectResponse('Tag not found', 404));
          return;
        }

        console.log(res);
        resolve(
          Service.successResponse({
            deleted: id,
          })
        );
      }
    );

  } catch (e) {
    reject(
      Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
    );
  }
});

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
const getAvailableRooms = ({ from, to }) => new Promise(async (resolve, reject) => {
  try {
    if (!from || !to) {
      return reject(Service.rejectResponse("Missing parameters", 400));
    }

    const sqlQuery = `
      SELECT *
      FROM room r
      WHERE r.id NOT IN (
        SELECT room_id
        FROM event
        WHERE start_datetime < ?
          AND end_datetime > ?
      )
    `;

    connection.query(sqlQuery, [to, from], (err, res) => {
      if (err) {
        console.log(err);
        return reject(Service.rejectResponse("Database error", 500));
      }

      resolve(Service.successResponse(res));
    });

  } catch (e) {
    reject(Service.rejectResponse(e.message || "Invalid input", e.status || 405));
  }
});

/**
* Retrieve a booking by ID
*
* id Integer 
* returns booking
* */
const getBookingById = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM booking WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);

        if (!res[0]) {
          return reject(Service.rejectResponse('Booking not found', 404));
        }

        resolve(Service.successResponse(res[0]));
      }
    });
  } catch (e) {
    reject(
      Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
    );
  }
});

/**
* Retrieve all bookings
*
* returns List
* */
const getBookings = () => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM booking', (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);
        resolve(Service.successResponse(res));
      }
    });
  } catch (e) {
    reject(
      Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
    );
  }
});

/**
* Retrieve an event by ID
*
* id Integer 
* returns event
* */
const getEventById = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    connection.query(
      'SELECT * FROM event WHERE id = ?',
      [id],
      (err, res) => {
        if (err) {
          console.log(err);
          reject(Service.rejectResponse('Database error', 500));
        } else {
          console.log(res);

          if (res.length === 0) {
            reject(Service.rejectResponse('Event not found', 404));
            return;
          }

          resolve(Service.successResponse(res[0]));
        }
      }
    );
  } catch (e) {
    reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
  }
});

/**
* Retrieve all events
*
* returns List
* */
const getEvents = () => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM event', (err, res) => {
      if (err) {
        console.log(err);
        reject(Service.rejectResponse('Database error', 500));
      } else {
        console.log(res);
        resolve(Service.successResponse(res));
      }
    });
  } catch (e) {
    reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
  }
});

/**
* Retrieve events filtered by date
* Returns all events occurring on a specific date.
*
* date date 
* returns List
* */
const getEventsByDate = ({ date }) => new Promise(async (resolve, reject) => {
  try {
   if (!date) {
    return reject(Service.rejectResponse("Missing date parameter", 400));
  }

  if (date.length !== 10 || date[4] !== '-' || date[7] !== '-') {
    return reject(Service.rejectResponse("Invalid date format (YYYY-MM-DD)", 400));
  }

  const startOfDay = `${date} 00:00:00`;
  const endOfDay = `${date} 23:59:59`;


    const sqlQuery = `
      SELECT *
      FROM event
      WHERE 
        start_datetime <= ?
        AND 
        end_datetime >= ?
    `;
    connection.query(sqlQuery, [endOfDay, startOfDay], (err, res) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(res);
      resolve(Service.successResponse(res));
    });
  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || "Invalid input",
        e.status || 405
      )
    );
  }
});
/**
* Retrieve all events scheduled in a particular room
* Returns all events assigned to a specific room.
*
* id Integer 
* returns List
* */
const getEventsByRoom = ({ id }) => new Promise(async (resolve, reject) => {
  try {

    connection.query('SELECT * FROM room WHERE id = ?', [id], (err, roomRes) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      if (!roomRes[0]) {
        return reject(Service.rejectResponse('Room not found', 404));
      }

      connection.query('SELECT * FROM event WHERE room_id = ?', [id], (err, eventsRes) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        console.log(eventsRes);

        resolve(Service.successResponse(eventsRes));
      });

    });
  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});

/**
* Retrieve all events associated with a specific tag
* Returns all events categorized with the given tag.
*
* id Integer 
* returns List
* */
const getEventsByTag = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM tag WHERE id = ?', [id], (err, tagRes) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      if (!tagRes[0]) {
        return reject(Service.rejectResponse('Tag not found', 404));
      }

      connection.query('SELECT * FROM event WHERE tag_id = ?', [id], (err, eventsRes) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        console.log(eventsRes);

        resolve(Service.successResponse(eventsRes));
      });

    });
  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});


/**
* Retrieve rooms that are occupied on a specific date
*
* date date 
* returns List
* */
const getOccupiedRooms = ({ date }) => new Promise(async (resolve, reject) => {
  try {
    if (!date) {
    return reject(Service.rejectResponse("Missing date parameter", 400));
    }

    if (date.length !== 10 || date[4] !== '-' || date[7] !== '-') {
    return reject(Service.rejectResponse("Invalid date format (YYYY-MM-DD)", 400));
    }


    const startOfDay = `${date} 00:00:00`;
    const endOfDay = `${date} 23:59:59`;

    const sqlQuery = `
      SELECT DISTINCT r.*
      FROM room r
      JOIN event e ON e.room_id = r.id
      WHERE 
        e.start_datetime <= ? 
        AND 
        e.end_datetime >= ?
    `;

    connection.query(sqlQuery, [endOfDay, startOfDay], (err, res) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      console.log(res);
      resolve(Service.successResponse(res));
    });
  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || "Invalid input",
        e.status || 405
      )
    );
  }
});


/**
* Retrieve a room by ID
*
* id Integer 
* returns room
* */
const getRoomById = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM room WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);

        if (!res[0]) {
          return reject(Service.rejectResponse('Room not found', 404));
        }

        resolve(Service.successResponse(res[0]));
      }
    });

  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});

/**
* Retrieve all rooms
*
* returns List
* */
const getRooms = () => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM room', (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);
        resolve(Service.successResponse(res));
      }
    });
  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});

/**
* Retrieve a tag by ID
*
* id Integer 
* returns tag
* */
const getTagById = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM tag WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);

        if (res.length === 0) {
          // Tag not found → return 404
          reject(Service.rejectResponse('Tag not found', 404));
          return;
        }

        resolve(Service.successResponse(res[0]));
      }
    });
  } catch (e) {
    reject(
      Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
    );
  }
});
/**
* Retrieve all tags
*
* returns List
* */
const getTags = () => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM tag', (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);
        resolve(Service.successResponse(res));
      }
    });
  } catch (e) {
    reject(
      Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
    );
  }
});

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
const getUsersByEvent = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    connection.query('SELECT * FROM event WHERE id = ?', [id], (err, eventRes) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      if (!eventRes[0]) {
        return reject(Service.rejectResponse('Event not found', 404));
      }
      const query = `
        SELECT u.*
        FROM user u
        JOIN booking b ON b.user_id = u.id
        WHERE b.event_id = ?
      `;

      connection.query(query, [id], (err, usersRes) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(usersRes);
        resolve(Service.successResponse(usersRes));
      });
    });
  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});


/**
* Search events by keywords
* Returns events whose title or description match the search query.
*
* query String 
* returns List
* */
const searchEvents = ({ query }) => new Promise((resolve, reject) => {
  try {
    if (!query || query.trim() === '') {
      return reject(Service.rejectResponse("Missing query parameter", 400));
    }

    const searchTerm = `%${query}%`;

    const sql = `
      SELECT *
      FROM event
      WHERE title LIKE ? OR description LIKE ?
    `;

    connection.query(sql, [searchTerm, searchTerm], (err, results) => {
      if (err) {
        console.log(err);
        return reject(Service.rejectResponse("Database error", 500));
      }

      resolve(Service.successResponse(results));
    });

  } catch (e) {
    reject(Service.rejectResponse(e.message || "Invalid input", 405));
  }
});


/**
* Update an existing booking
*
* id Integer 
* booking Booking 
* no response value expected for this operation
* */
const updateBooking = ({ id, body }) => new Promise(async (resolve, reject) => {
  try {
    const booking = body;
    connection.query('SELECT * FROM booking WHERE id = ?', [id], (err, existing) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      if (!existing[0]) {
        return reject(Service.rejectResponse('Booking not found', 404));
      }
      connection.query(
        'SELECT * FROM booking WHERE user_id = ? AND event_id = ? AND id != ?',
        [booking.user_id, booking.event_id, id],
        (err, conflict) => {

          if (err) {
            console.log(err);
            return reject(err);
          }

          if (conflict.length > 0) {
            return reject(Service.rejectResponse(
              'User already has a booking for this event',
              409
            ));
          }
          connection.query(
            'UPDATE booking SET user_id = ?, event_id = ? WHERE id = ?',
            [booking.user_id, booking.event_id, id],
            (err, res) => {

              if (err) {
                console.log(err);
                return reject(err);
              }

              console.log(res);

              if (res.affectedRows === 0) {
                return reject(Service.rejectResponse('Booking not found', 404));
              }

              resolve(
                Service.successResponse({
                  id,
                  ...booking
                })
              );
            }
          );
        }
      );
    });

  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
    );
  }
});
/**
* Update an existing event
*
* id Integer 
* event Event 
* no response value expected for this operation
* */
const updateEvent = ({ id, body }) => new Promise(async (resolve, reject) => {
  try {
    const event = body;

    if (!event || !event.title || !event.room_id || !event.tag_id ||
        !event.start_datetime || !event.end_datetime) {
      reject(Service.rejectResponse('Invalid data', 400));
      return;
    }
    if (event.start_datetime)
      event.start_datetime = event.start_datetime.slice(0, 19).replace("T", " ");
    if (event.end_datetime)
      event.end_datetime = event.end_datetime.slice(0, 19).replace("T", " ");

    // Verificar que el evento exista
    connection.query('SELECT * FROM event WHERE id = ?', [id], (err1, resEvent) => {
      if (err1) {
        console.log(err1);
        reject(Service.rejectResponse('Database error', 500));
        return;
      }
      if (resEvent.length === 0) {
        reject(Service.rejectResponse('Event not found', 404));
        return;
      }

      // Validar room existe
      connection.query('SELECT * FROM room WHERE id = ?', [event.room_id], (err2, resRoom) => {
        if (err2) {
          console.log(err2);
          reject(Service.rejectResponse('Database error', 500));
          return;
        }
        if (resRoom.length === 0) {
          reject(Service.rejectResponse('Room not found', 404));
          return;
        }

        // Validar tag existe
        connection.query('SELECT * FROM tag WHERE id = ?', [event.tag_id], (err3, resTag) => {
          if (err3) {
            console.log(err3);
            reject(Service.rejectResponse('Database error', 500));
            return;
          }
          if (resTag.length === 0) {
            reject(Service.rejectResponse('Tag not found', 404));
            return;
          }

          // Validar conflicto de horarios (excluyendo el propio evento)
          const conflictQuery = `
            SELECT * FROM event 
            WHERE room_id = ?
            AND id <> ?
            AND (
              (start_datetime < ? AND end_datetime > ?)
              OR (start_datetime < ? AND end_datetime > ?)
              OR (? <= start_datetime AND ? >= end_datetime)
            )
          `;

          connection.query(
            conflictQuery,
            [
              event.room_id, id,
              event.end_datetime, event.start_datetime,
              event.end_datetime, event.start_datetime,
              event.start_datetime, event.end_datetime
            ],
            (err4, conflicts) => {
              if (err4) {
                console.log(err4);
                reject(Service.rejectResponse('Database error', 500));
                return;
              }

              if (conflicts.length > 0) {
                reject(Service.rejectResponse('The room is occupied during the updated time', 409));
                return;
              }

              // UPDATE
              connection.query(
                'UPDATE event SET title = ?, description = ?, room_id = ?, tag_id = ?, start_datetime = ?, end_datetime = ? WHERE id = ?',
                [
                  event.title,
                  event.description || null,
                  event.room_id,
                  event.tag_id,
                  event.start_datetime,
                  event.end_datetime,
                  id
                ],
                (err5) => {
                  if (err5) {
                    console.log(err5);
                    reject(Service.rejectResponse('Database error', 500));
                    return;
                  }

                  // SELECT final estilo profesor
                  connection.query('SELECT * FROM event WHERE id = ?', [id], (err6, resFinal) => {
                    if (err6) {
                      console.log(err6);
                      reject(Service.rejectResponse('Database error', 500));
                    } else {
                      resolve(Service.successResponse(resFinal[0]));
                    }
                  });
                }
              );
            }
          );
        });
      });
    });

  } catch (e) {
    reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
  }
});

/**
* Update room information
*
* id Integer 
* room Room 
* no response value expected for this operation
* */
const updateRoom = ({ id, body }) => new Promise(async (resolve, reject) => {
  try {
    const room = body;
    const { name, capacity, building, description } = room;

    connection.query('SELECT * FROM room WHERE id = ?', [id], (err, existing) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      if (!existing[0]) {
        return reject(Service.rejectResponse('Room not found', 404));
      }

      connection.query(
        'SELECT * FROM room WHERE name = ? AND id != ?',
        [name, id],
        (err, conflict) => {

          if (err) {
            console.log(err);
            return reject(err);
          }

          if (conflict.length > 0) {
            return reject(
              Service.rejectResponse(
                'Room name already exists',
                409
              )
            );
          }

          connection.query(
            'UPDATE room SET name = ?, capacity = ?, building = ?, description = ? WHERE id = ?',
            [name, capacity, building, description || null, id],
            (err, res) => {

              if (err) {
                console.log(err);
                return reject(err);
              }

              console.log(res);

              if (res.affectedRows === 0) {
                return reject(Service.rejectResponse('Room not found', 404));
              }
              resolve(
                Service.successResponse({
                  id,
                  name,
                  capacity,
                  building,
                  description: description || null
                })
              );
            }
          );
        }
      );
    });

  } catch (e) {
    reject(
      Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405
      )
  );
 }
});
/**
* Update an existing tag
*
* id Integer 
* tag Tag 
* no response value expected for this operation
* */
const updateTag = ({ id, body }) => new Promise(async (resolve, reject) => {
  try {
    const tag = body;

    if (!tag || !tag.name) {
      reject(Service.rejectResponse('Invalid data', 400));
      return;
    }

    // UPDATE
    connection.query(
      'UPDATE tag SET name = ? WHERE id = ?',
      [tag.name, id],
      (err, res) => {
        if (err) {
          console.log(err);
          reject(Service.rejectResponse('Database error', 500));
        } else if (!res.affectedRows) {
          // nadie actualizado → no existe
          reject(Service.rejectResponse('Tag not found', 404));
        } else {
          console.log(res);

          // SELECT final para devolver el tag actualizado (igual que updateSchedule)
          connection.query(
            'SELECT * FROM tag WHERE id = ?',
            [id],
            (err2, res2) => {
              if (err2) {
                console.log(err2);
                reject(Service.rejectResponse('Database error', 500));
              } else {
                console.log(res2[0]);
                resolve(Service.successResponse(res2[0]));
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

