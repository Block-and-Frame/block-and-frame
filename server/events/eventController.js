const Event = require('./eventModel');

const eventController = {
  getAllEvents(req, res) {
    Event.fetchAll({
      withRelated: [{ users(qb) {
        // NOTE Omiting password
        qb.column('email', 'username', 'bio', 'is_traveling', 'location', 'instagram_username', 'instagram_profile_pic', 'instagram_id');
      } }],
    })
    .then((events) => {
      // events have related users and can be found thru .relations
      // for example events.models[0].relations.users.models[0]
      // the user that created the event is indicated by "_pivot_is_creator": true
      res.status(200).send(events.models);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  },

  getEventbyId(req, res) {
    // main use is req.params.evenId
    Event.fetchAndPopulate({ id: req.eventId || req.params.eventId })
    .then((event) => {
      if (!event) {
        res.sendStatus(404);
      } else {
        res.status(200).send(event);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  // For now event info should be in the body and creator id should be in params
  // Creates event and puts creator's user.id and the event.id in events_users, sets is_creator to true for user.id who created the event
  createEvent(req, res, next) {
    if (req.body.hashtag[0] !== '#') {
      req.body.hashtag = `#${req.body.hashtag}`;
    }
    new Event({
      name: req.body.name,
      location: req.body.location,
      coordinates: req.body.coordinates,
      description: req.body.description,
      time: req.body.time,
      date: req.body.date,
      hashtag: req.body.hashtag,
      toBring: { contributions: req.body.toBring },
    })
    .save()
    .then((event) => {
      // create event and associate in junction table
      event.users()
      .attach(req.params.userId)
      .then((eventUser) => {
        // update the "pivot" (the junction table)
        return eventUser.updatePivot({
          is_creator: true,
        });
      })
      .then((pivotStatus) => {
        if (pivotStatus.add) {
          // assign 
          req.eventId = event.id;
          // reuse same function to get same event again
          // to an event with the user relations populated
          eventController.getEventbyId(req, res, next);
        } else {
          res.status(500).send(pivotStatus);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  editEvent(req, res) {
    Event
    .where({ id: req.params.eventId })
    .fetch()
    .then((event) => {
      if (!event) {
        res.sendStatus(404);
      } else {
        // TODO this probably wont updated event properly
        // Look at userController
        event.save(req.body);
      }
    })
    .then((event) => {
      res.status(200).send(event);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  deleteEvent(req, res) {
    Event.fetchAndPopulate({ id: req.params.eventId })
    .then((event) => {
      if (!event) {
        res.sendStatus(404);
      } else {
        event.destroy()
        .then(() => {
          res.sendStatus(200);
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },

  joinEvent(req, res) {
    Event.fetchAndPopulate({ id: req.params.eventId })
    .then((event) => {
      event
      .users()
      // attach pivot but leave is_creator null
      .attach(req.body.userId)
      .then((pivotStatus) => {
        res.status(200).send(pivotStatus);
      })
      .catch((err) => {
        // 23503 === user or event doesn exist
        // 23505 === user already attending or hosting event
        if (err.code === '23503' || err.code === '23505') {
          res.status(400).send(err);
        } else {
          res.status(500).send(err);
        }
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  },
};

module.exports = eventController;
