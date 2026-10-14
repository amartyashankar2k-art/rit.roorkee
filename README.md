# RIT Roorkee - Modern Student Help-Desk Portal

An interactive, responsive single-page web application designed for **Roorkee Institute of Technology (RIT Roorkee)**, accredited with **NAAC A++** and ranked #1 in Uttarakhand.

---

## 🌟 Key Highlights & Features

1. **Brand Identity & Aesthetics**:
   - Styled using RIT's official brand colors: **Navy Blue** (`#072559`), **Royal Blue** (`#0e4896`), and **Crimson Red** (`#d8232a`) inspired by their NAAC A++ accreditation.
   - Uses the official high-resolution RIT logo URL.
   - Clean, modern typography with Google Fonts (*Plus Jakarta Sans*) and FontAwesome 6 icons.

2. **Dynamic Hero Section**:
   - Bold headline: *"Your Ultimate RIT Student Hub"*.
   - Live interactive search bar with instant autocomplete suggestions for common queries (e.g. *Hostel fees, Syllabus, Placement stats, Warden contacts, Library OPAC*).
   - Quick trending pills for one-click discovery.
   - Institutional metric counters: *NAAC A++ Grade, ₹56 LPA Top Package, 92%+ Placements, 20+ Years Excellence*.

3. **Quick Access Cards (Grid Layout)**:
   - **Academics**: Course syllabus, department timetables, faculty circulars, and exam schedule calendar.
   - **Hostel & Residential Life**: Interactive weekly mess menu (Monday through Sunday breakfast, lunch, snacks, dinner toggle), room allocation policies, and warden helplines.
   - **Central Library**: OPAC database catalog search, borrowing guidelines, and direct access links to IEEE Xplore, DELNET, Springer Nature, and NPTEL.
   - **Placements & Career Cell**: Placement statistics, top visiting companies (Microsoft, Amazon, TCS, Infosys, Wipro), and downloadable interview preparation resources.

4. **Leadership & Administration Profiles**:
   - **CA S.K. Gupta** — Chairman
   - **Prof. Madhav Ji Nigam** — Director General (Former IIT Roorkee Dean & Professor)
   - **Prof. (Dr.) Parag Jain** — Director
   - **Mr. Gaurav Chaturvedi** — Dean Academics
   - **Mr. Munendra Singh Chauhan** — Registrar
   - Direct image embeddings with `no-referrer` policy and fallback avatars for high reliability.

5. **Student Helpdesk & Grievance Redressal**:
   - Functional ticket generation form that issues a unique tracking ID (`RIT-HD-2026-XXXX`).
   - Categorized inquiry routing (Academics, Hostel, Accounts, Placements, Wi-Fi/ERP).
   - Emergency contact directory (Anti-ragging cell, Medical room, Chief Warden).

6. **Interactive FAQ Accordion**:
   - Instant answers to frequently asked questions about online fee payments, curfew timings, library limits, and placement criteria.

7. **Footer**:
   - Full campus address at *8th Km Stone, Dehradun Road, Puhana, Roorkee, Haridwar, Uttarakhand – 247667*.
   - Responsive Google Maps embed of the RIT Roorkee campus.
   - Social media links and navigation portals.

---

## 🚀 How to Run & View

### Option 1: Open Directly in Any Browser
Simply double click or open `index.html` in your favorite web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Run with a Local Static Server
If you have Python or Node.js installed, you can start a local development server from this folder:

```bash
# Using Python
python -m http.server 8000

# Using Node.js npx
npx serve .
```
Then navigate to `http://localhost:8000` in your browser.

---

## 📁 File Structure
```
c:\Users\amart\OneDrive\collage\
├── index.html     # Semantic, accessible HTML5 single-page application
├── styles.css     # Responsive CSS, CSS variables, animations & glassmorphism
├── app.js         # Interactive search, mess tabs, ticket generator & modals
└── README.md      # Project documentation and guide
```
