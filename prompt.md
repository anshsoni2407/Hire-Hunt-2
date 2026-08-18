I have completed the Admin Dashboard and I am very happy with its UI/UX.

Now I want you to use the **existing Admin Dashboard UI as the primary design reference and design system** and improve the UI of the **entire HireHunt application**.

## Main Goal

Do NOT create a completely different design.

Instead:

> **Take the exact visual language, spacing, typography, colors, cards, buttons, tables, borders, shadows, icons, layouts, and overall polish of the existing Admin Dashboard and apply that same design system consistently across the entire application.**

The Admin Dashboard should be treated as the **single source of truth for the application's UI style**.

The final application should feel like it was designed by one professional product design team.

---

# 1. First Inspect the Existing Application

Before making changes, carefully inspect the entire frontend.

Identify:

* All pages
* All routes
* Shared components
* Navbar/Header
* Footer
* Sidebar
* Cards
* Buttons
* Forms
* Inputs
* Tables
* Modals
* Dropdowns
* Alerts
* Loaders
* Empty states
* Error states
* Job cards
* Profile sections
* Dashboard sections
* Authentication pages
* Employer pages
* Job Seeker pages
* Admin pages

Also inspect the existing Tailwind configuration and reusable styles.

**Do not blindly rewrite everything.**

Reuse existing components where possible and refactor duplicated UI where necessary.

---

# 2. Admin Dashboard = Design Reference

Study the Admin Dashboard that you just created.

Identify its:

### Visual language

* Primary colors
* Background colors
* Text colors
* Border colors
* Border radius
* Shadows
* Card design
* Button design
* Input design
* Table design
* Status badges
* Icon style
* Typography hierarchy
* Spacing system
* Section spacing
* Hover effects
* Transitions
* Responsive behavior

Then create a consistent design system around those characteristics.

---

# 3. Apply the Same Design System Everywhere

Update the complete application so that every page feels visually related to the Admin Dashboard.

For example:

### Buttons

All primary buttons should follow the same:

* Color
* Radius
* Padding
* Font weight
* Hover behavior
* Active behavior
* Disabled state

Do not allow every page to have a different button style.

---

### Cards

All cards should follow the same visual language:

* Consistent border radius
* Consistent border
* Consistent shadow
* Consistent padding
* Consistent hover effect

Avoid random card designs across pages.

---

### Forms

Make all forms consistent.

Standardize:

* Input height
* Border radius
* Border color
* Focus ring
* Label typography
* Placeholder styling
* Error styling
* Select/dropdown styling
* Textarea styling
* Button placement

---

### Typography

Create a consistent typography hierarchy:

* Page titles
* Section headings
* Card headings
* Body text
* Labels
* Metadata
* Helper text
* Error text

Do not use random font sizes throughout the application.

---

# 4. Navbar / Header

Redesign the existing navbar/header to match the Admin Dashboard style.

Make it:

* Clean
* Minimal
* Professional
* Responsive
* Properly spaced

Improve:

* Logo placement
* Navigation items
* Active state
* User profile section
* Logout button
* Mobile navigation

Do not overcrowd the navbar.

---

# 5. Footer

Redesign the footer to match the overall application design.

Keep it:

* Clean
* Professional
* Minimal
* Responsive

Maintain existing footer functionality/content unless there is a strong UI reason to improve it.

---

# 6. Authentication Pages

Improve:

* Login
* Register
* Forgot Password
* Reset Password

These pages should use the same design language as the Admin Dashboard.

Create a polished authentication experience with:

* Clean layout
* Professional form card
* Proper spacing
* Consistent inputs
* Clear CTA
* Validation states
* Loading state
* Error state
* Responsive mobile design

Do not change authentication functionality.

---

# 7. Job Seeker UI

Improve the complete Job Seeker experience.

Review and redesign:

* Job listing
* Job cards
* Job details
* Applied Jobs
* Saved Jobs
* Profile
* Dashboard
* Application status
* Search/filter UI

The Job Seeker interface should feel like the same product as the Admin Dashboard.

For example, use the same:

* Cards
* Buttons
* Badges
* Typography
* Spacing
* Inputs
* Colors

---

# 8. Employer UI

Improve the complete Employer experience.

Review and redesign:

* Employer dashboard
* Create Job
* Created Jobs
* Applicants
* Applicant details
* Profile
* Job management
* Application management

Make these pages visually consistent with the Admin Dashboard.

---

# 9. Job Cards

Job cards are one of the most important parts of this application.

Create a polished, professional job card design.

Clearly display:

* Job title
* Company
* Location
* Job type
* Salary
* Experience
* Skills
* Posted date
* Save button
* Apply/View button

Make the hierarchy easy to scan.

Avoid excessive information density.

---

# 10. Tables

Use the Admin Dashboard table design as the reference.

Improve all tables across the application.

Tables should have:

* Proper spacing
* Clear column hierarchy
* Consistent headers
* Hover states
* Status badges
* Action buttons
* Responsive behavior

On smaller screens, use horizontal scrolling or an appropriate responsive layout instead of breaking the page.

