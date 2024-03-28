
import { readFile, writeFile } from "../utils/fs.helper.js";
import {resolve} from "path";
import jwt from "jsonwebtoken";
import { BCRYPT_SALT } from "../utils/constants.js";
import bcrypt from 'bcrypt';

class AuthController {
  signUp(req, res) {
    try {
      const PATH = resolve("db");
      const { name, password } = req.body;

      if (!name ) {
        return res.status(400).json({ error: "name is not valid" });
      }
      const users = readFile(PATH, "users.json");

      const hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT);
      
      
    
      
      const foundUser = users.find((u) => u.name == name );
      
      if (foundUser) {
        return res.status(400).json({ error: "user already exists" });
      }
      
        const dataUser = JSON.stringify([
          ...users,
          { id, name,  hashedPassword }
        ],
          null,
          2,
        );
        writeFile(PATH, "users.json", dataUser);
      } catch (error) {
        res.status(500).json({ error: error.mess });
  
    }
  }

  signIn(req, res) {
    try {
      const PATH = resolve("db");

      const users = readFile(PATH, "users.json");
      const user = users.find(
        (u) =>
        u.username == req.body.username
        );
        console.log(user);
        
        
        if (!user) {
          return res.status(404).json({ error: "user is not found" });
        }
        
        const compared = bcrypt.compareSync(req.body.password, user.hashedPassword)

        if (!compared) {
          return res.status(400).json({ error: "username or password invalid" });
        }
console.log(compared);



      const TOKEN = jwt.sign({ username: user.username });

      res.status(200).json({ data: TOKEN });
    } catch (error) {
      res.status(500).json({ error: error.mess });
    }
  }
}

export default new AuthController();
