# Getting Started

## Prerequisites
- Node.js 20+
- npm or yarn
- Git
- Supabase account
- Vercel account (optional)

## Setup
1. Create a new Supabase project
2. Copy your project URL and anon key
3. Add them to .env.local
4. Start developing!

1. **Clone the Repository**
```bash
git clone https://github.com/onlyInTheatres/mus-webapp-stack.git
cd mus-webapp-stack
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure Environment Variables**
Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. **Start Development Server**
```bash
npm run dev
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | No | 

No local Supabase setup required! 🎉