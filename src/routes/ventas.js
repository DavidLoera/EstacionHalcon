const express = require ('express');
const router = express.Router();

//Base de datos ventas
const Ventas = require('../models/Ventas');

//autentificador
const { isAuthenticated } = require('../helpers/auth');

//New Venta
router.get('/ventas/add', isAuthenticated, (req, res) =>{
	res.render('ventas/new-ventas');
});

//POST para anadir compras
router.post('/ventas/new-ventas', isAuthenticated, async (req, res) => {
	const { cliente, producto, folio, valor, date,cantidad,noserie } = req.body;
	const errors = [];
	if (!cliente) {
	  errors.push({text: 'Porfavor inserte el nombre del cliente'});
	}
	if (!producto) {
	  errors.push({text: 'Porfavor inserte el nombre del producto'});
	}
	if (!folio) {
		errors.push({text: 'Porfavor inserte un folio'});
	  }
	  if (!valor) {
		errors.push({text: 'Porfavor inserte el valor del producto'});
      }
      if (!date) {
		errors.push({text: 'Porfavor inserte una fecha valida'});
	  }
	  if (!cantidad) {
		errors.push({text: 'Porfavor inserte los productos vendidos'});
	  } 
	  if (!noserie) {
		errors.push({text: 'Porfavor inserte el numero de serie'});
	  }  
	if (errors.length > 0) {
	  res.render('ventas/new-ventas', {
		errors,
		producto,
		valor,
		date,
        cantidad,
		noserie,
		cliente,
		folio
	  });
	} else {
	  const newVentas = new Ventas({cliente,producto,valor,date,cantidad,noserie,folio});
	  newVentas.user = req.user.id;
	  await newVentas.save();
	  req.flash('success_msg', 'Venta añadida con exito');
	  res.redirect('/ventas');
	}
  });

  //Get todas las ventas
router.get('/ventas', isAuthenticated, async (req, res) => {
	const ventas = await Ventas.find({user: req.user.id}).sort({date: 'desc'});
	res.render('ventas/all-ventas', { ventas });
  });


  // Edit Ventas
router.get('/ventas/edit/:id', isAuthenticated, async (req, res) => {
	const ventas = await Ventas.findById(req.params.id);
	if(ventas.user != req.user.id) {
	  req.flash('error_msg', 'No esta autorizado');
	  return res.redirect('/ventas');
	} 
	res.render('ventas/edit-ventas', { ventas});
  });

  router.put('/ventas/edit-ventas/:id', isAuthenticated, async (req, res) => {
	const { cliente,producto,valor,date,cantidad,noserie,folio } = req.body;
	await Ventas.findByIdAndUpdate(req.params.id, {cliente,producto,valor,date,cantidad,noserie,folio});
	req.flash('success_msg', 'Venta actualizada sastifactoriamente');
	res.redirect('/ventas');
  });
  
    // Delete Ventas
router.delete('/ventas/delete/:id', isAuthenticated, async (req, res) => {
	await Ventas.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Venta eliminada sastifactoriamente');
	res.redirect('/ventas');
  });



module.exports = router;