/**
 * RIT Roorkee - Student Help-Desk Portal
 * Interactive Logic & Data Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSearchEngine();
  initCategoryTabs();
  initFaqAccordion();
  initTicketForm();
  initModals();
  initMessMenuTabs();
  initBackToTop();
});

/* ==========================================================================
   1. NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. INTELLIGENT SEARCH ENGINE & QUICK SUGGESTIONS
   ========================================================================== */
const helpdeskSearchDatabase = [
  {
    title: 'Hostel Fee Structure & Payment Deadlines',
    category: 'Hostel & Accounts',
    target: '#hostel',
    action: () => openModal('hostel-modal')
  },
  {
    title: 'Weekly Mess Menu (Veg & Non-Veg Schedule)',
    category: 'Hostel Services',
    target: '#hostel',
    action: () => openModal('mess-modal')
  },
  {
    title: 'Hostel Room Allocation & Warden Contacts',
    category: 'Hostel Administration',
    target: '#hostel',
    action: () => openModal('hostel-modal')
  },
  {
    title: 'B.Tech & Management Syllabus / Curriculum 2026',
    category: 'Academics',
    target: '#academics',
    action: () => openModal('academics-modal')
  },
  {
    title: 'Mid-Term & End-Term Exam Schedule & Datesheet',
    category: 'Academics',
    target: '#academics',
    action: () => openModal('academics-modal')
  },
  {
    title: 'Placement Statistics & Top Recruiters 2025-26',
    category: 'Training & Placements',
    target: '#placements',
    action: () => openModal('placements-modal')
  },
  {
    title: 'Interview Preparation Kit & Coding Practice',
    category: 'Career Services',
    target: '#placements',
    action: () => openModal('placements-modal')
  },
  {
    title: 'Library Book Availability & OPAC Search',
    category: 'Central Library',
    target: '#library',
    action: () => openModal('library-modal')
  },
  {
    title: 'Digital IEEE, Springer & DELNET e-Journals Access',
    category: 'Digital Resources',
    target: '#library',
    action: () => openModal('library-modal')
  },
  {
    title: 'Leadership Team (Chairman, Director General, Director)',
    category: 'Administration',
    target: '#leadership',
    action: () => scrollToSection('leadership')
  },
  {
    title: 'Submit a Student Grievance / Help-Desk Ticket',
    category: 'Support Portal',
    target: '#helpdesk',
    action: () => scrollToSection('helpdesk')
  },
  {
    title: 'Campus Wi-Fi & IT Portal Credentials Reset',
    category: 'IT Services',
    target: '#helpdesk',
    action: () => scrollToSection('helpdesk')
  }
];