---

# 11. Modals & Dialogs

Standardize every modal.

They should have:

* Consistent width
* Border radius
* Shadow
* Header
* Close button
* Content spacing
* Footer/action area

Destructive actions such as delete should always have confirmation dialogs.

---

# 12. Loading States

Improve every loading state.

Use polished:

* Skeleton loaders
* Button loading states
* Section loading states

Avoid unnecessary full-screen loaders.

The application should never feel frozen while data is loading.

---

# 13. Empty States

Create consistent empty states.

For example:

* No jobs found
* No saved jobs
* No applications
* No applicants
* No users
* No created jobs

Use:

* Appropriate Lucide icon
* Short message
* Helpful CTA where appropriate

---

# 14. Error States

Standardize error handling UI.

Use clean error messages rather than displaying raw backend errors.

Provide retry actions where appropriate.

Do not change backend behavior.

---

# 15. Responsive Design

This is extremely important.

Review every page at:

* 1440px+
* 1280px
* 1024px
* 768px
* 480px
* 375px

Fix:

* Overflow
* Broken grids
* Text wrapping
* Tables
* Buttons
* Forms
* Modals
* Navigation
* Cards
* Images

The application should feel intentionally designed for mobile, not simply desktop CSS compressed into a smaller screen.

---

# 16. Animations & Interactions

Add subtle professional interactions where useful:

* Button hover
* Card hover
* Navigation transitions
* Modal transitions
* Dropdown transitions
* Loading animations

Keep animations subtle.

Do NOT add excessive animations, 3D effects, distracting gradients, or unnecessary decorative elements.

The Admin Dashboard's clean professional feeling should remain the standard.

---

# 17. Icons

Use the existing icon library, preferably `lucide-react` if it is already installed.

Replace inconsistent/unprofessional icons where necessary.

Keep icon sizes and stroke weights consistent.

---

# 18. Color Consistency

Do NOT introduce random colors.

Extract the visual palette from the Admin Dashboard and reuse it throughout the application.

Create a consistent hierarchy for:

* Primary
* Secondary
* Background
* Surface
* Border
* Text
* Muted text
* Success
* Warning
* Error
* Info

Status colors may remain distinct where necessary for usability.

---

# 19. Dark/Light Theme

If the application already supports dark/light mode:

Make sure every page properly supports both themes.

Check:

* Forms
* Cards
* Tables
* Modals
* Dropdowns
* Navbar
* Footer
* Dashboard
* Empty states
* Error states

There should be no unreadable text, invisible borders, or white components appearing incorrectly in dark mode.

If theme functionality already exists, improve its styling rather than replacing the theme system.

---

# 20. Component Architecture

While improving the UI, identify duplicated UI patterns.

Create reusable components where appropriate:

* Button
* Input
* Card
* Badge
* Modal
* Table
* PageHeader
* EmptyState
* LoadingState
* SearchBar
* Filter
* Pagination

However, do not over-engineer the application.

Follow the existing project structure and conventions.

---

# 21. Preserve Functionality

This is critical.

**UI improvement must NOT break existing functionality.**

Do NOT unnecessarily change:

* API endpoints
* API request methods
* Authentication
* JWT handling
* Cookies
* Routing
* Backend logic
* Database models
* Existing business logic

If a component needs refactoring for UI purposes, preserve its existing behavior.

---

# 22. Do Not Use Fake Data

Do not replace existing API-driven data with hardcoded mock data.

If real API data exists, continue using it.

If a UI component needs data that does not currently exist, create a clean fallback/empty state rather than inventing production data.

---

# 23. Performance

While redesigning:

* Avoid unnecessary re-renders
* Avoid duplicated API calls
* Avoid unnecessarily large dependencies
* Reuse existing components
* Keep images optimized
* Do not add libraries unless genuinely necessary

The UI should be polished **without making the application slower**.

---

# 24. Final Quality Check

After completing the redesign, inspect the entire application as a user.

Navigate through:

1. Login
2. Register
3. Job Seeker Dashboard
4. Job Search
5. Job Details
6. Saved Jobs
7. Applied Jobs
8. Profile
9. Employer Dashboard
10. Create Job
11. Created Jobs
12. Applicants
13. Admin Dashboard
14. Users Management
15. Jobs Management
16. Applications
17. Logout

Check every page for visual consistency.

Look specifically for:

* Different button styles
* Different border radiuses
* Random colors
* Inconsistent spacing
* Broken responsive layouts
* Poor typography
* Overflow
* Misaligned icons
* Broken dark/light mode
* Inconsistent modals
* Poor loading states
* Empty pages
* Unnecessary visual clutter

Fix all issues you find.

---

# Most Important Instruction

**Do not redesign the Admin Dashboard itself unless necessary.**

The Admin Dashboard is already the UI that I like.

Use it as the **master reference**.

The goal is:

> **Admin Dashboard style → entire HireHunt application**

I want the final result to look like a polished, modern, production-ready job portal where every screen belongs to the same design system.

Do not just make individual pages "look better".

Create **visual consistency across the entire application**.
