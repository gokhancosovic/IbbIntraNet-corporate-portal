-- 1. Tablonun Oluşturulması
CREATE TABLE food_menus (
                            id BIGSERIAL PRIMARY KEY,
                            menu_date DATE NOT NULL CONSTRAINT uk_food_menus_date UNIQUE,
                            soup VARCHAR(100) NOT NULL,
                            main_course VARCHAR(100) NOT NULL,
                            side_dish VARCHAR(100) NOT NULL,
                            dessert_or_drink VARCHAR(100) NOT NULL,
                            created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP WITHOUT TIME ZONE
);

-- 2. 30 Günlük Menü Verisinin Eklenmesi (22 Eylül 2026 - 21 Ekim 2026)
INSERT INTO food_menus (menu_date, soup, main_course, side_dish, dessert_or_drink) VALUES
                                                                                       ('2026-09-22', 'Mercimek Çorbası', 'Tavuk Sote', 'Pirinç Pilavı', 'Ayran'),
                                                                                       ('2026-09-23', 'Ezogelin Çorbası', 'Kuru Fasulye', 'Bulgur Pilavı', 'Meyve'),
                                                                                       ('2026-09-24', 'Domates Çorbası', 'İzmir Köfte', 'Makarna', 'Sütlaç'),
                                                                                       ('2026-09-25', 'Yayla Çorbası', 'Fırında Tavuk', 'Patates Püresi', 'Ayran'),
                                                                                       ('2026-09-26', 'Tarhana Çorbası', 'Etli Nohut', 'Pirinç Pilavı', 'Komposto'),
                                                                                       ('2026-09-27', 'Şehriye Çorbası', 'Sebzeli Türlü', 'Bulgur Pilavı', 'Yoğurt'),
                                                                                       ('2026-09-28', 'Mercimek Çorbası', 'Etli Patates', 'Pirinç Pilavı', 'Meyve'),
                                                                                       ('2026-09-29', 'Domates Çorbası', 'Tavuk Haşlama', 'Makarna', 'Ayran'),
                                                                                       ('2026-09-30', 'Ezogelin Çorbası', 'Izgara Köfte', 'Bulgur Pilavı', 'Revani'),
                                                                                       ('2026-10-01', 'Yayla Çorbası', 'Etli Bezelye', 'Pirinç Pilavı', 'Yoğurt'),
                                                                                       ('2026-10-02', 'Tarhana Çorbası', 'Tavuk Şiş', 'Bulgur Pilavı', 'Ayran'),
                                                                                       ('2026-10-03', 'Mercimek Çorbası', 'Fırın Makarna', 'Salata', 'Meyve'),
                                                                                       ('2026-10-04', 'Domates Çorbası', 'Etli Kuru Fasulye', 'Pirinç Pilavı', 'Sütlaç'),
                                                                                       ('2026-10-05', 'Şehriye Çorbası', 'Tavuk Güveç', 'Bulgur Pilavı', 'Komposto'),
                                                                                       ('2026-10-06', 'Ezogelin Çorbası', 'Karnıyarık', 'Pirinç Pilavı', 'Ayran'),
                                                                                       ('2026-10-07', 'Yayla Çorbası', 'Etli Türlü', 'Makarna', 'Meyve'),
                                                                                       ('2026-10-08', 'Mercimek Çorbası', 'Tavuk Fırın', 'Patates Püresi', 'Yoğurt'),
                                                                                       ('2026-10-09', 'Tarhana Çorbası', 'Köfte', 'Bulgur Pilavı', 'Ayran'),
                                                                                       ('2026-10-10', 'Domates Çorbası', 'Etli Nohut', 'Pirinç Pilavı', 'Revani'),
                                                                                       ('2026-10-11', 'Şehriye Çorbası', 'Sebzeli Tavuk', 'Makarna', 'Meyve'),
                                                                                       ('2026-10-12', 'Ezogelin Çorbası', 'Etli Patates', 'Bulgur Pilavı', 'Komposto'),
                                                                                       ('2026-10-13', 'Yayla Çorbası', 'Tavuk Sote', 'Pirinç Pilavı', 'Ayran'),
                                                                                       ('2026-10-14', 'Mercimek Çorbası', 'İzmir Köfte', 'Makarna', 'Sütlaç'),
                                                                                       ('2026-10-15', 'Tarhana Çorbası', 'Etli Bezelye', 'Pirinç Pilavı', 'Meyve'),
                                                                                       ('2026-10-16', 'Domates Çorbası', 'Fırında Tavuk', 'Bulgur Pilavı', 'Yoğurt'),
                                                                                       ('2026-10-17', 'Şehriye Çorbası', 'Kuru Fasulye', 'Pirinç Pilavı', 'Ayran'),
                                                                                       ('2026-10-18', 'Ezogelin Çorbası', 'Tavuk Haşlama', 'Patates', 'Komposto'),
                                                                                       ('2026-10-19', 'Yayla Çorbası', 'Izgara Köfte', 'Bulgur Pilavı', 'Meyve'),
                                                                                       ('2026-10-20', 'Mercimek Çorbası', 'Etli Nohut', 'Pirinç Pilavı', 'Sütlaç'),
                                                                                       ('2026-10-21', 'Tarhana Çorbası', 'Tavuk Güveç', 'Makarna', 'Ayran');