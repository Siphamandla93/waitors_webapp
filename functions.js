module.exports = function(models) {

  var daysObject = function(shifts) {
      var dayMap = {};
      for (var i = 0; i < shifts.days.length; i++) {
          if (dayMap[shifts.days[i]] === undefined) {
              // dayMap[shift.days[i]] = 0;
              dayMap[shifts.days[i]] = "checked";
          }
      }
      return dayMap
  }

    var view = function(req, res, next) {


        models.Waitor.findOne({
            name: req.params.waitorsName
        }, function(err, results) {
            var dayShifts = {};
            if (results) {
                dayShifts = daysObject(results)
                console.log(req.params.waitorsName);
            }

            var nameOf = req.params.waitorsName;
            res.render("names", {
                usename: nameOf,
                days: dayShifts
            })

        });

    }



    var add = function(req, res, next) {
        var nameOf = req.params.waitorsName;
        var shifts = req.body.week

        models.Waitor.create({
            days: shifts,
            name: nameOf
        }, function(err, results) {
            if (err) {
                if (err.code === 11000) {

                    console.log("asa");

                }
            } else {

                res.render("names", {
                    usename: nameOf,
                    weekDays: listDays
                })
            }

        })
        req.flash('error', 'You have succesfuly updated your days thank you');
        var listDays = req.body.week
        // res.render("names", {
        // })
        // console.log(shifts);

    }



    var workdays = function(req, res, next) {


        var monday = [];
        var tuesday = []
        var wednesday = []
        var thursday = []
        var friday = []
        var saturday = []
        var sunday = []


        models.Waitor.find({}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                // console.log(result);

                var waiterList = result;
                for (var i = 0; i < waiterList.length; i++) {

                    if (waiterList[i].days.indexOf("Monday") > -1) {
                        monday.push(waiterList[i])
                        console.log("Monday " + waiterList[i].name);
                    } else if (waiterList[i].days.indexOf("Tuesday") > -1) {
                        tuesday.push(waiterList[i])
                        console.log("Tuesday " + waiterList[i].name);
                    } else if (waiterList[i].days.indexOf("Wednesday") > -1) {
                        wednesday.push(waiterList[i])
                        console.log("Wednesday " + waiterList[i].name);
                    } else if (waiterList[i].days.indexOf("Thursday") > -1) {
                        thursday.push(waiterList[i])
                        console.log("Thursday " + waiterList[i].name);
                    } else if (waiterList[i].days.indexOf("Friday") > -1) {
                        friday.push(waiterList[i])
                        console.log("Friday " + waiterList[i].name);
                    } else if (waiterList[i].days.indexOf("Saturday") > -1) {
                        saturday.push(waiterList[i])
                        console.log("Saturday " + waiterList[i].name);
                    } else if (waiterList[i].days.indexOf("Sunday") > -1) {
                        sunday.push(waiterList[i])
                        console.log("Sunday " + waiterList[i].name);
                    } else {
                        req.flash('error', 'DataBase has been seccessfuly reseted thank you')
                    }
                    // return monday;
                }
            }

            var color = [{
                    monColor: ""
                },
                {
                    tueColor: ""
                },
                {
                    wedColor: ""
                },
                {
                    thuColor: ""
                },
                {
                    friColor: ""
                },
                {
                    satColor: ""
                },
                {
                    sunColor: ""
                }
            ]


            if (monday.length < 3) {
                color[0].monColor = 'orange'
            } else if (monday.length === 3) {
                color[0].monColor = 'green'
            } else if (monday.length > 3) {
                color[0].monColor = 'red'
            }


            if (tuesday.length < 3) {
                color[1].tueColor = 'orange'
            } else if (tuesday.length === 3) {
                color[1].tueColor = 'green'
            } else if (tuesday.length > 3) {
                color[1].tueColor = 'red'
            }

            if (wednesday.length < 3) {
                color[2].wedColor = 'orange'
            } else if (wednesday.length === 3) {
                color[2].wedColor = 'green'
            } else if (wednesday.length > 3) {
                color[2].wedColor = 'red'
            }


            if (thursday.length < 3) {
                color[3].thuColor = 'orange'
            } else if (thursday.length === 3) {
                color[3].thuColor = 'green'
            } else if (thursday.length > 3) {
                color[3].thuColor = 'red'
            }



            if (friday.length < 3) {
                color[4].friColor = 'orange'
            } else if (friday.length === 3) {
                color[4].friColor = 'green'
            } else if (friday.saturdayth > 3) {
                color[4].friColor = 'red'
            }


            if (saturday.length < 3) {
                color[5].satColor = 'orange'
            } else if (saturday.length === 3) {
                color[5].satColor = 'green'
            } else if (saturday.length > 3) {
                color[5].satColor = 'red'
            }


            if (sunday.length < 3) {
                color[6].sunColor = 'orange'
            } else if (sunday.length === 3) {
                color[6].sunColor = 'green'
            } else if (sun.length > 3) {
                color[6].sunColor = 'red'
            }



            console.log('COLOR:', color);
            // console.log('COLOR:',tueColor);


            res.render('schedule', {
                Monday: monday,
                Tuesday: tuesday,
                Wednesday: wednesday,
                Thursday: thursday,
                Friday: friday,
                Saturday: saturday,
                Sunday: sunday,
                colorM: color[0].monColor,
                colorT: color[1].tueColor,
                colorW: color[2].wedColor,
                colorTH: color[3].thuColor,
                colorF: color[4].friColor,
                colorS: color[5].satColor,
                colorSU: color[6].sunColor


            });

        });


    }


    return {
        add,
        view,
        workdays
    }
};
