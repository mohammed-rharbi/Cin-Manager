const express = require('express');
const adminController = require('../controllers/adminControlle');
const { authMiddlware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Middleware to ensure admin access for all routes
router.use(authMiddlware, isAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /api/admin/getUserCustomers:
 *   get:
 *     summary: Retrieve a list of all customer users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of all customer users
 *       401:
 *         description: Unauthorized
 */
router.get('/getUserCustomers', adminController.getAllCustomers);

/**
 * @swagger
 * /api/admin/getUserAdmins:
 *   get:
 *     summary: Retrieve a list of all admin users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of all admin users
 *       401:
 *         description: Unauthorized
 */
router.get('/getUserAdmins', adminController.getAllAdmins);

/**
 * @swagger
 * /api/admin/createAdmin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
router.post('/createAdmin', adminController.RegisterAdmin);

/**
 * @swagger
 * /api/admin/updateAdmin/{id}:
 *   put:
 *     summary: Update an existing admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the admin to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Admin not found
 */
router.put('/updateAdmin/:id', adminController.updateAdmin);

/**
 * @swagger
 * /api/admin/deleteAdmin/{id}:
 *   delete:
 *     summary: Delete an admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the admin to delete
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Admin not found
 */
router.delete('/deleteAdmin/:id', adminController.deleteAdmin);

module.exports = router;
