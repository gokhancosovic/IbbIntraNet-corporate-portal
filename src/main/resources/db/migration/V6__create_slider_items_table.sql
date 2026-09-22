CREATE TABLE slider_items (
                              id BIGSERIAL PRIMARY KEY,
                              title VARCHAR(255) NOT NULL,
                              description VARCHAR(500),
                              image_url VARCHAR(255) NOT NULL,
                              target_url VARCHAR(255),
                              display_order INTEGER,
                              is_active BOOLEAN DEFAULT TRUE
);