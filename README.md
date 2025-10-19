# School Meal Feedback System

A comprehensive feedback system for schools to provide feedback to meal providers about food quality and service.

## 🌟 Features

- **Admin Dashboard**: View all feedback submissions with detailed ratings and analytics
- **User Feedback Form**: Submit detailed feedback with 7 rating categories and additional comments
- **PostgreSQL Database**: Robust data storage with Drizzle ORM
- **Docker Support**: Easy database setup with Docker Compose
- **Authentication**: Secure login for both admin and users
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 16 with Drizzle ORM
- **Authentication**: NextAuth.js v5
- **Container**: Docker & Docker Compose
- **Package Manager**: pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **pnpm** (v8 or higher) - [Install pnpm](https://pnpm.io/installation)
  ```bash
  npm install -g pnpm
  ```
- **Docker Desktop** - [Download Docker](https://www.docker.com/products/docker-desktop/)
  - Docker Compose is included with Docker Desktop

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd feedback-system
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all required packages including Next.js, Drizzle ORM, and other dependencies.

### 3. Set Up Environment Variables

The `.env.local` file should already exist in the root directory with the following configuration:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/feedback_system
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Fixed Admin Credentials
ADMIN_EMAIL=admin@feedbacksystem.com
ADMIN_PASSWORD=admin123

# Fixed User Credentials
USER_EMAIL=user@email.com
USER_PASSWORD=user123
```

> **Note**: If `.env.local` doesn't exist, copy `.env.example` and rename it to `.env.local`

### 4. Start PostgreSQL Database with Docker

Start the PostgreSQL database container using Docker Compose:

```bash
docker-compose up -d
```

**Explanation of the command:**
- `docker-compose up`: Starts the services defined in `docker-compose.yml`
- `-d`: Runs containers in detached mode (background)

**Verify the database is running:**
```bash
docker ps
```

You should see a container named `feedback-db` running.

### 5. Set Up the Database Schema

Create the database tables using Drizzle migrations:

**Option A: Using the migration script**
```bash
pnpm db:generate
pnpm db:migrate
```

**Option B: Create tables manually (if migrations fail)**
```bash
# Create feedbacks table
docker exec -it feedback-db psql -U postgres -d feedback_system -c "CREATE TABLE IF NOT EXISTS feedbacks (id serial PRIMARY KEY NOT NULL, user_email varchar(255) NOT NULL, school_name varchar(255) NOT NULL, food_quality_rating integer NOT NULL, food_taste_rating integer NOT NULL, portion_size_rating integer NOT NULL, food_temperature_rating integer NOT NULL, variety_rating integer NOT NULL, presentation_rating integer NOT NULL, hygiene_rating integer NOT NULL, favorite_item varchar(255), least_favorite_item varchar(255), suggestions text, created_at timestamp DEFAULT now());"

# Create users table
docker exec -it feedback-db psql -U postgres -d feedback_system -c "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY NOT NULL, email varchar(255) NOT NULL UNIQUE, password text NOT NULL, role varchar(20) DEFAULT 'user' NOT NULL, created_at timestamp DEFAULT now());"
```

### 6. Start the Development Server

```bash
pnpm dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### 7. Access the Application

Open your browser and navigate to:
- **Application**: [http://localhost:3000](http://localhost:3000)
- You will be redirected to the login page

## 🔐 Login Credentials

### Admin Access
- **Email**: `admin@feedbacksystem.com`
- **Password**: `admin123`
- **Dashboard**: `/admin/dashboard`
- **Capabilities**: 
  - View all feedback submissions
  - See detailed ratings and statistics
  - Read user comments and suggestions
  - Filter and analyze feedback data

### User Access
- **Email**: `user@email.com`
- **Password**: `user123`
- **Dashboard**: `/feedback`
- **Capabilities**: 
  - Submit feedback forms about meal quality
  - Rate 7 different aspects of meals
  - Provide detailed comments and suggestions

## 📝 Feedback Form Features

The user feedback form includes comprehensive rating and feedback options:

### 7 Rating Categories (1-5 scale):
1. **Food Quality** - Overall quality of ingredients and preparation
2. **Food Taste** - Flavor and palatability of the meals
3. **Portion Size** - Adequacy of serving sizes
4. **Food Temperature** - Temperature of food when served
5. **Variety of Meals** - Range and diversity of menu options
6. **Food Presentation** - Visual appeal and plating
7. **Hygiene Standards** - Cleanliness and food safety

### Additional Input Fields:
- **School Name** (required) - Name of the school providing feedback
- **Favorite Meal Item** (optional) - Most liked menu item
- **Least Favorite Meal Item** (optional) - Least preferred menu item
- **Suggestions and Improvements** (optional) - Detailed paragraph for feedback and recommendations

## 🗄️ Database Management

### View Database in Drizzle Studio
Access a visual database browser:
```bash
pnpm db:studio
```

### Generate New Migrations
After modifying the schema in `db/schema.ts`:
```bash
pnpm db:generate
pnpm db:migrate
```

### Check Database Status
```bash
docker ps
```

### View Database Logs
```bash
docker logs feedback-db
```

### Access PostgreSQL Console
```bash
docker exec -it feedback-db psql -U postgres -d feedback_system
```

### Stop Docker Database
```bash
docker-compose down
```

### Restart Docker Database
```bash
docker-compose restart
```

### Reset Database (Delete all data)
```bash
docker-compose down -v
docker-compose up -d
# Then recreate tables manually or run migrations
```

## Project Structure

```
feedback-system/
├── app/
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.tsx          # Admin dashboard
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts      # Auth API routes
│   │   └── feedback/
│   │       └── route.ts          # Feedback API routes
│   ├── feedback/
│   │   └── page.tsx              # User feedback form
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Root redirect
├── db/
│   ├── index.ts                  # Database connection
│   ├── migrate.ts                # Migration script
│   └── schema.ts                 # Database schema
├── types/
│   └── next-auth.d.ts            # Auth type definitions
├── auth.ts                       # NextAuth configuration
├── middleware.ts                 # Route protection
├── docker-compose.yml            # PostgreSQL container
├── drizzle.config.ts             # Drizzle configuration
└── .env.local                    # Environment variables
```

## API Routes

### POST /api/feedback
Submit new feedback (requires user authentication)

### GET /api/feedback
Get all feedback submissions (requires admin authentication)

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server on http://localhost:3000 |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm db:generate` | Generate database migration files from schema |
| `pnpm db:migrate` | Apply migrations to the database |
| `pnpm db:studio` | Open Drizzle Studio for database management |

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: Cannot connect to PostgreSQL database

**Solution**:
```bash
# Check if Docker is running
docker ps

# Restart the database container
docker-compose restart

# Check database logs for errors
docker logs feedback-db
```

### Migration Errors

**Problem**: Migration fails or tables don't exist

**Solution**:
```bash
# Drop existing tables and recreate
docker exec -it feedback-db psql -U postgres -d feedback_system -c "DROP TABLE IF EXISTS feedbacks CASCADE;"
docker exec -it feedback-db psql -U postgres -d feedback_system -c "DROP TABLE IF EXISTS users CASCADE;"

# Create tables manually
docker exec -it feedback-db psql -U postgres -d feedback_system -c "CREATE TABLE IF NOT EXISTS feedbacks (id serial PRIMARY KEY NOT NULL, user_email varchar(255) NOT NULL, school_name varchar(255) NOT NULL, food_quality_rating integer NOT NULL, food_taste_rating integer NOT NULL, portion_size_rating integer NOT NULL, food_temperature_rating integer NOT NULL, variety_rating integer NOT NULL, presentation_rating integer NOT NULL, hygiene_rating integer NOT NULL, favorite_item varchar(255), least_favorite_item varchar(255), suggestions text, created_at timestamp DEFAULT now());"

docker exec -it feedback-db psql -U postgres -d feedback_system -c "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY NOT NULL, email varchar(255) NOT NULL UNIQUE, password text NOT NULL, role varchar(20) DEFAULT 'user' NOT NULL, created_at timestamp DEFAULT now());"
```

### Port Already in Use

**Problem**: Port 3000 or 5432 is already in use

**Solution**:
```bash
# For port 3000 (Next.js)
# Kill the process using port 3000 or run on a different port
pnpm dev -- -p 3001

# For port 5432 (PostgreSQL)
# Change the port in docker-compose.yml:
# ports:
#   - "5433:5432"
# Then update DATABASE_URL in .env.local accordingly
```

### Authentication Issues

**Problem**: Login fails or redirects incorrectly

**Solution**:
- Verify `.env.local` file exists and contains correct credentials
- Clear browser cookies and cache
- Restart the development server

### Docker Not Starting

**Problem**: Docker container won't start

**Solution**:
```bash
# Remove old containers and volumes
docker-compose down -v

# Pull the latest PostgreSQL image
docker pull postgres:16-alpine

# Start fresh
docker-compose up -d
```

## 🏗️ Project Structure

```
feedback-system/
├── app/                          # Next.js App Router
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.tsx         # Admin dashboard page
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts     # NextAuth API routes
│   │   └── feedback/
│   │       └── route.ts         # Feedback CRUD API
│   ├── feedback/
│   │   └── page.tsx             # User feedback form
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (redirects to login)
├── db/
│   ├── index.ts                 # Database connection
│   ├── migrate.ts               # Migration runner script
│   └── schema.ts                # Drizzle schema definitions
├── drizzle/                     # Generated migration files
├── types/
│   └── next-auth.d.ts           # TypeScript type extensions for NextAuth
├── auth.ts                      # NextAuth configuration
├── middleware.ts                # Route protection middleware
├── docker-compose.yml           # PostgreSQL container config
├── drizzle.config.ts            # Drizzle ORM configuration
├── .env.local                   # Environment variables (not in git)
├── .env.example                 # Example environment file
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🔒 Security Notes

- **Production**: Change `NEXTAUTH_SECRET` to a secure random string
- **Production**: Use environment variables for sensitive data, not hardcoded values
- **Production**: Implement proper password hashing if storing user passwords
- **Production**: Use HTTPS for all connections
- **Production**: Configure proper CORS policies
- **Production**: Set up proper database user permissions (don't use postgres user in production)

## 🚀 Deployment

### Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables for Production

Ensure these environment variables are set in your production environment:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Strong random secret (generate with: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your production URL
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- `USER_EMAIL` and `USER_PASSWORD`

### Deployment Platforms

This application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Railway** (with PostgreSQL)
- **Heroku**
- **AWS** (EC2 + RDS)
- **DigitalOcean** (App Platform + Managed Database)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the Troubleshooting section above
2. Review the existing issues on GitHub
3. Create a new issue with detailed information about your problem

---

**Happy Coding! 🎉**
