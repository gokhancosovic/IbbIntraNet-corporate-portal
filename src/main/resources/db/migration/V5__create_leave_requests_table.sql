CREATE TYPE leave_type AS ENUM ('ANNUAL', 'SICK', 'UNPAID', 'MATERNITY', 'OTHER');
CREATE TYPE leave_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

CREATE TABLE leave_requests (
                                id BIGSERIAL PRIMARY KEY,
                                user_id BIGINT NOT NULL,
                                leave_type VARCHAR(20) NOT NULL,
                                status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                                start_date DATE NOT NULL,
                                end_date DATE NOT NULL,
                                reason TEXT,
                                rejection_reason TEXT,
                                approved_by BIGINT,
                                created_at TIMESTAMP NOT NULL,
                                updated_at TIMESTAMP NOT NULL,
                                created_by VARCHAR(50),
                                updated_by VARCHAR(50),
                                CONSTRAINT fk_leave_user FOREIGN KEY (user_id) REFERENCES users (id),
                                CONSTRAINT fk_leave_approver FOREIGN KEY (approved_by) REFERENCES users (id)
);

CREATE INDEX idx_leave_requests_user ON leave_requests(user_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);