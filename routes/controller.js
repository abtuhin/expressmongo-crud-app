var Vehicle = require('../models/vehicle.js');

module.exports = function(app){

  findAllVehicles = function(req, res){
    console.log("GET - /vehicle");
    return Vehicle.find(function(err, vehicles){
      if(!err){
        return res.send(vehicles);
      }else{
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({error: 'Server Error'});
      }
    });
  }

  findById = function(req, res){
    console.log('GET - /vehicle/:id');
    return Vehicle.findById(req.params.id, function(err, vehicle){
      if(!vehicle){
        res.statusCode = 500;
        return res.send({error: 'Not Found'});
      }
      if(!err){
        return res.send({status: 'OK', vehicle: vehicle});
      }
      else{
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({error: 'Server Error'});
      }
    });
  }


  addVehicle = function(req, res){
    console.log('POST - /vehicle');

    var vehicle = new Vehicle({
      trademark : req.body.trademark,
      model     : req.body.model,
      series    : req.body.series

    });

    vehicle.save(function(err){
      if(err){
        console.log('Error while saving vehicle '+ err);
        res.send({error: err});
        return;
      }else{
        console.log("vehicles created");
        return res.send({status: 'OK', vehicle: vehicle});
      }
    })

  }

  updateVehicle = function(req, res){
    console.log('PUT - /vehicle/:id');
    return Vehicle.findById(req.params.id, function(err, vehicle){
      if(!vehicle){
        res.statusCode = 404;
        return res.send({error: 'Not Found'});
      }
      if(req.body.trademark != null){
        vehicle.trademark = req.body.trademark;
      }
      if(req.body.model != null){
        vehicle.model = req.body.model;
      }
      if(req.body.series != null){
        vehicle.series = req.body.series;
      }

      return vehicle.save(function(err){
        if(!err){
          console.log("updated");
          return res.send({status: 'OK', vehicle: vehicle});
        }else{
          if(err.name == 'Validation error'){
            res.statusCode =400;
            res.send({error: 'Validation Error'});
          }else{
            res.statusCode = 500;
            res.send({error: 'Server Error'});
          }
          console.log('Internal Error(%d): %s', res.statusCode, err.message);
        }
        res.send(vehicle);
      });
    });
  }


  deleteVehicle = function(req, res){
    console.log('DELETE - /vehicle/:id');

    return Vehicle.findById(req.params.id, function(err, vehicle){
      if(!vehicle){
        res.statusCode = 404;
        return res.send({error: 'Not Found'});
      }

      return vehicle.remove(function(err){
        if(!err){
          console.log('Remove Vehicle');
          return res.send({status: 'OK'});
        }else{
          res.statusCode = 500;
          console.log('Internal Error(%d): %s', res.statusCode, err.message);
          return res.send({error: 'Server Error'});
        }
      })
    });
  }

  app.get('/vehicle', findAllVehicles);
  app.get('/vehicle/:id', findById);
  app.post('/vehicle', addVehicle);
  app.put('/vehicle/:id', updateVehicle);
  app.delete('/vehicle/:id', deleteVehicle);



}
