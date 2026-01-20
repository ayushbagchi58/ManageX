const bcrypt = require("bcryptjs");

(async () => {
  const hash = await bcrypt.hash("Admin1234@", 10);
  console.log(hash);
})();