function initSearchEngine() {
  const searchInput = document.getElementById('heroSearchInput');
  const suggestionsBox = document.getElementById('searchSuggestionsBox');
  const searchBtn = document.getElementById('heroSearchBtn');

  if (!searchInput || !suggestionsBox) return;

  function renderSuggestions(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) {
      suggestionsBox.innerHTML = '';
      suggestionsBox.classList.remove('active');
      return;
    }

    const matches = helpdeskSearchDatabase.filter(item => 
      item.title.toLowerCase().includes(cleanQuery) || 
      item.category.toLowerCase().includes(cleanQuery)
    );

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div style="padding: 1.25rem; text-align: center; color: var(--text-muted);">
          <i class="fa-solid fa-circle-question" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--brand-red);"></i>
          <p style="font-size: 0.95rem; font-weight: 600;">No exact match found for "${query}"</p>
          <p style="font-size: 0.85rem; margin-top: 0.25rem;">Would you like to <a href="#helpdesk" style="color: var(--primary-blue); font-weight: 700; text-decoration: underline;" onclick="document.getElementById('searchSuggestionsBox').classList.remove('active');">raise a direct query</a>?</p>
        </div>
      `;
      suggestionsBox.classList.add('active');
      return;
    }

    let html = '';
    matches.forEach(item => {
      html += `
        <div class="suggestion-item" data-title="${encodeURIComponent(item.title)}">
          <div class="suggestion-left">
            <div class="suggestion-icon">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <div>
              <div class="suggestion-title">${item.title}</div>
              <div class="suggestion-category">${item.category}</div>
            </div>
          </div>
          <i class="fa-solid fa-chevron-right" style="color: var(--text-light); font-size: 0.8rem;"></i>
        </div>
      `;
    });

    suggestionsBox.innerHTML = html;
    suggestionsBox.classList.add('active');

    // Attach click events to matches
    const items = suggestionsBox.querySelectorAll('.suggestion-item');
    items.forEach(el => {
      el.addEventListener('click', () => {
        const title = decodeURIComponent(el.getAttribute('data-title'));
        const matchedObj = helpdeskSearchDatabase.find(i => i.title === title);
        if (matchedObj) {
          suggestionsBox.classList.remove('active');
          matchedObj.action();
        }
      });
    });
  }

  searchInput.addEventListener('input', (e) => {
    renderSuggestions(e.target.value);
  });

  // Handle Search Button Click or Enter Key
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const val = searchInput.value.trim();
    if (val) {
      renderSuggestions(val);
    } else {
      searchInput.focus();
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.remove('active');
    }
  });
}

// Quick Tag Pill Click Functionality
window.searchTag = function(tagKeyword) {
  const searchInput = document.getElementById('heroSearchInput');
  if (searchInput) {
    searchInput.value = tagKeyword;
    searchInput.dispatchEvent(new Event('input'));
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

/* ==========================================================================
   3. CATEGORY TABS (QUICK ACCESS FILTER)
   ========================================================================== */
function initCategoryTabs() {
  const tabBtns = document.querySelectorAll('.category-tabs .tab-btn');
  const cards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInDown 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. FAQS ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current
      if (!isOpen) {
        parent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. TICKET SUBMISSION & HELPDESK ENGINE
   ========================================================================== */
function initTicketForm() {
  const ticketForm = document.getElementById('ticketForm');
  if (!ticketForm) return;

  ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const rollNo = document.getElementById('studentRoll').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const department = document.getElementById('studentDept').value;
    const category = document.getElementById('ticketCategory').value;
    const subject = document.getElementById('ticketSubject').value.trim();
    const message = document.getElementById('ticketMessage').value.trim();

    if (!name || !rollNo || !email || !department || !category || !subject || !message) {
      showToast('⚠️ Please fill out all required fields.');
      return;
    }

    // Generate Ticket ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `RIT-HD-${new Date().getFullYear()}-${randomNum}`;

    // Fill Success Modal
    document.getElementById('modalTicketId').innerText = ticketId;
    document.getElementById('modalStudentDetails').innerText = `${name} (${rollNo}) - ${department}`;
    document.getElementById('modalTicketCategory').innerText = `${category} • ${subject}`;

    // Reset Form & open modal
    ticketForm.reset();
    openModal('ticket-success-modal');
    showToast(`✅ Ticket #${ticketId} submitted successfully!`);
  });
}

/* ==========================================================================
   6. MODAL SYSTEM & CONTENT ENGINE
   ========================================================================== */
function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-dismiss');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

