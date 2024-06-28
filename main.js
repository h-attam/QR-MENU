import { buttonsData, menu } from "./js/db.js";
import { calculatePrice, elements } from "./js/helpers.js";

//!fonksiyonlar
const renderMenuItems = (menuItems) => {
  //*dizideki her bir obje için bir elemanı temsil eden HTML elemanı oluşturur.Bu HTML i bir diziye aktarır.
  let menuHtml = menuItems
    .map(
      (item) => `
      <a
        href="/productDetail.html?id=${item.id}"
        class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
        id="card"
      >
        <img src="${item.img}" class="rounded shadow" />
        <div>
          <div class="d-flex justify-content-between ">
            <h5>Diner ${item.title}</h5>
            <p class="text-success"> ${calculatePrice(item.price)} ₺</p>
          </div>
          <p class="lead">
            ${item.desc}
          </p>
        </div>
      </a> 
    `
    )
    .join(""); // Join the array of HTML strings into a single string
  elements.menuArea.innerHTML = menuHtml;
};

//*tıklanılan butona göre o butonun kategorisine ait ürünleri listele
const searchCategory = (e) => {
  const category = e.target.dataset.category;

  //*tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeri ile eşleşenleri getir ve bir dizi şeklinde değişkene aktar.
  const filtredMenu = menu.filter((item) => item.category === category);

  //*hepsi seçilirse bütün menüyü ekrana aktarır
  if (category === "undefined") {
    return;
  } else if (category === "all") {
    renderMenuItems(menu);
  } else {
    //*filtrelenn elemanları ekrana aktarmak için menu dizisinden oluşturduğumuz filtred menu dizisini ekrana aktarır
    renderMenuItems(filtredMenu);
  }
  //*seçtiğimiz kategorinin butonunnu aktifleştirebilmek için kategoriyi paremetre olaak gönderdşik
  renderButtons(category);
};
//*ekrana butonları basma
const renderButtons = (active) => {
  //*eski butonları ekrandan sil
  elements.buttonsArea.innerHTML = "";
  //*yeni butonlar oluşturma
  buttonsData.forEach((btn) => {
    //*html butonu oluşturma
    const buttonEle = document.createElement("button");
    //*buttonlara classlarını ekleme
    buttonEle.className = "btn btn-outline-dark filter-btn";
    //*içerisindeki yazıyı değiştrme
    buttonEle.textContent = btn.text;
    //*hangi kategori old bilgisini butona ekleme
    buttonEle.dataset.category = btn.value;
    //*eğer ki active kategorisiyle buton eşleşirse ona farklı class ekle
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }
    //*html ye gönderme
    elements.buttonsArea.appendChild(buttonEle);
  });
};

//!olay izleyicileri
//* document.addEventListener("DOMContentLoaded", () => renderMenuItems(menu));

//*sayfa yüklendiği anda ekrana render buttons ve rendermenuitems fonksiyonlarını çalıştırır
document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all"), 
  renderMenuItems(menu);
});
elements.buttonsArea.addEventListener("click", searchCategory);
