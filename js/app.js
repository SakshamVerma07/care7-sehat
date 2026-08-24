document.addEventListener("DOMContentLoaded", () => {
  const date = new Date();

  // 1. Plans section buttons
  const buttons = document.getElementsByClassName("contact-us");
  const contact_us_section = document.getElementById("contact-us");
  if (contact_us_section) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", () => {
        contact_us_section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }

  // 2. Post Sections
  const post_section_group1 = document.getElementById("postgroup1");
  const post_section_group2 = document.getElementById("postgroup2");

  if (post_section_group1) {
    let a = "";
    for (let i = 0; i < 9; i++) {
      a += `<div class="review col-lg-3 col-12" style="width: 15rem">
              <img src="Static/Images/POSTS/${i + 1}.jpg" width="100%" style="aspect-ratio: 1/1" alt="post" />
            </div>`;
    }
    post_section_group1.innerHTML = a;
  }

  if (post_section_group2) {
    let a = "";
    for (let i = 0; i < 9; i++) {
      a += `<div class="review col-lg-3 col-12" style="width: 15rem">
              <img src="Static/Images/POSTS/${i + 1}.jpg" width="100%" style="aspect-ratio: 1/1" alt="post" />
            </div>`;
    }
    post_section_group2.innerHTML = a;
  }

  // 3. Intersection Observer
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
    { threshold: 0.3, rootMargin: "10% 0px -20% 0px" },
  );

  // 4. Query Form Handling
  const query_form = document.getElementById("query-form");
  if (query_form) {
    query_form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Note: Move API keys to a secure backend before deploying!
      const TELEGRAM_BOT_TOKEN = "YOUR_TOKEN_HERE";
      const PERSONAL_CHAT_ID = "YOUR_CHAT_ID_HERE";

      const firstname = document.getElementById("firstname")?.value || "";
      const lastname = document.getElementById("lastname")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const phone = document.getElementById("phone")?.value || "";
      const consultation_preference =
        document.getElementById("preference")?.value || "";
      const consent = document.getElementById("consent")?.value;
      const acknowledgement = document.getElementById("acknowledgement")?.value;

      if (!consent || !acknowledgement) {
        alert("Kindly give consent and acknowledgement");
        return; // Stop execution if validation fails
      }

      let text = `
      🔔 New contact form submission:
      Name : "${firstname} ${lastname}"
      Email : "${email}"
      Contact Number : "${phone}"
      Consultation Preference : "${consultation_preference}"
      Consent : Given
      Acknowledgement : Yes
      Timestamp : "${date.toDateString()}"`;

      let url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: PERSONAL_CHAT_ID,
            text: text,
            parse_mode: "Markdown",
          }),
        });
        const result = await response.json();
        if (result.ok) {
          const pop_up_message = document.getElementById("form-submit-message");
          if (pop_up_message) {
            const success_modal = new bootstrap.Modal(pop_up_message);
            success_modal.show();
          }
          query_form.reset();
        } else {
          alert("Error: " + result.description);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to send message. Check console for details.");
      }
    });
  }

  // 5. Testimonial Carousel
  const carousel = document.getElementById("testimonial-carousel");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dotsContainer = document.getElementById("carousel-dots");
  const testimonials = carousel
    ? carousel.querySelectorAll(".testimonial")
    : [];

  if (
    carousel &&
    prevBtn &&
    nextBtn &&
    dotsContainer &&
    testimonials.length > 0
  ) {
    dotsContainer.innerHTML = "";

    testimonials.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        const targetCard = testimonials[index];
        carousel.scrollTo({
          left: targetCard.offsetLeft - carousel.offsetLeft,
          behavior: "smooth",
        });
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function updateActiveDot() {
      const scrollPosition = carousel.scrollLeft;
      const cardWidth = testimonials[0].offsetWidth;
      const currentIndex = Math.round(scrollPosition / cardWidth);
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    carousel.addEventListener("scroll", updateActiveDot);

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cardWidth = testimonials[0].offsetWidth;
      carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cardWidth = testimonials[0].offsetWidth;
      carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });
  }
});

// Leave standalone functions outside the DOMContentLoaded block so they can be called globally (e.g., onclick="readMore()")
function readMore() {
  const aboutsection = document.getElementById("about-us");
  const grayedOutArea = document.getElementById("grayed-out-area");
  if (aboutsection && grayedOutArea) {
    aboutsection.style.height = "fit-content";
    grayedOutArea.style.visibility = "hidden";
  }
}
