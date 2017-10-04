module.exports = function(models){

  var view = function(req, res, next){
    var nameOf = req.params.waitorsName;
    res.render("names", {usename:nameOf})

  }

var add = function(req, res, next){
var nameOf = req.params.waitorsName;
var shifts = req.body.week
models.Waitor.create({
  name:nameOf,
  days:shifts
}, function(err, results) {
  if (err) {
    return next(err)
  }
  // else {
  //   req.flash('error', 'Congratulations registration number plate has been added')
  // }
})
console.log(shifts);
res.render("names", {usename:nameOf})
}

var workdays = function(req, res, next){
  models.Waitor.find({}, function(err, results){
    if(err){
      return next(err)
    }
    console.log(workdays);
    res.render('schedule', {
      list: results
    });
  })
}

return{
  add,
  view,
  workdays
}


}
