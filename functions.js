module.exports = function(models) {

    var view = function(req, res, next) {
        var nameOf = req.params.waitorsName;
        res.render("names", {
            usename: nameOf
        })

    }

    var add = function(req, res, next) {
        var nameOf = req.params.waitorsName;
        var shifts = req.body.week
        models.Waitor.create({
            name: nameOf,
            days: shifts
        }, function(err, results) {
            if (err) {
                return next(err)
            }

        })
        console.log(shifts);
        res.render("names", {
            usename: nameOf
        })
    }

    var workdays = function(req, res, next) {

        var monday = [];
        var tuesday = []
        models.Waitor.find({}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
console.log(result);

                var waiterList = result;
                for (var i = 0; i < waiterList.length; i++) {

                  if (waiterList[i].days.indexOf("Monday") > -1) {
                    monday.push(waiterList[i])
                    console.log("Monday "+waiterList[i].name);
                  }
                  else if (waiterList[i].days.indexOf("Tuesday") > -1) {
                      monday.push(waiterList[i])
                      console.log("Tuesday "+waiterList[i].name);
                  }
                  // return monday;
                }


                    res.render('schedule', {
                    monday: monday,
                    tuesday:tuesday

                });
            }

        });



    }

    return {
        add,
        view,
        workdays
    }


}
