CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       first_name VARCHAR(50) NOT NULL,
                       last_name VARCHAR(50) NOT NULL,
                       role VARCHAR(20) NOT NULL DEFAULT 'USER',
                       is_active BOOLEAN NOT NULL DEFAULT TRUE,
                       last_login_at TIMESTAMP,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP,
                       created_by VARCHAR(50),
                       updated_by VARCHAR(50)
);

-- Varsayılan sistem yöneticisi (Şifre: admin123, BCrypt hashli)
INSERT INTO users (username, email, password, first_name, last_name, role, is_active, created_by)
VALUES (
           'admin',
           'admin@portal.local',
           '$2a$10$7Z8KqD.2vV4cQ1kG7n8o9e3.O8F1aQ0W9d8s7g6h5j4k3l2m1n0o.',
           'System',
           'Admin',
           'ADMIN',
           TRUE,
           'SYSTEM'
       );