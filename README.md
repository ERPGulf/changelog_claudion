# Changelog App

A comprehensive changelog management system built for Frappe/ERPNext applications. This app allows you to create, manage, and display beautiful changelogs for your applications with support for categories, tags, media attachments, and more.

## Features

- **Modern UI**: Clean, responsive React-based frontend with Tailwind CSS
- **Mobile Friendly**: Fully responsive design that works on all devices
- **API Access**: RESTful API for programmatic access to changelog data
- **Rich Changelog Entries**: Create detailed changelog entries with titles, descriptions, dates, and media
- **Tag System**: Organize entries with predefined tags (security, update, performance, optimization, bugfix, maintenance, features, release, initial, new)
- **Category Management**: Group changelogs by categories with custom settings
- **Media Support**: Attach images and videos to changelog entries
- **URL Links**: Add external links to changelog entries

## Installation

1. **Install the app in your Frappe bench:**

   ```bash
   bench get-app https://github.com/your-repo/changelog_claudion
   bench --site your-site install-app changelog_claudion
   ```

2. **Build the frontend assets:**

   ```bash
   cd apps/changelog_claudion/frontend
   npm install
   npm run build
   ```

3. **Update bench:**
   ```bash
   bench build
   ```

## Usage

### Creating Changelog Settings

1. Go to **Changelog Settings** in your Frappe desk
2. Create a new category document with:
   - **Title**: Your application name
   - **Logo**: Upload your company/app logo
   - **Description**: Brief description of your application
   - **Email**: Contact email
   - **Link**: Your website URL

### Adding Changelog Entries

1. Go to **Changelog List** in your Frappe desk
2. Create a new changelog entry with:
   - **Title**: Brief title of the change
   - **Date**: Release/change date
   - **Description**: Detailed description of changes
   - **Image**: Optional screenshot or image
   - **Video**: Optional video demonstration
   - **URL**: Link to more information
   - **Category**: Link to changelog settings
   - **Tags**: Select appropriate tags

### Viewing Changelogs

**Public Access:**

- Visit `https://your-site.com/logger?category=your_category` to view the changelog.Make sure you enter the exact category name.

## API Response Format

```json
{
  "message": {
    "title": "Your App Name",
    "description": "App description",
    "logo": "https://your-site.com/files/logo.png",
    "link": "https://your-website.com",
    "email": "contact@yourapp.com",
    "data": [
      {
        "id": 1,
        "title": "New Feature Release",
        "date": "2025-01-15",
        "url": "https://docs.yourapp.com/release-notes",
        "description": "Added new dashboard features...",
        "image": "https://your-site.com/files/screenshot.png",
        "video": "https://your-site.com/files/demo.mp4",
        "tags": ["new", "features"],
        "category": "main"
      }
    ]
  }
}
```

## Development

### Frontend Development

The frontend is built with React, TypeScript, and Tailwind CSS.

```bash
cd frontend
npm install
npm run dev  # Development server
npm run build  # Production build
```

### Project Structure

```
changelog_claudion/
├── changelog_claudion/
│   ├── api/
│   │   └── log_claudion.py          # Main API endpoint
│   ├── doctype/
│   │   ├── changelog/               # Changelog DocType
│   │   ├── changelog_settings/      # Settings DocType
│   │   └── log_claudion_child_table/ # Tags child table
│   └── page/
│       └── changelog/               # Frappe page integration
├── frontend/                        # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Changelog.tsx        # Main component
│   │   └── App.tsx
│   └── package.json
├── fixtures/
│   └── custom_field.json           # Custom field definitions
└── hooks.py                        # Frappe hooks
```

## Customization

### Styling Customization

The frontend uses Tailwind CSS. Modify `frontend/src/components/Changelog.tsx` to customize:

- Tag colors in the `tagColors` object
- Layout and spacing
- Typography and colors

### API Customization

Extend the API in `changelog_claudion/api/log_claudion.py` to add:

- Additional filtering options
- Custom response formats
- Authentication requirements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- Create an issue on GitHub for bug reports
- Check the Frappe documentation for general framework questions
- Contact: rishikesh@htsqatar

---
