const express = require('express');
const router = express.Router();
const Click = require('../models/click.js');

router.get('/count', (req, res) => {
   Click.collection.aggregate( [
      { $count: "count" }
   ]).toArray((err, clicks) => {
      if (err) return res.send({error: err});
      const click  = clicks.shift() || { count: 0 };
      res.send(click);
   });
});

router.get('/aggregate', (req, res) => {
   Click.collection.aggregate(
       [
                  { $group : {
                      _id: {
                         year: { $year: "$ts" },
                         month: { $month: "$ts" },
                         day: { $dayOfMonth: "$ts" },
                         hour: { $hour: "$ts" },
                         minutes: { $minute: "$ts" },
                         dayOfYear: { $dayOfYear: "$ts" },
                         dayOfWeek: { $dayOfWeek: "$ts" },
                         week: { $week: "$ts" }
                      },
                      count: { $sum: 1 }
                     }
                  }
               ]
   ).toArray((err, clicks) => {
      if (err) return res.send({error: err});
      res.send(clicks.map(click => click.count));
   });
});

router.get('/heatmap', (req, res) => {
   Click.collection.find({}).toArray((err, clicks) => {
       if (err) return res.send({error: err});
       res.send(clicks.map(click => {
           return {x: click.pageX, y: click.pageY, value: 100}
       }));
    });
});

router.post('/', (req, res) => {
   const doc = {ts: +new Date, ...req.body};
   const click = new Click(doc);
   click.save().then(() => res.send({success: 'ok'}));
});

module.exports = router;