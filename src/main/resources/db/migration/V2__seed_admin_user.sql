INSERT INTO users (
    username,
    email,
    password,
    first_name,
    last_name,
    role,
    is_active,
    created_at,
    updated_at,
    created_by,
    updated_by
) VALUES (
             'admin',
             'admin@corporate.com',
             '$2a$10$e8wFvZG0w4fWvC.rA9zVlOWFfO1Z5KqE/9RjA2zW8Z1yF6u3g1q2a',
             'Sistem',
             'Yöneticisi',
             'ADMIN',
             true,
             CURRENT_TIMESTAMP,
             CURRENT_TIMESTAMP,
             'SYSTEM',
             'SYSTEM'
         ) ON CONFLICT (username) DO NOTHING;