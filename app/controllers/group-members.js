/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Members = mongoose.model('group-members'),
    _ = require('underscore');

/**
 * Find member by id
 */
exports.member = function(req, res, next, id){
    Members.load(id, function(err, member) {
        if (err) return next(err);
        if(!member) return next(new Error('Failed to load group member' + id));
        req.member = member;
        next();
    });
};

/**
 * Add a group member
 */
 exports.add = function(req, res) {
    var member = new Members(req.body);
    member.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                member: member
            });
        } else {
            res.jsonp(member);
        }
    });
 };

 /**
  * Edit a group member
  */
exports.edit = function(req, res) {
    var member = req.member;
    member = _.extend(member, req.body);

    member.save(function(err){
        res.jsonp(member);
    });
};

/**
 * Remove a member
 */
exports.destroy = function(req, res) {
    var member = req.member;

    member.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(member);
        }
    });
};

/**
 * List members
 */
exports.all = function(req, res) {
    Members.find().sort('-added').populate('group', 'name').exec(function(err, members){
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(members);
        }
    });
};
