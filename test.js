bcrypt = require("bcryptjs");

bcrypt.hash('d', 10).then((password) => {
    console.log(password)
});

// bcrypt
//   .compare("d", "$2a$10$B8cfEETVj2F9JJofP1G92OuH/SI14bll.FuIeZuZmTwyujyNQhzAi")
//   .then((password) => {
//     console.log(password);
//   });

const crypto = require("crypto");

const generateJwtSecret = () => {
  // Generate a random 32-byte (256-bit) buffer
  const buffer = crypto.randomBytes(32);
  // Convert the buffer to a hex string
  const jwtSecret = buffer.toString("hex");
  return jwtSecret;
};

const jwtSecret = generateJwtSecret();

console.log("JWT Secret Key:", jwtSecret);
