const db = require ('../config/db');

const bcrypt = require('bcryptjs'); // Import bcryptjs



exports.registerController = (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)";

  const { name, email, password } = req.body;

  // Optionally, set role based on email or other conditions
  const role = email === "muji@gmail.com" ? "admin" : "user"; // Example: make a specific email an admin

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    db.query(sql, [name, email, hashedPassword, role], (err, data) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      return res.status(200).json({ message: 'Registered successfully' });
    });
  });
};


exports.loginController = (req, res) => {
  const sql = 'SELECT * FROM login WHERE email = ?';
  const { email, password } = req.body;


 
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error' });
    }


    if (data.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

   
    bcrypt.compare(password, data[0].password, (err, isMatch) => {
      if (err) {
        
        return res.status(500).json({ message: 'Server error' });
      }

    
      req.session.user = {
        id: data[0].id,
        email: data[0].email,
        name: data[0].name, 
        role: data[0].role,
        
      };

      res.status(200).json({ message: 'Logged in successfully' });
    });
  });
};

  exports.checkSessionController = (req, res) => {
    if (req.session && req.session.user) {
      return res.status(200).json({ 
        message: "Session exists", 
        user: req.session.user 
      });
    } else {
      return res.status(401).json({ message: "No session" });
    }
  };



  exports.updateController = (req, res) => {
    const { email, name, password } = req.body; // Fields to update
    const userId = req.session.user?.id; // Assume the session stores the user's ID
  
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Please log in.' });
    }
  
    // Ensure there is data to update
    if (!email && !name && !password) {
      return res.status(400).json({ message: 'No data provided to update.' });
    }
  
    // Build the SQL query dynamically
    const updates = [];
    const values = [];
  
    if (email) {
      updates.push('email = ?');
      values.push(email);
    }
    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
      updates.push('password = ?');
      values.push(hashedPassword);
    }
  
    // Add userId to the values array (for the WHERE clause)
    values.push(userId);
  
    // Construct the final SQL query
    const sql = `UPDATE login SET ${updates.join(', ')} WHERE id = ?`;
  
    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating the user:', err);
        return res.status(500).json({ message: 'Server error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({ message: 'Profile updated successfully.' });
    });
  };


  

  
  exports.logoutController = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid'); // Replace 'connect.sid' if you've named your cookie differently
        return res.status(200).json({ message: 'Logged out successfully' });
    });
};

