
document.addEventListener("DOMContentLoaded", () => {

  /* ================= PRELOADER ================= */

  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 800);


  /* ================= MOBILE MENU ================= */

  const burger = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  burger.addEventListener("click", () => {

    burger.classList.toggle("active");
    mobileMenu.classList.toggle("open");

  });

  mobileMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      burger.classList.remove("active");
      mobileMenu.classList.remove("open");

    });

  });


  /* ================= SCROLL HEADER ================= */

  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {

    if(window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  });


  /* ================= SCROLL REVEAL ================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ================= ACTIVE NAV ================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 180;

      if(window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if(link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }

    });

  });


  /* ================= COUNTERS ================= */

  const counters = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if(!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseFloat(counter.dataset.count);

        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {

          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const eased = 1 - Math.pow(1 - progress, 3);

          const value = start + (target - start) * eased;

          counter.textContent =
            target % 1 === 0
              ? Math.floor(value)
              : value.toFixed(1);

          if(progress < 1) {
            requestAnimationFrame(updateCounter);
          }

        }

        requestAnimationFrame(updateCounter);

        counterObserver.unobserve(counter);

      });

    },

    {
      threshold: 0.7
    }

  );

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });


  /* ================= GALLERY FILTER ================= */

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const galleryItems =
    document.querySelectorAll(".gallery-item");

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      filterButtons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      const filter = button.dataset.filter;

      galleryItems.forEach(item => {

        const category = item.dataset.category;

        if(filter === "all" || category === filter) {

          item.classList.remove("hidden");

          setTimeout(() => {
            item.style.display = "";
          }, 10);

        } else {

          item.classList.add("hidden");

          setTimeout(() => {
            item.style.display = "none";
          }, 300);

        }

      });

    });

  });


  /* ================= LIGHTBOX ================= */

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  const lightboxTitle =
    document.getElementById("lightboxTitle");

  const lightboxCategory =
    document.getElementById("lightboxCategory");

  const lightboxClose =
    document.getElementById("lightboxClose");

  const lightboxNext =
    document.getElementById("lightboxNext");

  const lightboxPrev =
    document.getElementById("lightboxPrev");

  let currentImage = 0;

  function getVisibleGalleryItems() {

    return [...galleryItems].filter(
      item => item.style.display !== "none"
    );

  }

  function openLightbox(index) {

    const items = getVisibleGalleryItems();

    if(!items.length) return;

    currentImage = index;

    const item = items[currentImage];
    const image = item.querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent =
      item.dataset.title;

    lightboxCategory.textContent =
      item.dataset.category;

    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";

  }

  function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.style.overflow = "";

  }

  galleryItems.forEach(item => {

    item.addEventListener("click", () => {

      const items = getVisibleGalleryItems();

      const index = items.indexOf(item);

      openLightbox(index);

    });

  });

  lightboxNext.addEventListener("click", () => {

    const items = getVisibleGalleryItems();

    currentImage =
      (currentImage + 1) % items.length;

    openLightbox(currentImage);

  });

  lightboxPrev.addEventListener("click", () => {

    const items = getVisibleGalleryItems();

    currentImage =
      (currentImage - 1 + items.length) % items.length;

    openLightbox(currentImage);

  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", e => {

    if(e.target === lightbox) {
      closeLightbox();
    }

  });

  document.addEventListener("keydown", e => {

    if(e.key === "Escape") {
      closeLightbox();
    }

    if(e.key === "ArrowRight") {

      const items = getVisibleGalleryItems();

      if(lightbox.classList.contains("open")) {
        currentImage =
          (currentImage + 1) % items.length;

        openLightbox(currentImage);
      }

    }

    if(e.key === "ArrowLeft") {

      const items = getVisibleGalleryItems();

      if(lightbox.classList.contains("open")) {
        currentImage =
          (currentImage - 1 + items.length) % items.length;

        openLightbox(currentImage);
      }

    }

  });


  /* ================= TESTIMONIALS ================= */

  const testimonials =
    document.querySelectorAll(".testimonial");

  const dotsContainer =
    document.getElementById("testimonialDots");

  const previousButton =
    document.getElementById("testimonialPrev");

  const nextButton =
    document.getElementById("testimonialNext");

  let testimonialIndex = 0;


  testimonials.forEach((_, index) => {

    const dot = document.createElement("button");

    if(index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      showTestimonial(index);
    });

    dotsContainer.appendChild(dot);

  });


  function showTestimonial(index) {

    testimonials.forEach(testimonial =>
      testimonial.classList.remove("active")
    );

    dotsContainer
      .querySelectorAll("button")
      .forEach(dot =>
        dot.classList.remove("active")
      );

    testimonialIndex = index;

    testimonials[index].classList.add("active");

    dotsContainer
      .children[index]
      .classList.add("active");

  }


  nextButton.addEventListener("click", () => {

    testimonialIndex =
      (testimonialIndex + 1) % testimonials.length;

    showTestimonial(testimonialIndex);

  });


  previousButton.addEventListener("click", () => {

    testimonialIndex =
      (testimonialIndex - 1 + testimonials.length)
      % testimonials.length;

    showTestimonial(testimonialIndex);

  });


  setInterval(() => {

    testimonialIndex =
      (testimonialIndex + 1) % testimonials.length;

    showTestimonial(testimonialIndex);

  }, 6000);


  /* ================= CONTACT FORM ================= */

  const form = document.getElementById('form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const formStatus = document.getElementById('formStatus'); // ✅ was missing — added

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append("access_key", "37db34d6-7fa1-4fea-a083-24da9cca4870");

      const name = formData.get('fullName'); // ✅ was missing — added

      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
          const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: { "Accept": "application/json" },
              body: formData
          });

          const result = await response.json();

          if (result.success) {
              formStatus.classList.remove('error');
              formStatus.textContent = `Thanks, ${name}! We'll reply within 24 hours with ideas and pricing.`;
              form.reset(); // ✅ fixed — was quoteForm.reset()
          } else {
              formStatus.textContent = 'Something went wrong. Please try again.';
              formStatus.classList.add('error');
          }
      } catch (error) {
          formStatus.textContent = 'Error sending message. Please try again.';
          formStatus.classList.add('error');
      } finally {
          submitBtn.textContent = originalText; // ✅ button no longer stuck on "Sending..."
          submitBtn.disabled = false;
      }
  });


  /* ================= BACK TO TOP ================= */

  const backTop =
    document.getElementById("backTop");

  window.addEventListener("scroll", () => {

    if(window.scrollY > 600) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }

  });

  backTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* ================= PARALLAX BALLOONS ================= */

  const balloons =
    document.querySelectorAll(".floating-balloon");

  window.addEventListener("mousemove", e => {

    const x =
      (window.innerWidth / 2 - e.clientX) / 80;

    const y =
      (window.innerHeight / 2 - e.clientY) / 80;

    balloons.forEach((balloon, index) => {

      const multiplier = index + 1;

      balloon.style.transform =
        `translate(${x * multiplier}px, ${y * multiplier}px)`;

    });

  });

});
