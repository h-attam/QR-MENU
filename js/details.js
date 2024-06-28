import { calculatePrice, elements } from "./helpers.js";
import { menu } from "./db.js";

console.log(window.location);

//*url de ki parametreleri yönetebilmek için urlsearchparams classından örnek oluşturduk
//*örneği oluştururken kedni url mizdeki parametrelere gönderdik
const searchParams = new URLSearchParams(window.location.search);

//*get metodu ile url deki parametreaine eriştik
const paramId = searchParams.get("id");

//*menü içerisinden id sini bildiğimiz elemana ulaşma
const product = menu.find((item) => item.id === Number(paramId));
console.log(product);


//*bulduğumuz ürüne göre arayüzü ekrana basma
elements.outlet.innerHTML = `
<div style="max-width: 900;" id="outlet" class="container my-5 d-flex flex-column gap-4">
<div class="d-flex justify-content-between align-items-center">
  <a href="/"><i class="bi bi-house fs-1"></i></a>
  <div>Anasayfa / ${product.category} / ${product.title.toLowerCase()} </div>
</div>
<h1 class="text-center my-3 shadow p-2 rounded">${product.title} </h1>
<div class="d-flex align-items-center justify-content-center">
  <img
    src="${product.img} "
    style="max-width: 500px"
    class="img-fluid shadow rounded"
  />
</div>
<div>
  <h3 class="my-5">Ürünün Kategorisi <span class="text-success">${product.category} </span></h3>
  <h3 class="my-5">Ürünün Fiyatı <span class="text-success">${calculatePrice(product.price) } </span></h3>
</div>
<p class="lead fs-3">${product.desc} </p>


`;


//! == sadece değerlerini karşılaştırır === ise hem değerlerini hem de tiplerini karşılaştırır.