-- database/init.sql

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  by_user VARCHAR(255),
  locate VARCHAR(255),
  category VARCHAR(255),
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_anonymous BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pendiente',
  FOREIGN KEY (by_user) REFERENCES users(email) ON DELETE SET NULL
);
