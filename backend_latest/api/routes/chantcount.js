const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Chant = require("../models/chantmodel");



router.get("/", (req, res, next) => {
    Chant.find()
    .select("_id user_id date_slokam slokam count_slokam timestamp")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            user_id: doc.user_id,
            date_slokam: doc.date_slokam,
            slokam: doc.slokam,
            count_slokam: doc.count_slokam,
            timestamp:doc.timestamp,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/chant/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const chant = new Chant({
    _id: new mongoose.Types.ObjectId(),
    user_id: req.body.user_id,
    date_slokam: req.body.date_slokam, 
    slokam: req.body.slokam,
    count_slokam: req.body.count_slokam,
    timestamp:req.body.timestamp,
  });
  chant 
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created chant successfully",
        createdChant: {
            user_id: result.user_id,
            date_slokam: result.date_slokam, 
            slokam: result.slokam,
            count_slokam: result.count_slokam,
            timestamp:result.timestamp,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/chant/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  Chant.findById(id)
    .select('user_id date_slokam slokam count_slokam timestamp _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            chant: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/chant'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});




router.patch("/:userId", (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Chant.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Chant updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/chant/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  Chant.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Chant deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/chant',
              body: { user_id: 'String', date_slokam: 'String', slokam: 'String', count_slokam: 'Number', timestamp:'String' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//testing
/*const query=db.chants.group({
    "initial": {
        "total_sloka": 0
    },
    "reduce": function(obj, prev) {
        prev.total_sloka = prev.total_sloka + obj.count_slokam - 0;
    },
    "cond": {
        "user_id": {
            "$in": ["5c5e2ac9fe2ae961fc655733"]
        },
        "slokam": {
            "$in": ["Lalitha Sahasranamam"]
        }
    }
});*/

router.post("/count", (req, res, next) => {
    Chant.find({user_id:req.body.user_id, slokam:req.body.slokam});
    Chant.aggregate([
        { "$match": {
            user_id:req.body.user_id,
            slokam:req.body.slokam
            
        }},
        { "$group": {
            _id : null,

            "total": { "$sum": "$count_slokam" }
            
        }}
    ],
    function(err, result) {
        console.log(result);
        if (err) {
            res.send(400, err);
        } else {
            
           // return res.send(200, result);
            return res.status(200).json({
                message: "Updated successfully",
                Updated: result
              });
        }
    });
    //Chant.where("count_slokam").gte(2).lte(4).
    //.exec()

    /*Chant. 
    Model.aggregate([
      
        "totalValue": { "$sum": "$count_slokam" }
    
],.exec()*/
    
/*     .where("user_id").equals() */
   /* query().count().
    where('user_id').equals(req.body.user_id).
    where('slokam').equals(req.body.slokam). 
    select('count_slokam') 
    .exec()
    .then(result => {
        return res.status(200).json({
          message: "successful",
          createdcount: {
            total_count: total_sloka 
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });*/
  });


module.exports = router;