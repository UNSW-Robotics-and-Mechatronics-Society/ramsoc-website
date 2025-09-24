# RAMSoc UNSW Website

The official website for the UNSW Robotics and Mechatronics Society (RAMSoc) - a student-run engineering society that provides Mechatronic Engineering opportunities and pathways between students and the professional community.

![Website Preview](public/og.svg)

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SCSS modules
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Data

- **CMS**: Contentful for content management
- **Database**: Notion API for career listings
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios

### Development & Deployment

- **Package Manager**: Yarn
- **Linting**: ESLint with Next.js config
- **Code Formatting**: Prettier
- **Component Development**: Storybook
- **Deployment**: Cloudflare Pages (to be migrated to Cloudflare Workers)
- **Build Tool**: Turbopack

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/UNSW-Robotics-and-Mechatronics-Society/ramsoc-website.git
   cd ramsoc-website
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Contentful
   CONTENTFUL_SPACE_ID=your_contentful_space_id
   CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token

   # Notion
   NOTION_TOKEN=your_notion_integration_token
   NEXT_PUBLIC_NOTION_CAREERS_DB_ID=your_careers_database_id
   ```

4. **Start the development server**

   ```bash
   yarn dev
   ```

   The website will be available at `http://localhost:3000`

## 🏗️ Project Structure

```txt
src/
├── app/                          # Next.js App Router
│   ├── _components/             # Page-specific components
│   ├── api/                     # API routes
│   ├── events/                  # Events pages
│   ├── teams/                   # Team pages
│   └── careers/                 # Career portal
├── components/                   # Reusable UI components
│   └── ui/                      # Base UI components
├── features/                    # Feature-specific components
│   └── events/                  # Event-related components
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
├── types/                       # TypeScript type definitions
└── data/                        # Static data files
```

## 🔧 Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn check-types` - Type checking with TypeScript
- `yarn storybook` - Start Storybook development server
- `yarn build-storybook` - Build Storybook for production

### Cloudflare Pages Deployment

- `yarn pages:build` - Build for Cloudflare Pages
- `yarn preview` - Preview Cloudflare Pages build locally
- `yarn deploy` - Deploy to Cloudflare Pages

## 🎨 Component Development

This project uses Storybook for component development and documentation. To develop components in isolation:

```bash
yarn storybook
```

Visit `http://localhost:6006` to view the component library.

## 📝 Content Management

### Contentful Integration

The website uses Contentful as a headless CMS for managing:

- Event information
- Team member profiles
- General content

### Notion Integration

Career listings are managed through Notion databases, providing:

- Easy content management for non-technical users
- Rich text editing capabilities
- Structured data for job postings

## 🔌 API Routes

- `/api/events` - Fetch events from Contentful
- `/api/notion/db/[slug]` - Query Notion databases
- `/api/notion/page/[slug]` - Fetch individual Notion pages

## 🎯 Key Features

### Career Portal

- Interactive job listings with filtering
- Modal overlays for detailed job descriptions
- Direct application links
- Responsive design for mobile and desktop

### Events System

- Dynamic event cards with loading states
- Past and current events separation
- Contentful integration for easy content management

### Team Showcase

- Year-based team browsing
- Profile cards with member information
- Subcommittee organization

## 🚀 Deployment

The website is deployed on Cloudflare Pages with automatic deployments from the main branch.

### Environment Setup

Ensure all required environment variables are set in your deployment platform:

- Contentful credentials
- Notion API tokens
- Any additional API keys

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing TypeScript and React patterns
- Use Prettier for code formatting
- Ensure ESLint passes before submitting
- Write meaningful commit messages

## 📄 License

This project is private and belongs to the UNSW Robotics and Mechatronics Society.

## 📧 Contact

For questions or support:

- **Website**: [ramsocunsw.org](https://ramsocunsw.org)
- **Email**: [technical@ramsocunsw.org](mailto:technical@ramsocunsw.org)
- **GitHub**: [UNSW-Robotics-and-Mechatronics-Society](https://github.com/UNSW-Robotics-and-Mechatronics-Society)

---

Built with ❤️ by the RAMSoc team at UNSW
