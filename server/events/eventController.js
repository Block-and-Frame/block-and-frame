var Event = require('./eventModel');
var Events = require('./eventCollection');

module.exports = {
  getAllEvents: function (req, res) {
    Event.fetchAll()
    .then(function (events) {
      res.status(200).send(events.models);
    })
    .catch(function (err) {
      console.error(err);
      res.sendStatus(500);
    });
  },

  getEventbyId: function (req, res) {
    Event.where({ id: req.params.eventId })
    .fetch()
    .then(function (event) {
      if (!event) {
        res.status(404);
      }
      else {
        res.status(200).send(event);
      }
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
  },

  // For now event info should be in the body and creator id should be in params
  // Creates event and puts creator's user.id and the event.id in events_users, sets is_creator to true for user.id who created the event
  createEvent: function (req, res) {
    var eventPointer;
    new Event({
      name: req.body.name,
      location: req.body.location,
      coordinates: req.body.coordinates,
      description: req.body.description,
    })
    .save()
    .then(function (event) {
      // create event and associate in junction table
      event.users()
      .attach(req.params.userId)
      .then(function (eventUser) {
        // update the "pivot" (the junction table)
        return eventUser.updatePivot({
          is_creator: true,
        });
      })
      .then(function (pivotStatus) {
        res.status(201).send(event);
      })
      .catch(function (err) {
        res.status(500).send(err);
      }); 
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
  },

  editEvent: function (req, res) {
    Event.where({ id: req.params.userId })
    .fetch()
    .then(function (event) {
      if (!event) {
        res.sendStatus(404);
      } else {
        event.save(req.body);
      }
    })
    .then(function (user) {
      res.status(200).send(user);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
  },

  deleteEvent: function (req, res) {
    Event.where({ id: req.params.eventId })
    .fetch()
    .then(function (event) {
      if (!event) {
        res.sendStatus(404);
      } else {
        event.destroy()
        .then(function (event) {
          res.sendStatus(200);
        });
      }
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
  },
};
