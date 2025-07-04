const UserModel = require("./../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
 

  try {
    const { nombre, email, password_hash, rol } = req.body;

    const emailFind = await UserModel.findOneUserEmail(email);
    if (emailFind) {
      return res.status(409).json({ ok: false, msg: "Email already exists" });
    }

    const saltRounds = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password_hash, saltRounds);

    const userCreate = await UserModel.createUser(
      nombre,
      email,
      passwordHash,
      rol
    );

    return res.status(201).json({ ok: true, msg: userCreate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error during registration",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    if (!email || !password_hash) {
      return res.status(400).json({
        ok: false,
        msg: "Required fields: email and password",
      });
    }

    const foundUser = await UserModel.findOneUserEmail(email);
    if (!foundUser) {
      return res.status(401).json({ ok: false, msg: "Email not found" });
    }

    const matchPassword = await bcrypt.compare(
      password_hash,
      foundUser.password_hash
    );
    if (!matchPassword) {
      return res.status(401).json({ ok: false, msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: foundUser.usuario_id, rol: foundUser.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ ok: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error during login",
    });
  }
};

const profileUser = async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await UserModel.findOneUserEmail(email);
    if (!foundUser) {
      return res.status(404).json({ ok: false, msg: "User not found" });
    }

    return res.json({ ok: true, msg: foundUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error fetching profile",
    });
  }
};

const UserController = {
  register,
  login,
  profileUser,
};

module.exports = UserController;
