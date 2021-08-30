const express = require('express');
const router = express.Router();

// Models
const Producto = require('../models/Productos');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Note
router.get('/productos/add', isAuthenticated, (req, res) => {
  res.render('productos/new-productos');
});

router.post('/productos/new-productos', isAuthenticated, async (req, res) => {
  const { title, description, cantidad, marca, modelo, precio, tipop } = req.body;
  const errors = [];
  if (!title) {
    errors.push({text: 'Porfavor inserte un titulo'});
  }
  if (!description) {
    errors.push({text: 'Porfavor inserte una descricpión'});
  }
  if (!cantidad) {
    errors.push({text: 'Porfavor inserte una cantidad'});
  }
  if (!marca) {
    errors.push({text: 'Porfavor inserte la marca'});
  }
  if (!modelo) {
    errors.push({text: 'Porfavor inserte el modelo'});
  }
  if (!precio) {
    errors.push({text: 'Porfavor inserte el precio'});
  }
  if (!tipop) {
    errors.push({text: 'Porfavor seleccione el tipo de producto'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      title,
      description,
      cantidad,
      marca,
      modelo,
      precio,
      tipop
    });
  } else {
    const newProducto = new Producto({title, description, cantidad, marca, modelo, precio, tipop});
    newProducto.user = req.user.id;
    await newProducto.save();
    req.flash('success_msg', 'Producto añadido correctamente');
    res.redirect('/productos');
  }
});

// Obtener todos los productos
router.get('/productos', isAuthenticated, async (req, res) => {
  const producto = await Producto.find({user: req.user.id}).sort({date: 'desc'});
  res.render('productos/all-productos', { producto });
});

// Editar productos
router.get('/productos/edit/:id', isAuthenticated, async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  if(producto.user != req.user.id) {
    req.flash('error_msg', 'No esta autorizado');
    return res.redirect('/productos');
  } 
  res.render('productos/edit-productos', { producto });
});

router.put('/productos/edit-productos/:id', isAuthenticated, async (req, res) => {
  const { title, description, cantidad, marca, modelo, precio, tipop } = req.body;
  await Producto.findByIdAndUpdate(req.params.id, {title, description, cantidad, marca, modelo, precio, tipop});
  req.flash('success_msg', 'Producto actualizado sastifactoriamente');
  res.redirect('/productos');
});

// Eliminar Productos
router.delete('/productos/delete/:id', isAuthenticated, async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Producto eliminado sastifactoriamente');
  res.redirect('/productos');
});

module.exports = router;