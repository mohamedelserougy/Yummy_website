let home = document.querySelector("#home .row");
let category = document.querySelector("#Category .row");
let category_items = document.querySelector("#category-items .row");
let area = document.querySelector("#area .row");
let area_items = document.querySelector("#area-items .row");
let ingrediant = document.querySelector("#ingrediant .row");
let ingrediant_items = document.querySelector("#ingrediant-items .row");
let item = document.querySelector("#item .row");
let showdataSearch = document.querySelector("#search .rowData");
let searchInputName = document.getElementById("searchName");
let searchInputFristLetter = document.getElementById("searchLetter");
let loader = document.getElementById("loader");
let userName = document.getElementById("Name");
let email = document.getElementById("Email");
let phone = document.getElementById("Phone");
let age = document.getElementById("Age");
let password = document.getElementById("Password");
let repassword = document.getElementById("Repassword");
let btnsubmit = document.getElementById("send");
let inputs = [userName, email, phone, age, password, repassword];

/* slide navbar menu *********************************/
const slide_bar_width = $(".nav-tab").innerWidth();
$(".side-nav-menu").css({ left: `-${slide_bar_width}px` });
let isShown = false;

$(".side-nav-menu .nav-header .open-close-icon").on("click", function () {
  if (isShown == false) {
    $(".side-nav-menu").animate({ left: "0px" }, 500);
    $(".side-nav-menu .nav-header .open_icon").addClass("d-none");
    $(".side-nav-menu .nav-header .close_icon").removeClass("d-none");
    $(".nav-tab .links li").css({
      transform: "translateY(0px)",
      opacity: "1",
    });
    isShown = true;
  } else {
    $(".side-nav-menu").animate({ left: `-${slide_bar_width}px` }, 500);
    $(".side-nav-menu .nav-header .open_icon").removeClass("d-none");
    $(".side-nav-menu .nav-header .close_icon").addClass("d-none");
    $(".nav-tab .links li").css({
      transform: "translateY(150px)",
      opacity: "0",
    });
    isShown = false;
  }
});

/* end slide navbar menu */

