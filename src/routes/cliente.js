const express = require ('express');
const router = express.Router();


//Base de datos clientes
const Clientes = require('../models/Clientes');

//Verificar
const { isAuthenticated } = require('../helpers/auth');

//New Cliente
router.get('/clientes/add', isAuthenticated, (req, res) =>{
	res.render('clientes/new-clientes');
});

router.post('/clientes/new-clientes', isAuthenticated, async (req, res) => {
	const { fullName, email, mobile, city } = req.body;
	const errors = [];
	if (!fullName) {
	  errors.push({text: 'Porfavor inserte su nombre'});
	}
	if (!email) {
	  errors.push({text: 'Porfavor inserte su Email'});
	}
	if (!mobile) {
		errors.push({text: 'Porfavor inserte su Numero telefonico'});
	  }
	  if (!city) {
		errors.push({text: 'Porfavor inserte su Ciudad'});
	  }
	if (errors.length > 0) {
	  res.render('clientes/new-clientes', {
		errors,
		fullName,
		email,
		mobile,
		city
	  });
	} else {
	  const newClientes = new Clientes({fullName,email,mobile,city});
	  newClientes.user = req.user.id;
	  await newClientes.save();
	  req.flash('success_msg', 'Cliente añadido con exito');
	  res.redirect('/clientes');
	}
  });


//Get todos los clientes
router.get('/clientes', isAuthenticated, async (req, res) => {
	const clientes = await Clientes.find({user: req.user.id}).sort({date: 'desc'});
	res.render('clientes/all-clientes', { clientes });
  });

// Edit Clientes
router.get('/clientes/edit/:id', isAuthenticated, async (req, res) => {
	const clientes = await Clientes.findById(req.params.id);
	if(clientes.user != req.user.id) {
	  req.flash('error_msg', 'No esta autorizado');
	  return res.redirect('/clientes');
	} 
	res.render('clientes/edit-clientes', { clientes });
  });

  router.put('/clientes/edit-clientes/:id', isAuthenticated, async (req, res) => {
	const { fullName, email, mobile, city } = req.body;
	await Clientes.findByIdAndUpdate(req.params.id, {fullName, email, mobile, city});
	req.flash('success_msg', 'Cliente actualizado sastifactoriamente');
	res.redirect('/clientes');
  }); 
  
  // Delete Notes
router.delete('/clientes/delete/:id', isAuthenticated, async (req, res) => {
	await Clientes.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Cliente eliminado sastifactoriamente');
	res.redirect('/clientes');
  });


module.exports = router;