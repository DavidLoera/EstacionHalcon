const express = require ('express');
const router = express.Router();

//Base de datos compras
const Compras = require('../models/Compras');

//Autentifacador
const { isAuthenticated } = require('../helpers/auth');

//New Compra
router.get('/compras/add', isAuthenticated, (req, res) =>{
	res.render('compras/new-compras');
});

//POST para anadir compras
router.post('/compras/new-compras', isAuthenticated, async (req, res) => {
	const { producto, valor, date, cantidad, noserie,proveedor,usuario } = req.body;
	const errors = [];
	if (!producto) {
	  errors.push({text: 'Porfavor inserte el nombre del producto'});
	}
	if (!valor) {
	  errors.push({text: 'Porfavor inserte un monto'});
	}
	if (!date) {
		errors.push({text: 'Porfavor inserte una fecha valida'});
	  }
	  if (!cantidad) {
		errors.push({text: 'Porfavor inserte el la cantidad de dispositivos vendidos'});
      }
      if (!noserie) {
		errors.push({text: 'Porfavor inserte el numero de serie del dispositivo'});
	  }
	  if (!proveedor) {
		errors.push({text: 'Porfavor inserte el nombre del proveedor'});
	  } 
	  if (!usuario) {
		errors.push({text: 'Porfavor inserte el nombre del vendedor'});
	  }  
	if (errors.length > 0) {
	  res.render('compras/new-compras', {
		errors,
		producto,
		valor,
		date,
        cantidad,
		noserie,
		proveedor,
		usuario
	  });
	} else {
	  const newCompras = new Compras({producto,valor,date,cantidad, noserie,proveedor,usuario});
	  newCompras.user = req.user.id;
	  await newCompras.save();
	  req.flash('success_msg', 'Compra añadida con exito');
	  res.redirect('/compras');
	}
  });

  //Get todas las compras
router.get('/compras', isAuthenticated, async (req, res) => {
	const compras = await Compras.find({user: req.user.id}).sort({date: 'desc'});
	res.render('compras/all-compras', { compras });
  });

  // Edit Compras
router.get('/compras/edit/:id', isAuthenticated, async (req, res) => {
	const compras = await Compras.findById(req.params.id);
	if(compras.user != req.user.id) {
	  req.flash('error_msg', 'No esta autorizado');
	  return res.redirect('/compras');
	} 
	res.render('compras/edit-compras', { compras});
  });

  router.put('/compras/edit-compras/:id', isAuthenticated, async (req, res) => {
	const { producto, valor, date,cantidad,noserie,proveedor,usuario } = req.body;
	await Compras.findByIdAndUpdate(req.params.id, {producto, valor, date,cantidad,noserie,proveedor,usuario});
	req.flash('success_msg', 'Compra actualizada sastifactoriamente');
	res.redirect('/compras');
  }); 

    // Delete Notes
router.delete('/compras/delete/:id', isAuthenticated, async (req, res) => {
	await Compras.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Compra eliminada sastifactoriamente');
	res.redirect('/compras');
  });


module.exports = router;