/* home section ************************************/
async function showhome() {
  showSection("home");
  try {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    if (result.ok) {
      let data = await result.json();

      display("home", data.meals);
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
  }
}

// function showloader
function showloader() {
  loader.classList.remove("d-none");
}
// function hideloader
function hideloader() {
  loader.classList.add("d-none");
}

/* search data by name and letter ***********************************/
async function get_data(type, value) {
  showloader();
  let url = "";

  if (type === "name") {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  } else if (type === "letter") {
    value = value.slice(0, 1);
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  }

  try {
    const result = await fetch(url);
    if (result.ok) {
      const data = await result.json();

      if (data.meals) {
        display("sh", data.meals);
      }
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
    hideloader();
  }
}

searchInputName.addEventListener("input", function () {
  get_data("name", searchInputName.value);
});

searchInputFristLetter.addEventListener("input", function () {
  get_data("letter", searchInputFristLetter.value);
});

/* show by category ********************************************/
async function showCategory() {
  showloader();
  try {
    let result = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    if (result.ok) {
      let data = await result.json();

      display("category", data.categories);
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
    hideloader();
  }
}
/* show category items */
async function showCategoryItem(trim) {
  showloader();
  showSection("category-items");
  try {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${trim}`
    );
    if (result.ok) {
      let data = await result.json();
      display("categoryItem", data.meals);
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
    hideloader();
  }
  console.log(trim);
}

/* show by area ************************************************/
async function showArea() {
  showloader();
  try {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    if (result.ok) {
      let data = await result.json();

      display("area", data.meals);
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
    hideloader();
  }
}

/* show area items ********************************************/
async function showAreaItem(trim) {
  showloader();
  showSection("area-items");
  try {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${trim}`
    );
    if (result.ok) {
      let data = await result.json();
      console.log(data);
      display("areaItems", data.meals);
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
    hideloader();
  }
}
/* show by ingrediant ******************************************/
async function showIngrediant() {
  showloader();
  try {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    if (result.ok) {
      let data = await result.json();

      display("ingrediant", data.meals);
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
    hideloader();
  }
}

/* show ingrediant items ***************************/

async function showIngrediantItem(trim) {
  showloader();
  showSection("ingrediant-items");
  try {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${trim}`
    );
    if (result.ok) {
      let data = await result.json();

      display("ingrediantItems", data.meals);
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
    hideloader();
  }
}

async function showItem(trim) {
  showloader("");
  showSection("item");
  try {
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${trim}`
    );
    if (result.ok) {
      let data = await result.json();
      console.log(data);

      display("item", data.meals);
    }
  } catch (err) {
    console.error("error in api ", err);
  } finally {
    hideloader();
  }
}

/* to display data   */
function display(type, arr) {
  let cartona = "";

  if (type === "home") {
    for (let i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col col-sm-12 col-md-3" onclick="showItem('${arr[i].idMeal}')">
      <div class="inner">
      <div class="images position-relative overflow-hidden">
      <img src="${arr[i].strMealThumb}" alt="" />
      <div
      class="layer bg-white position-absolute w-100 h-100 d-flex align-items-center opacity-75"
      >
      <h3 class="text-capitalize ms-2 fw-bold">${arr[i].strMeal}</h3>
      </div>
      </div>
      </div>
      </div>
      `;
    }
    home.innerHTML = cartona;
  } else if (type === "category") {
    for (let i = 0; i < arr.length; i++) {
      cartona += `
    <div class="col col-sm-12 col-md-3" onclick="showCategoryItem('${
      arr[i].strCategory
    }')">
            <div class="inner">
            <div class="images position-relative overflow-hidden">
            <img src="${arr[i].strCategoryThumb}" alt="" />
            <div
            class="layer bg-white position-absolute w-100 h-100 d-flex flex-column text-center p-2 opacity-75"
            >
            <h3 class="text-capitalize ms-2 fw-bold w-100">${
              arr[i].strCategory
            }</h3>
              <p>
              ${arr[i].strCategoryDescription.split(" ", 20).join(" ")}
              </p>
              </div>
              </div>
              </div>
              </div>
              `;
    }
    category.innerHTML = cartona;
  } else if (type === "area") {
    for (let i = 0; i < arr.length; i++) {
      cartona += `
       <div class="col col-sm-12 col-md-3" onclick="showAreaItem('${arr[i].strArea}')">
       <div class="country text-center p-3">
       <span class="mb-1"><i class="fa-solid fa-house-laptop"></i></span>
       <h3 class="text-capitalize text-white fw-bold">${arr[i].strArea}</h3>
       </div>
          </div>
          `;
    }
    area.innerHTML = cartona;
  } else if (type === "ingrediant") {
    for (let i = 0; i < 20; i++) {
      cartona += ` 
          <div class="col col-sm-12 col-md-3" onclick="showIngrediantItem('${
            arr[i].strIngredient
          }')">
            <div class="ingredient inner text-center p-2 text-white">
            <span class=""><i class="fa-solid fa-drumstick-bite"></i></span>
            <h3 class="text-capitalize">${arr[i].strIngredient}</h3>
            <p>
            ${arr[i].strDescription.split(" ", 20).join(" ")}
            </p>
            </div>
            </div>`;
    }
    ingrediant.innerHTML = cartona;
  } else if (type === "categoryItem") {
    for (let i = 0; i < arr.length; i++) {
      cartona += `
    <div class="col col-sm-12 col-md-3" onclick="showItem('${arr[i].idMeal}')">
    <div class="inner">
    <div class="images position-relative overflow-hidden">
    <img src="${arr[i].strMealThumb}" alt="" />
    <div
    class="layer bg-white position-absolute w-100 h-100 d-flex align-items-center opacity-75"
    >
    <h3 class="text-capitalize ms-2 fw-bold">${arr[i].strMeal}</h3>
    </div>
              </div>
            </div>
          </div>
          `;
    }
    category_items.innerHTML = cartona;
  } else if (type === "areaItems") {
    for (let i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col col-sm-12 col-md-3" onclick="showItem('${arr[i].idMeal}')">
      <div class="inner">
      <div class="images position-relative overflow-hidden">
      <img src="${arr[i].strMealThumb}" alt="" />
      <div
      class="layer bg-white position-absolute w-100 h-100 d-flex align-items-center opacity-75"
      >
      <h3 class="text-capitalize ms-2 fw-bold">${arr[i].strMeal}</h3>
      </div>
      </div>
      </div>
      </div>
      `;
    }
    area_items.innerHTML = cartona;
  } else if (type === "ingrediantItems") {
    for (let i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col col-sm-12 col-md-3" onclick="showItem('${arr[i].idMeal}')">
      <div class="inner">
      <div class="images position-relative overflow-hidden">
      <img src="${arr[i].strMealThumb}" alt="" />
      <div
                  class="layer bg-white position-absolute w-100 h-100 d-flex align-items-center opacity-75"
                  >
                  <h3 class="text-capitalize ms-2 fw-bold">${arr[i].strMeal}</h3>
                  </div>
              </div>
              </div>
              </div>
              `;
    }
    ingrediant_items.innerHTML = cartona;
  } else if (type === "item") {
    for (let i = 0; i < arr.length; i++) {
      let ingredientsList = "";
      for (let j = 1; j <= 20; j++) {
        const ingredient = arr[i][`strIngredient${j}`];
        const measure = arr[i][`strMeasure${j}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredientsList += `<li class="p-2 rounded-2 bg-dark">${measure} ${ingredient}</li>`;
        }
      }
      let tagsList = "";
      if (arr[i].strTags) {
        const tags = arr[i].strTags.split(",");
        for (let tag of tags) {
          tagsList += `<li class="p-2 rounded-2 bg-dark">${tag.trim()}</li>`;
        }
      }
      cartona += `
      <div class="col col-sm-12 col-md-4">
      <div class="inner">
      <div class="images">
      <img
      src="${arr[i].strMealThumb}"
      class="rounded-2"
      alt=""
      />
      </div>
      <h2>${arr[i].strMeal}</h2>
      </div>
          </div>
          <div class="col col-sm-12 col-md-8">
          <div class="inner">
          <h2>Instructions</h2>
          <p>
          ${arr[i].strInstructions}
          </p>
          <h3><span>Area :</span> ${arr[i].strArea}</h3>
          <h3><span>Category :</span> ${arr[i].strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="d-flex flex-wrap gap-3 text-wheat">
          ${ingredientsList}
          </ul>
          <h3>Tags :
          </h3>
          <ul class="d-flex flex-wrap gap-3 text-white">
          ${tagsList || "<p>No tags available.</p>"}
          </ul>
          <button class="btn btn-success "><a href="${
            arr[i].strSource
          }" target="_blank">source</a></button>
            <button class="btn btn-danger "><a href="${
              arr[i].strYoutube
            }" target="_blank">youtube</a></button>
              
            </div>
          </div>
      `;
    }
    item.innerHTML = cartona;
  } else {
    for (let i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col col-sm-12 col-md-3" onclick="showItem('${arr[i].idMeal}')">
      <div class="inner">
      <div class="images position-relative overflow-hidden">
      <img src="${arr[i].strMealThumb}" alt="" />
      <div
      class="layer bg-white position-absolute w-100 h-100 d-flex align-items-center opacity-75"
      >
      <h3 class="text-capitalize ms-2 fw-bold">${arr[i].strMeal}</h3>
      </div>
      </div>
      </div>
      </div>
      `;
    }
    showdataSearch.innerHTML = cartona;
  }
}

/* contact us *********************************************/
btnsubmit.addEventListener("click", function () {
  Toastify({
    text: "You have successfully registered.",
    duration: 3000,
    style: {
      background: "linear-gradient(to right,rgb(55, 2, 2),rgb(134, 5, 5))",
    },
  }).showToast();
  clearInputs();
});

function clearInputs() {
  userName.value = null;
  email.value = null;
  phone.value = null;
  age.value = null;
  password.value = null;
  repassword.value = null;
  $("input").removeClass("is-valid");
}

inputs.forEach((input) => {
  input.addEventListener("input", checkForm);
});

/* to sure right validation and make buttun un disabled */
function checkForm() {
  let valid =
    validation(userName, "mesName") &&
    validation(email, "mesEmail") &&
    validation(phone, "mesPhone") &&
    validation(age, "mesAge") &&
    validation(password, "mesPassword");

  if (password.value !== repassword.value) {
    document.getElementById("mesRepassword").classList.remove("d-none");
    btnsubmit.disabled = valid;
  } else {
    document.getElementById("mesRepassword").classList.add("d-none");
    btnsubmit.disabled = !valid;
  }
}

/* validation function */
function validation(element, msgID) {
  let text = element.value;
  let message = document.getElementById(msgID);
  let regex = {
    Name: /^[A-Za-z]+$/,
    Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    Phone: /^01[0125][0-9]{8}$/,
    Age: /^[1-9][0-9]?$/,
    Password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    message.classList.add("d-none");

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    message.classList.remove("d-none");

    return false;
  }
}

/* show section */
function showSection(sectionId) {
  const sections = [
    "home",
    "Category",
    "area",
    "contact",
    "item",
    "ingrediant",
    "search",
    "category-items",
    "area-items",
    "ingrediant-items",
    "item",
  ];
  sections.forEach((section) => {
    const element = document.getElementById(section);
    if (element) {
      element.classList.add("d-none");
    }
  });
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove("d-none");
    if (targetSection.id === "Category") {
      showCategory();
    } else if (targetSection.id === "area") {
      showArea();
    } else if (targetSection.id === "ingrediant") {
      showIngrediant();
    }
  }
}

window.addEventListener("load", function () {
  showloader();
  showhome().then(() => {
    hideloader();
    showSection("home");
  });
});
