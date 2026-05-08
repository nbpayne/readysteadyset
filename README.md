# Ready Steady Set - Website

Film set flat hire, Sydney. Built with Jekyll, hosted on GitHub Pages.

---

## Prerequisites

- **Ruby** 3.1+ (recommend using [rbenv](https://github.com/rbenv/rbenv) or [asdf](https://asdf-vm.com/))
- **Bundler** gem

Check your versions:
```bash
ruby -v
bundle -v
```

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ready-steady-set.git
cd ready-steady-set
```

### 2. Install dependencies

```bash
bundle install
```

### 3. Run the development server

```bash
bundle exec jekyll serve --livereload --open-url
```

This will:
- Build the site into `_site/`
- Start a local server at **http://localhost:4000**
- Open the browser automatically
- **Watch for file changes and live-reload** automatically (CSS, HTML, Markdown, etc.)

### 4. Available serve options

```bash
# Standard serve with live reload
bundle exec jekyll serve --livereload

# Also serves drafts (posts in _drafts/)
bundle exec jekyll serve --livereload --drafts

# Custom port
bundle exec jekyll serve --livereload --port 5000

# Verbose output for debugging
bundle exec jekyll serve --livereload --verbose

# Production build (minified CSS & JS)
JEKYLL_ENV=production bundle exec jekyll build
```

---

## Project Structure

```
ready-steady-set/
├-- _config.yml           # Site configuration, navigation, metadata
├-- _layouts/
|   ├-- default.html      # Base layout (head, nav, footer, scripts)
|   └-- showcase.html     # Showcase post layout with gallery
├-- _includes/
|   ├-- nav.html          # Site navigation
|   └-- footer.html       # Footer
├-- _showcase/            # Showcase collection (modular set examples)
|   ├-- music-room.md
|   ├-- bedroom.md
|   └-- impressionist-studio.md
├-- _sass/
|   ├-- _variables.scss   # Design tokens (colours, type, spacing)
|   ├-- _base.scss        # CSS reset and body styles
|   ├-- _layout.scss      # Container, grid, utility classes
|   ├-- _nav.scss         # Navigation styles
|   ├-- _components.scss  # Buttons, cards, forms, pricing
|   └-- _pages.scss       # Page-specific styles (hero, sections)
├-- assets/
|   ├-- css/
|   |   └-- main.scss     # SCSS entry point (imports all partials)
|   ├-- js/
|   |   └-- main.js       # Navigation, scroll reveal, lazy load, lightbox
|   └-- images/
|       ├-- rss-logo.jpg  # Primary brand logo
|       └-- showcase/     # Showcase photography (add your images here)
|           ├-- music-room/
|           ├-- bedroom/
|           └-- impressionist/
├-- index.html            # Home / landing page
├-- showcase.html         # Showcase index page
├-- how-it-works.html     # How it works page
├-- pricing.html          # Pricing page
├-- contact.html          # Contact page with form
└-- Gemfile               # Ruby gem dependencies
```

---

## Adding Photography

Place images in `assets/images/showcase/[project-name]/` and update the 
corresponding `_showcase/*.md` front matter to reference them:

```yaml
hero_image: /assets/images/showcase/music-room/hero.jpg
thumb: /assets/images/showcase/music-room/thumb.jpg
gallery:
  - src: /assets/images/showcase/music-room/01.jpg
    caption: "Description of this image"
```

**Recommended image sizes:**
- `hero.jpg` - 1920x1080px minimum, landscape
- `thumb.jpg` - 800x600px, 4:3 ratio
- Gallery images - 1200px minimum on longest edge, various ratios

---

## Adding a New Showcase

Create a new file in `_showcase/` following this template:

```markdown
---
layout: showcase
title: "Your Set Title"
tagline: Short descriptive line for the hero.
category: Music Video / Drama / Photography / etc.
production_type: TVC
order: 4                    # Controls display order
intro: "Opening paragraph shown before the body content."
flats_used: "12 flats"
shoot_days: "2 days"
configuration: "L-shaped room with corridor"
finish: "Painted (specify colour)"
hero_image: /assets/images/showcase/your-set/hero.jpg
thumb: /assets/images/showcase/your-set/thumb.jpg
gallery:
  - src: /assets/images/showcase/your-set/01.jpg
    caption: "Caption text"
excerpt: "One-sentence summary shown in showcase cards."
---

Your Markdown content goes here...
```

---

## Contact Form Setup

The contact form uses [Formspree](https://formspree.io) by default. To activate:

1. Create a free account at formspree.io
2. Create a new form and copy your form ID
3. Update `contact.html` line with your ID:
   ```html
   action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID"
   ```

**Alternative - Netlify Forms:**
If hosting on Netlify instead of GitHub Pages, replace the form tag with:
```html
<form class="contact-form" name="contact" method="POST" data-netlify="true">
```
And add a hidden field: `<input type="hidden" name="form-name" value="contact" />`

---

## Deployment to GitHub Pages

### First-time setup

1. Push the repository to GitHub
2. Go to **Settings -> Pages**
3. Set Source to **Deploy from a branch**
4. Select branch: `main`, folder: `/ (root)`
5. Save - your site will be live at `https://yourusername.github.io/ready-steady-set/`

### Update `_config.yml`

```yaml
url: "https://yourusername.github.io"
baseurl: "/ready-steady-set"
```

If using a custom domain (e.g. `readysteadyset.com.au`):
```yaml
url: "https://readysteadyset.com.au"
baseurl: ""
```
And add a `CNAME` file to the repo root containing just your domain.

### Deploying

```bash
git add -A
git commit -m "Your commit message"
git push origin main
```

GitHub Pages will build and deploy automatically within ~60 seconds.

---

## CSS & JS Minification

In production builds (`JEKYLL_ENV=production bundle exec jekyll build`), 
`jekyll-minifier` automatically:

- Compresses all CSS (via built-in Sass compression)
- Minifies all JavaScript (via Uglifier)
- Removes HTML comments
- Collapses whitespace

During local development (`jekyll serve`), minification is skipped for 
readable source and faster builds.

---

## Performance Notes

The site is built for performance:

- **Lazy loading** - all gallery images use `data-src` and load on scroll
- **Scroll reveal** - uses `IntersectionObserver` (no JS library needed)
- **Google Fonts** - loaded with `font-display: swap` via preconnect
- **Deferred JS** - main.js loads with `defer` attribute
- **CSS** - single compressed stylesheet, no framework bloat
- **Images** - add your own images as WebP where possible for best results

---

## Customisation

All design tokens live in `_sass/_variables.scss`. To change the brand colours:

```scss
$color-brown:   #7B3F1E;  // Primary brand colour
$color-cream:   #F5EDD8;  // Secondary / background
$color-accent:  #C4631A;  // Accent / highlight
```

Navigation links are controlled from `_config.yml`:

```yaml
nav_links:
  - title: "Showcase"
    url: "/showcase/"
  - title: "How It Works"
    url: "/how-it-works/"
  - title: "Pricing"
    url: "/pricing/"
  - title: "Contact"
    url: "/contact/"
```
