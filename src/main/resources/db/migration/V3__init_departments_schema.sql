CREATE TABLE departments (
                             id BIGSERIAL PRIMARY KEY,
                             name VARCHAR(100) NOT NULL UNIQUE,
                             description TEXT,
                             created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                             updated_at TIMESTAMP WITHOUT TIME ZONE,
                             created_by VARCHAR(50) NOT NULL,
                             updated_by VARCHAR(50)
);

ALTER TABLE users
    ADD COLUMN department_id BIGINT,
ADD CONSTRAINT fk_users_department
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL;

-- Varsayılan IT Departmanı
INSERT INTO departments (name, description, created_at, created_by)
VALUES ('Bilgi İşlem', 'Yazılım ve Donanım Departmanı', CURRENT_TIMESTAMP, 'SYSTEM');