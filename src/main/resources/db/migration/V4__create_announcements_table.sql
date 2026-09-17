CREATE TABLE announcements (
                               id BIGSERIAL PRIMARY KEY,
                               title VARCHAR(150) NOT NULL,
                               content TEXT NOT NULL,
                               is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
                               is_active BOOLEAN NOT NULL DEFAULT TRUE,
                               author_id BIGINT NOT NULL,
                               publish_at TIMESTAMP,
                               created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               created_by VARCHAR(50),
                               updated_by VARCHAR(50),
                               CONSTRAINT fk_announcements_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_announcements_active_pinned ON announcements (is_active, is_pinned, created_at DESC);