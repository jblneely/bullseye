var express = require('express');
var db = require('./../models');
var router = express.Router();
var moment = require('moment');
var async = require("async");
var isLoggedIn = require('../middleware/isLoggedIn');




// //Date to end of quarter
// moment("20170601", "YYYYMMDD").fromNow();


//GET /profile/index - all aims
router.get('/', function(req, res) {
    db.aim.findAll({
        where: { userId: req.user.id },
        include: [db.fire]
    }).then(function(aims) {
        res.render('profile', {
            aims: aims,
            myDataArray: [12, 19, 3, 5, 2, 3 /* fire.goal / fire.current */ ]
        });
    }).catch(function(err) {
        res.status(500).render('error');
    });
});
//GET /profile/new - display form to create new aim
router.get('/new', function(req, res) {
    res.render('new');
});
//GET /profile/:id - display a specific aim
router.get('/:id/edit', function(req, res) {
    db.aim.find({
        where: { id: req.params.id },
        include: [db.fire]
    }).then(function(aims) {
        console.log(aims);
        if (aims) {
            res.render('edit', { aims: aims });
        } else {
            res.status(404).render('error');
        }
    }).catch(function(err) {
        res.status(500).render('error');
    });
});
//GET FIRES
router.get('/fire/new/:aimId', function(req, res) {
    res.render('newFire', {
        aimId: req.params.aimId
    });



});
router.post('/fire/new', function(req, res) {
    console.log(req.body);
    db.aim.findById(req.body.aimId)
        .then(function(aim) {
            aim.createFire({
                keyResult: req.body.keyResult,
                goal: req.body.goal,
            }).then(function(post) {
                res.redirect('/profile');
            });
        });
});

router.post('/firecurrent', function(req, res) {

        console.log(req.body);
        db.fire.update({
            current: req.body.current
        }, {
            where: {
                id: req.body.fireId
            }
        }).then(function(fires) {
            console.log(fires)
            res.redirect('/profile');
        }).catch(function(err) {
            console.log(err)
        })
    })
    //findall fires where aimId is the aim id you are looking for and post them to /profile




router.get('/:id', function(req, res) {
    db.user.find({
        where: { id: req.user.id },
        include: [db.aim]
    }).then(function(user) {


        // async.forEachSeries(user.aims, function(c, callback) {
        //     //function that runs for each thing
        //     console.log("THING:", c);
        //     db.fire.find({
        //         where: { aimId: c.id }
        //     }).then(function(fire) {
        //         console.log(fire.keyResult);
        //         callback();
        //     });
        // }, function(data) {
        //     console.log("ALL DONE:", data);
        //     //Runs when everything is done
        //     res.redirect("/profile");
        // });





        // aims.getFires({
        //         include: [db.fire]
        //     }).then(function(fires) {
        //         console.log(fires)
        //         res.send('f');
        //     })
        // if (aim) {
        //     res.render('show', { aim: aim });
        // } else {
        //     res.status(404).render('error');
        // }
    }).catch(function(err) {
        res.status(500).render('error');
    });
});
router.get('/:id', function(req, res) {
    db.fire.findById(req.params.id).then(function(fire) {
        if (fire) {
            res.render('show', { fire: fire });
        } else {
            res.status(404).render('error');
        }
    }).catch(function(err) {
        res.status(500).render('error');
    });
});


router.put('/:id', function(req, res) {
    console.log('------HERE: ', req.body);
    db.aim.findById(req.params.id).then(function(aim) {
        if (aim) {
            aim.updateAttributes({
                objective: req.body.aim
            }).then(function() {
                for (var key in req.body) {
                    if (key !== "aim") {
                        console.log('---------', req.body[key]);
                        db.fire.findById(key).then(function(fire) {
                            fire.updateAttributes({
                                keyResult: req.body[key]
                            })
                        })
                    }
                }
                res.send({ msg: 'success' });
            });
        } else {
            res.status(404).send({ msg: 'error' });
        }
    }).catch(function(err) {
        res.status(500).send({ msg: 'error' });
    });
});

router.delete('/:id', function(req, res) {
    db.aim.findById(req.params.id).then(function(aim) {
        if (aim) {
            aim.destroy().then(function() {
                res.send({ msg: 'success' });
            });
        } else {
            res.status(404).send({ msg: 'error' });
        }
    }).catch(function(err) {
        res.status(500).send({ msg: 'error' });
    });
});
//post /profile --create a new aim
router.post('/', isLoggedIn, function(req, res) {
    console.log("REQ.BODY IN POST /profile", req.body);
    db.aim.create({
        objective: req.body.objective,
        userId: req.user.id
    }).then(function(aim) {
        //Get name/keyresult arrays into an array of objs
        var combined = [];

        res.redirect('/profile');

    }).catch(function(err) {
        console.log("ERROR:", err);
        res.send(err);
    });
});
// res.redirect('/profile');
module.exports = router;
