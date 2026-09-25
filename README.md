# 🏢 Kurumsal İntranet & Personel Portalı

Modern kurum içi iletişimi, operasyonel iş akışlarını ve çalışan deneyimini dijitalleştirmek amacıyla geliştirilmiş tam kapsamlı kurumsal portal uygulaması.

---

## 🚀 Projenin Amacı ve Çözülen Problemler

Büyük ölçekli organizasyonlarda duyuruların dağılması, toplantı odası çakışmaları, yemekhane ve servis bilgilerine erişim zorluğu ve IT destek taleplerinin manuel yürütülmesi ciddi zaman kaybına yol açar. Bu proje:

- **Merkezi İletişim:** Duyurular, kurumsal haberler ve manşet akışlarını tek noktada toplar.
- **Operasyonel Yönetim:** Akıllı toplantı odası rezervasyon sistemi ve IT Helpdesk modülü ile kurum içi süreçleri hızlandırır.
- **Günlük Çalışan İhtiyaçları:** Yemek menüsü (sunucu saati doğrulamalı), dahili telefon rehberi, nöbetçi/servis güzergahları ve anlık kur/hava durumu widget'ları sunar.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

### **Backend**
- **Java 21+ & Spring Boot 3 / 4**
- **Spring Security & JWT:** Stateless kimlik doğrulama ve rol bazlı yetkilendirme (RBAC).
- **Spring Data JPA & Hibernate:** ORM ve ilişkisel veri modelleme.
- **PostgreSQL:** İlişkisel veritabanı.
- **Flyway:** Veritabanı şema versiyon kontrolü (Migration).
- **Lombok & Jakarta Validation:** Temiz kod ve girdi doğrulama katmanı.

### **Frontend**
- **React 18 & Vite:** Yüksek performanslı ve modüler arayüz mimarisi.
- **Tailwind CSS:** Modern, responsive ve kurumsal tasarım dili.
- **Lucide Icons:** Arayüz ikon seti.

---

## 🏗️ Mimari ve Önemli Teknik Özellikler

Proje, kurumsal standartlara uygun **Katmanlı Mimari (N-Tier Architecture)** prensipleriyle geliştirilmiştir:

`Controller ➔ DTO ➔ Service (Business Logic) ➔ Repository ➔ Database`

### 1. Akıllı Toplantı Odası Rezervasyonu (Overlapping Check)
Kullanıcıların aynı salon için aynı zaman aralığında rezervasyon yapmasını engellemek amacıyla veritabanı seviyesinde zaman çakışması (overlapping time slot) kontrolü yapılır. Bitiş saatinin başlangıçtan önce seçilmesi gibi durumlar iş mantığı katmanında yakalanır.

### 2. İstemci Bağımsız Yemek Menüsü Mimarisi
İstemci (Client) tarafındaki saat/tarih manipülasyonlarına güvenilmez. Günün menüsü sorgulanırken sunucunun `Europe/Istanbul` saat dilimi baz alınarak doğrulanır.

### 3. Merkezi Hata Yönetimi (Global Exception Handling)
Uygulama genelindeki doğrulamalar (`@Valid`), iş mantığı hataları (`BusinessException`) ve yetkilendirme sorunları `@RestControllerAdvice` ile merkezi olarak yakalanır ve frontend'e standart `ErrorResponse` formatında iletilir.

### 4. Güvenli Konfigürasyon
Veritabanı bağlantı bilgileri ve hassas anahtarlar `environment variables` üzerinden dinamik fallback mekanizmasıyla yönetilir.

---

## 📂 Modüller ve Ekranlar

| Modül | Açıklama |
|---|---|
| **Dashboard** | Hava durumu, döviz kurları, manşet slider, günün menüsü ve etkinlik widget'ları |
| **Haberler & Duyurular** | Kurumsal gelişmelerin yayınlandığı ve detaylandırıldığı akış sayfası |
| **Toplantı Odaları** | Salon doluluk takvimi ve anlık rezervasyon oluşturma ekranı |
| **Destek Talepleri (Helpdesk)**| Personelin IT ve idari talepler açabildiği, durum takibi yapabildiği biletleme modülü |
| **Dahili Rehber & Departmanlar** | Kurum içi personelin birim ve iletişim bilgileri listesi |

---

## ⚙️ Kurulum ve Çalıştırma

### Gereksinimler
- JDK 21 veya üzeri
- Node.js (v18+)
- PostgreSQL

### 1. Backend Kurulumu
```bash
# Projeyi klonlayın
git clone [https://github.com/KULLANICI_ADIN/corporate-portal.git](https://github.com/KULLANICI_ADIN/corporate-portal.git)
cd corporate-portal

# application.yaml / properties ayarlarını kontrol edin
# PostgreSQL'de 'portal_db' adında bir veritabanı oluşturun

# Maven ile projeyi derleyin ve çalıştırın
./mvnw spring-boot:run