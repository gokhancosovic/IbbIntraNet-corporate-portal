package com.example.corporateportal.service;

import com.example.corporateportal.dto.CreateFoodMenuRequest;
import com.example.corporateportal.dto.FoodMenuResponse;
import com.example.corporateportal.dto.UpdateFoodMenuRequest;
import com.example.corporateportal.entity.FoodMenu;
import com.example.corporateportal.repository.FoodMenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class FoodMenuService {

    private final FoodMenuRepository foodMenuRepository;

    // Türkiye saat dilimi sabiti (+03:00)
    private static final ZoneId TURKEY_ZONE = ZoneId.of("Europe/Istanbul");

    /**
     * Sadece bugünün menüsünü döner. Dışarıdan tarih parametresi almaz.
     */
    @Transactional(readOnly = true)
    public FoodMenuResponse getTodayMenu() {
        LocalDate todayInTurkey = LocalDate.now(TURKEY_ZONE);

        FoodMenu menu = foodMenuRepository.findByMenuDate(todayInTurkey)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Bugün (" + todayInTurkey + ") için yayınlanmış bir yemek menüsü bulunmamaktadır."
                ));

        return mapToResponse(menu);
    }

    /**
     * Yönetici: Yeni bir menü kaydeder.
     */
    @Transactional
    public FoodMenuResponse createMenu(CreateFoodMenuRequest request) {
        if (foodMenuRepository.existsByMenuDate(request.getMenuDate())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    request.getMenuDate() + " tarihine ait bir menü zaten mevcut!"
            );
        }

        FoodMenu menu = FoodMenu.builder()
                .menuDate(request.getMenuDate())
                .soup(request.getSoup())
                .mainCourse(request.getMainCourse())
                .sideDish(request.getSideDish())
                .dessertOrDrink(request.getDessertOrDrink())
                .build();

        FoodMenu saved = foodMenuRepository.save(menu);
        return mapToResponse(saved);
    }

    /**
     * Yönetici: Var olan bir menüyü günceller.
     */
    @Transactional
    public FoodMenuResponse updateMenu(Long id, UpdateFoodMenuRequest request) {
        FoodMenu menu = foodMenuRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Güncellenmek istenen menü bulunamadı (ID: " + id + ")"
                ));

        // Eğer tarih değiştiriliyorsa ve o yeni tarihte başka kayıt varsa çakışmayı önle
        if (!menu.getMenuDate().equals(request.getMenuDate()) &&
                foodMenuRepository.existsByMenuDate(request.getMenuDate())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    request.getMenuDate() + " tarihine ait başka bir menü bulunmaktadır."
            );
        }

        menu.setMenuDate(request.getMenuDate());
        menu.setSoup(request.getSoup());
        menu.setMainCourse(request.getMainCourse());
        menu.setSideDish(request.getSideDish());
        menu.setDessertOrDrink(request.getDessertOrDrink());

        return mapToResponse(menu);
    }

    /**
     * Yönetici: Menüyü siler.
     */
    @Transactional
    public void deleteMenu(Long id) {
        if (!foodMenuRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Silinmek istenen menü bulunamadı (ID: " + id + ")"
            );
        }
        foodMenuRepository.deleteById(id);
    }

    // Entity -> DTO Dönüştürücü (Mapping)
    private FoodMenuResponse mapToResponse(FoodMenu menu) {
        return FoodMenuResponse.builder()
                .id(menu.getId())
                .menuDate(menu.getMenuDate())
                .soup(menu.getSoup())
                .mainCourse(menu.getMainCourse())
                .sideDish(menu.getSideDish())
                .dessertOrDrink(menu.getDessertOrDrink())
                .build();
    }
}