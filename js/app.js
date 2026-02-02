// Plans section button
const button = document.getElementsByClassName("contact-us");
const contact_us_section = document.getElementById("contact-us");

for (let i = 0; i < button.length; i++) {
  const element = button[i];
  element.addEventListener("click", () => {
    contact_us_section.scrollIntoView({
      behavior: "smooth",
      block: "start", // Aligns the top of the section to the top of the viewport
    });
  });
}

const post_section_group1 = document.getElementById("postgroup1");
const post_section_group2 = document.getElementById("postgroup2");
let a = "";
for (let i = 0; i < 9; i++) {
  const post_template = `<div class="review col-lg-3 col-12" style="width: 15rem">
              <img
                src="Static/Images/POSTS/${i + 1}.jpg"
                width="100%"
                style="aspect-ratio: 1/1"
                alt="post"
              />
            </div>`;

  a += post_template;
}
post_section_group1.innerHTML = a;
a = "";
for (let i = 0; i < 9; i++) {
  a += `<div class="review col-lg-3 col-12" style="width: 15rem">
                <img
                  src="Static/Images/POSTS/${i + 1}.jpg"
                  width="100%"
                  style="aspect-ratio: 1/1"
                  alt="post"
                />
              </div>`;
}
post_section_group2.innerHTML = a;

// const review_section = document.getElementById("review-scroller");
// let b = "";
// for (let i = 0; i < 9; i++) {
//   const service_template = `<div class="review col-3">
//               <img
//                 src="Static/Images/Reviews/"
//                 width="100%"
//                 style="aspect-ratio: 1/1"
//                 alt="service"
//               />
//             </div>`;

//   b += service_template;
// }
// review_section.innerHTML = b;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "10% 0px -20% 0px",
  },
);

// const bento = document.querySelectorAll(".services-bento .service");
// const cards = document.querySelectorAll(".card-holder .card");

// cards.forEach((e) => {
//   observer.observe(e);
// });
// bento.forEach((e) => {
//   observer.observe(e);
// });
