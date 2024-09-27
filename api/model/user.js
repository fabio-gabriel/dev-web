const DataAccessor = require("../services/data_accessor.js");
const bcrypt = require("bcrypt");
class User {
  /**
   * @param id
   * @param cpf
   * @param role
   * @param name
   * @param email
   * @param password
   * @param username
   */

  constructor(cpf, role, name, email, password, username) {
    this.cpf = cpf;
    this.role = role;
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
  }

  save() {
    if (this.id == null) {
      const data = User.create({
        cpf: this.cpf,
        role: this.role,
        name: this.name,
        email: this.email,
        password: this.password,
        username: this.username,
      });
      this.id = data.id;
    } else {
      return this.update({});
    }
  }

  static create = ({
    cpf = null,
    role = null,
    name = null,
    email = null,
    password = null,
    username = null,
  }) => {
    const db = new DataAccessor("users");
    password = cryptography(password);
    const json = generate_json(cpf, role, name, email, password, username);
    json["deleted"] = "false";

    let data = db.create(json);
    let user = new User(
      data["cpf"],
      data["role"],
      data["name"],
      data["email"],
      data["password"],
      data["username"]
    );
    user.id = data["id"];

    return user;
  };

  update = ({
    cpf = null,
    role = null,
    name = null,
    email = null,
    password = null,
    username = null,
  }) => {
    const db = new DataAccessor("users");

    if (cpf == null) {
      cpf = this.cpf;
    }
    if (role == null) {
      role = this.role;
    }
    if (name == null) {
      name = this.name;
    }
    if (email == null) {
      email = this.email;
    }
    if (password == null) {
      password = this.password;
    } else {
      password = cryptography(password);
    }
    if (username == null) {
      username = this.username;
    }

    const json = generate_json(
      cpf,
      role,
      name,
      email,
      password,
      username,
      this.id
    );

    json["deleted"] = "false";
    let data = db.update(json);

    this.cpf = data["cpf"];
    this.role = data["role"];
    this.name = data["name"];
    this.email = data["email"];
    this.password = data["password"];
    this.username = data["username"];

    return this;
  };

  delete() {
    const db = new DataAccessor("users");
    db.delete(this.id);
    this.cpf = null;
    this.role = null;
    this.name = null;
    this.email = null;
    this.password = null;
    this.username = null;
    this.id = null;
  }

  json() {
    let json = {
      cpf: this.cpf,
      role: this.role,
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username,
      id: this.id,
    };
    return json;
  }

  static find(id) {
    const db = new DataAccessor("users");
    let data = db.find(id);
    let user = new User(
      data["cpf"],
      data["role"],
      data["name"],
      data["email"],
      data["password"],
      data["username"]
    );
    user.id = data["id"];

    return user;
  }

  static delete(id) {
    const db = new DataAccessor("users");
    db.delete(id);
  }

  static where = ({
    cpf = null,
    role = null,
    name = null,
    email = null,
    username = null,
    deleted = null,
  }) => {
    const db = new DataAccessor("users");
    let users_cpfs_data = [];
    let users_roles_data = [];
    let users_names_data = [];
    let users_emails_data = [];
    let users_usernames_data = [];
    let users_deleted_data = [];
    let users_data = [];
    let users = [];

    if (cpf) {
      users_cpfs_data = db.where("cpf", cpf);
    }
    if (role) {
      users_roles_data = db.where("role", role);
    }
    if (name) {
      users_names_data = db.where("name", name);
    }
    if (email) {
      users_emails_data = db.where("email", email);
    }
    if (username) {
      users_usernames_data = db.where("username", username);
    }
    if (deleted) {
      users_deleted_data = db.where("deleted", deleted);
    }

    users_data = users_cpfs_data.concat(
      users_roles_data,
      users_names_data,
      users_emails_data,
      users_usernames_data,
      users_deleted_data
    );

    if (cpf) {
      users_data = users_data.filter((element) => element["cpf"].includes(cpf));
    }
    if (role) {
      users_data = users_data.filter((element) =>
        element["role"].includes(role)
      );
    }
    if (name) {
      users_data = users_data.filter((element) =>
        element["name"].includes(name)
      );
    }
    if (email) {
      users_data = users_data.filter((element) =>
        element["email"].includes(email)
      );
    }
    if (username) {
      users_data = users_data.filter((element) =>
        element["username"].includes(username)
      );
    }
    if (deleted) {
      users_data = users_data.filter((element) =>
        element["deleted"].includes(deleted)
      );
    }

    users_data = users_data.filter(
      (arr, index, self) => index === self.findIndex((t) => t.id === arr.id)
    );

    users = users_data.map((data) => {
      let instanced_user = new User(
        data["cpf"],
        data["role"],
        data["name"],
        data["email"],
        data["password"],
        data["username"]
      );
      instanced_user.id = data["id"];

      return instanced_user;
    });

    return users;
  };

  static all() {
    const db = new DataAccessor("users");
    let users_data = db.all();

    let users = users_data.map((data) => {
      let instanced_user = new User(
        data["cpf"],
        data["role"],
        data["name"],
        data["email"],
        data["password"],
        data["username"]
      );
      instanced_user.id = data["id"];

      return instanced_user;
    });

    return users;
  }

  valid(email = this.email) {
    const users_same_email = User.where({ email: email });

    if (users_same_email.length > 0) {
      if (users_same_email[0].id == this.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}

function generate_json(cpf, role, name, email, password, username, id = null) {
  return {
    id: id,
    cpf: cpf,
    role: role,
    name: name,
    email: email,
    password: password,
    username: username,
  };
}

function cryptography(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

module.exports = User;
