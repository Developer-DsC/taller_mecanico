const express = require('express');
const routerUsers = express.Router();
const UserController  = require("../controllers/user.controller");
const AuthMiddleware= require("../middlewares/authMiddleware");
const InventarioController = require('../controllers/inventario.controller');
const ClienteController = require('../controllers/cliente.controller');
const ServiceDetalleController = require('../controllers/service_detalle.controller')
const UsuarioController = require('../controllers/usuario.controller');

routerUsers.post('/register', UserController.register);
routerUsers.post('/login',UserController.login); 
routerUsers.get('/profileUser',AuthMiddleware,UserController.profileUser); 


routerUsers.post('/inventario', InventarioController.createInventario)
routerUsers.get('/inventarios', InventarioController.listInventarios)
routerUsers.put('/inventario/:id', InventarioController.updateInventario);
routerUsers.get('/inventario/filtrar/:id', InventarioController.listInventariosId);
routerUsers.delete('/inventario/:id', InventarioController.deleteInventario);
routerUsers.get('/inventarios/filter', InventarioController.filterInventarios);

routerUsers.post('/cliente', ClienteController.createCliente)
routerUsers.get('/clientes', ClienteController.listClientes)
routerUsers.put('/cliente/:id', ClienteController.updateCliente);
routerUsers.get('/cliente/filtrar/:id', ClienteController.listClienteId);
routerUsers.delete('/cliente/:id', ClienteController.deleteCliente);
routerUsers.get('/clientes/filter', ClienteController.filterClientes);


routerUsers.post('/servicio-detalle', ServiceDetalleController.createServiceDetalle)
routerUsers.get('/servicio-detalles', ServiceDetalleController.listServiceDetalle)
routerUsers.get('/servicios', ServiceDetalleController.listServicios)


routerUsers.get('/usuarios', UsuarioController.findAll);
routerUsers.get('/usuarios/filtrar/:id', UsuarioController.findById);
routerUsers.post('/usuarios/crear', UsuarioController.create);
routerUsers.put('/usuarios/editar/:id', UsuarioController.update);
routerUsers.delete('/usuarios/eliminar/:id', UsuarioController.remove);


module.exports = routerUsers;