const db = require ('../config/db');

exports.getUserController =(req ,res )=>{
    const userId = req.session.user?.id;

    const sql = "SELECT * FROM login WHERE id= ?";

    db.query(sql, [userId], (err, data) => {
        if (err) {
          console.error('Error querying the database:', err);
          return res.status(500).json({ message: 'Server error' });
        }
    
        if (data.length === 0) {
          return res.status(404).json({ message: 'User not found.' });
        }
    
        // Send the user data in the response
        res.status(200).json({ user: data[0] });
      });
    };