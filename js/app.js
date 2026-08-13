// Plans section button
const button = document.getElementsByClassName("contact-us");
const contact_us_section = document.getElementById("contact-us");
const date = new Date();
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

const query_form = document.getElementById("query-form");

query_form.addEventListener("submit", function (event) {
  const pop_up_message = document.getElementById("form-submit-message");
  const success_modal = new bootstrap.Modal(pop_up_message);
  setTimeout(() => {
    success_modal.show();
  }, 10000);
});

const contactUsForm = document.getElementById("query-form");
contactUsForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const consultation_preference = document.getElementById("preference").value;
  const consent = document.getElementById("consent").value;
  const acknowledgement = document.getElementById("acknowledgement").value;

  if (!consent || !acknowledgement) {
    alert("Kindly give consent and acknowledgement");
  }

  text = `
    🔔 New contact form submission:
    Name : "${firstname} ${lastname}"
    Email : "${email}"
    Contact Number : "${phone}"
    Consultation Preference : "${consultation_preference}"
    Consent : ${consent ? "Given" : "Not Given"}
    Acknowledgement : ${acknowledgement ? "Yes" : "No"}
    Timestamp : "${date.toDateString()}"`;
  const TELEGRAM_BOT_TOKEN = "8738497397:AAHuyk9_KXvKY4G0_WQa7_TecEwGgCGrRcQ";
  const PERSONAL_CHAT_ID = "6289559837";

  let url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: PERSONAL_CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    const result = await response.json();

    if (result.ok) {
      alert("Message sent successfully!");
      query_form.reset();
    } else {
      alert("Error: " + result.description);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to send message. Check console for details.");
  }
});
