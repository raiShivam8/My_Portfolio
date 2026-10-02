# Project Screenshots Directory

Place all your project screenshot image files in this folder (or inside the project-specific subfolders):

```
frontend/public/images/projects/
├── ai-helpdesk/
│   ├── dashboard.png
│   ├── tickets.png
│   └── ...
└── mycart/
    ├── storefront.png
    ├── cart.png
    └── ...
```

## How to use them in the portfolio:

Because this directory is inside Vite's `public/` directory, any file placed here is automatically served at the root URL path:

- A file at `frontend/public/images/projects/ai-helpdesk/dashboard.png`
  is accessible in your code as:
  `/images/projects/ai-helpdesk/dashboard.png`

- A file at `frontend/public/images/projects/mycart/storefront.png`
  is accessible in your code as:
  `/images/projects/mycart/storefront.png`

Recommended image formats: `.png`, `.jpg`, `.webp`.