window.openModal = function(modalId) {
  closeAllModals();
  const targetModal = document.getElementById(modalId);
  if (targetModal) {
    targetModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAllModals = function() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
};

/* ==========================================================================
   7. INTERACTIVE WEEKLY MESS MENU TABS
   ========================================================================== */
const weeklyMessSchedule = {
  mon: {
    breakfast: 'Aloo Paratha, Curd, Pickle, Tea / Coffee, Boiled Eggs / Banana',
    lunch: 'Dal Makhani, Seasonal Veg, Steamed Rice, Phulka, Salad, Raita',
    snacks: 'Samosa / Poha, Mint Chutney, Hot Masala Tea',
    dinner: 'Shahi Paneer / Egg Curry, Jeera Rice, Tawa Roti, Gulab Jamun'
  },
  tue: {
    breakfast: 'Idli, Sambhar, Coconut Chutney, Fresh Fruits, Tea / Milk',
    lunch: 'Rajma Masala, Aloo Jeera, Basmati Rice, Chapati, Green Salad',
    snacks: 'Veg Cutlet, Tomato Sauce, Tea / Coffee',
    dinner: 'Kadhai Paneer / Chicken Masala, Dal Tadka, Rice, Roti, Kheer'
  },
  wed: {
    breakfast: 'Puri Sabzi, Halwa, Sprouts Salad, Tea / Milk',
    lunch: 'Chole Bhature / Chole Rice, Boondi Raita, Onion Salad',
    snacks: 'Veg Sandwich / Maggi, Cold Coffee / Tea',
    dinner: 'Mix Veg, Yellow Dal Fry, Jeera Rice, Butter Roti, Custard'
  },
  thu: {
    breakfast: 'Methi Paratha, Butter, Curd, Omelette / Boiled Egg, Tea',
    lunch: 'Kadhi Pakora, Steamed Rice, Aloo Baingan, Roti, Salad',
    snacks: 'Bread Pakora, Green Chutney, Hot Tea',
    dinner: 'Matar Paneer, Dal Arhar, Tawa Roti, Pulao, Rasgulla'
  },
  fri: {
    breakfast: 'Masala Dosa, Sambhar, Chutney, Banana, Tea / Coffee',
    lunch: 'Dal Fry, Bhindi Masala, Steamed Rice, Roti, Curd',
    snacks: 'Pasta / Chowmein, Tea / Lemon Water',
    dinner: 'Special Paneer Butter Masala / Chicken Curry, Biryani, Roti, Ice Cream'
  },
  sat: {
    breakfast: 'Uttapam, Sambhar, Coconut Chutney, Tea / Milk',
    lunch: 'Black Chana Masala, Kadhi, Jeera Rice, Chapati, Salad',
    snacks: 'Bhel Puri / Biscuits, Hot Tea',
    dinner: 'Dum Aloo, Dal Palak, Steamed Rice, Phulka, Moong Dal Halwa'
  },
  sun: {
    breakfast: 'Paneer / Gobhi Paratha, Curd, Pickle, Fresh Juice / Tea',
    lunch: 'Special Sunday Veg Biryani / Chicken Biryani, Mirchi Ka Salan, Raita',
    snacks: 'Veg Burger / Fries, Cold Drink / Tea',
    dinner: 'Malai Kofta, Dal Tadka, Naan / Roti, Jeera Rice, Brownie'
  }
};

function initMessMenuTabs() {
  const dayTabs = document.querySelectorAll('.day-tab');
  if (!dayTabs.length) return;

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const day = tab.getAttribute('data-day');
      const meals = weeklyMessSchedule[day];

      if (meals) {
        document.getElementById('messBreakfast').innerText = meals.breakfast;
        document.getElementById('messLunch').innerText = meals.lunch;
        document.getElementById('messSnacks').innerText = meals.snacks;
        document.getElementById('messDinner').innerText = meals.dinner;
      }
    });
  });
}

/* ==========================================================================
   8. BACK TO TOP BUTTON & SMOOTH SCROLL
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.scrollToSection = function(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   9. TOAST NOTIFICATION UTILITY
   ========================================================================== */
window.showToast = function(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
};

/* ==========================================================================
   10. IMAGE FALLBACK HANDLER
   ========================================================================== */
window.handleImgError = function(imgElement, fallbackName) {
  // If remote image fails to load (due to hotlink protection or network), replace with elegant high-res SVG avatar
  const initials = fallbackName.split(' ').map(n => n[0]).join('').substring(0, 2);
  imgElement.onerror = null;
  imgElement.parentElement.innerHTML = `
    <div class="avatar-placeholder">
      <i class="fa-solid fa-user-tie"></i>
      <div class="avatar-initials">${fallbackName}</div>
    </div>
  `;
};
