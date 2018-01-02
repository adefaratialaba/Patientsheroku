var SERVER_NAME = 'patient-api'
var PORT = process.env.PORT;


var restify = require('restify')

  // Get a persistence engine for the users
  , patientsSave = require('save')('patients')

  // Get a persistence engine for the patients records
  , recordsSave = require('save')('records')
 
  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /patients')
  console.log(' /patients/:id')  
  console.log(' /patients/:id/records')  
  
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all patients in the system
server.get('/patients', function (req, res, next) {

  // Find every entity within the given collection
  patientsSave.find({}, function (error, patients) {
  

    // Return all of the patients in the system
    res.send(patients)
  })
})

// Get a single patient by their patient id
server.get('/patients/:id', function (req, res, next) {

  // Find a single patient by their id within save
  patientsSave.findOne({ _id: req.params.id }, function (error, patient) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (patient) {
      // Send the patient if no issues
      res.send(patient)
    } else {
      // Send 404 header if the patient doesn't exist
      res.send(404)
    }
  })
})

// Create a new patient
server.post('/patients', function (req, res, next) {

  // Make sure name is defined
  if (req.params.first_name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('first_name must be supplied'))
  }
  if (req.params.last_name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('last_name must be supplied'))
  }
  if (req.params.address === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('address must be supplied'))
  }
  if (req.params.date_of_birth === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('date_of_birth must be supplied'))
  }
  if (req.params.department === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('department must be supplied'))
  }
  if (req.params.doctor === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('doctor must be supplied'))
  }
  var newPatient = {
    first_name: req.params.first_name, 
    last_name: req.params.last_name,
    address: req.params.address,
    date_of_birth: req.params.date_of_birth,
    department: req.params.department,
    doctor: req.params.doctor,
   }
  // Create the patient using the persistence engine
  patientsSave.create( newPatient, function (error, patient) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the patient if no issues
    res.send(201, patient)
  })
})

// Delete patient with the given id
server.del('/patients/:id', function (req, res, next) {

  // Delete the patient with the persistence engine
  patientsSave.delete(req.params.id, function (error, patient) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})
// Get all patients records in the system
server.get('/patients/records', function (req, res, next) {
  
    // Find every entity within the given collection
    recordsSave.find({}, function (error, records) {
    
  
      // Return all of the patients records in the system
      res.send(records)
    })
  })
  
  // Get a single patient's records by their patient id
  server.get('/patients/:id/records', function (req, res, next) {
  
    // Find a single patient's by their id within save
    
    recordsSave.findOne({ patient_id: req.params.id }, function (error, record) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      if (record) {
        // Send the patient's record if no issues
        res.send(record)
      } else {
        // Send 404 header if the patient's record doesn't exist
        res.send(404)
      }
    })
  })
  
  // Create a new patient's records
  server.post('/patients/:id/records', function (req, res, next) {
  
    // Make sure patient_id is defined
   //if (req.params.patient_id === undefined ) {
      // If there are any errors, pass them to next in the correct format
     // return next(new restify.InvalidArgumentError('patient_id must be supplied'))
    //}
    if (req.params.date === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('date must be supplied'))
    }
    if (req.params.nurse_name === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('nurse_name must be supplied'))
    }
    if (req.params.type === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('type must be supplied'))
    }
    if (req.params.category === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('category must be supplied'))
    }
    if (req.params.readings === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('readings must be supplied'))
    }
    //if (req.params._id === undefined ) {
      // If there are any errors, pass them to next in the correct format
    // return next(new restify.InvalidArgumentError('type must be supplied'))
    //}
    var newRecord= {
     patient_id: req.params.id, 
      date: req.params.date,
      address: req.params.address,
      nurse_name: req.params.nurse_name,
      type: req.params.type,
      category: req.params.category,
      readings: req.params.readings,
    }
    // Create the patient records using the persistence engine
    recordsSave.create( newRecord, function (error, record) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send the patient if no issues
      res.send(201, record)
    })
  })
  

