# KnowYourRights AI

**Instant legal knowledge and safety tools for police interactions.**

KnowYourRights AI is a web application that provides individuals with clear, actionable legal information and immediate documentation tools during police interactions, with a focus on state-specific rights and bilingual scripts.

## 🚀 Features

### Core Features

- **State-Specific Rights Guides**: Mobile-optimized, one-page guides detailing user rights, what to do, and what not to say during police stops, tailored to the user's current state.

- **Bilingual Scripted Responses**: Easy-to-use, pre-written scripts in English and Spanish for common police interaction scenarios.

- **One-Tap Interaction Recording**: A prominent button to quickly start audio or video recording of an interaction, saving the footage securely.

- **Location-Based Safety Alerts**: Automatically share live location and interaction status with pre-selected trusted contacts.

### Premium Features

- All state-specific rights guides
- Bilingual scripts (English & Spanish)
- Advanced recording features
- Encrypted location alerts
- Priority support

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Payments**: Stripe
- **AI**: OpenAI (via OpenRouter)
- **Deployment**: Vercel/Netlify + Supabase

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- Stripe account
- OpenRouter API key (for OpenAI access)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/vistara-apps/this-is-a-3738.git
cd this-is-a-3738
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment template:

```bash
cp .env.example .env
```

Fill in your environment variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# OpenAI Configuration (using OpenRouter)
VITE_OPENAI_API_KEY=your-openrouter-api-key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
VITE_STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_your-monthly-price-id
VITE_STRIPE_PREMIUM_YEARLY_PRICE_ID=price_your-yearly-price-id
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the database migrations:

```bash
# Using Supabase CLI
supabase db push

# Or manually run the SQL files in supabase/migrations/
```

### 5. Supabase Edge Functions

Deploy the Edge Functions for Stripe integration:

```bash
supabase functions deploy create-checkout-session
supabase functions deploy create-portal-session
supabase functions deploy stripe-webhook
```

Set the environment variables in your Supabase dashboard:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`

### 6. Stripe Setup

1. Create products and prices in your Stripe dashboard
2. Set up webhook endpoints pointing to your Supabase Edge Functions
3. Configure the webhook to listen for these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### 7. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── StateGuideCard.jsx
│   ├── ScriptButton.jsx
│   ├── LocationSelector.jsx
│   └── EmergencyContacts.jsx
├── contexts/           # React contexts for state management
│   ├── AuthContext.jsx
│   ├── LocationContext.jsx
│   └── RecordingContext.jsx
├── lib/               # Utility libraries and services
│   ├── supabase.js
│   ├── stripe.js
│   ├── openai.js
│   └── emergencyContacts.js
├── pages/             # Page components
│   ├── HomePage.jsx
│   ├── RightsGuide.jsx
│   ├── Scripts.jsx
│   ├── Recording.jsx
│   ├── Profile.jsx
│   └── Auth.jsx
└── App.jsx           # Main application component

supabase/
├── migrations/        # Database schema and seed data
│   ├── 001_initial_schema.sql
│   └── 002_seed_state_laws.sql
└── functions/         # Edge Functions
    ├── create-checkout-session/
    ├── create-portal-session/
    └── stripe-webhook/
```

## 🗄 Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (Text)
- `subscription_status` (Text: 'free', 'premium', 'cancelled')
- `preferred_language` (Text: 'english', 'spanish')
- `trusted_contacts` (JSONB)
- `stripe_customer_id` (Text)

### Interactions Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `timestamp_start` (Timestamp)
- `timestamp_end` (Timestamp)
- `location_start` (JSONB)
- `location_end` (JSONB)
- `recording_url` (Text)
- `recording_type` (Text: 'audio', 'video')
- `alert_sent` (Boolean)
- `notes` (Text)

### State Laws Table
- `id` (UUID, Primary Key)
- `state` (Text, Unique)
- `state_code` (Text, Unique)
- `rights_guide_text` (Text)
- `script_english` (JSONB)
- `script_spanish` (JSONB)

### Emergency Contacts Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `name` (Text)
- `phone` (Text)
- `email` (Text)
- `relationship` (Text)
- `is_primary` (Boolean)

## 🎨 Design System

The application uses a custom Tailwind CSS configuration with the following design tokens:

### Colors
- `bg`: hsl(210, 11%, 97%) - Background
- `accent`: hsl(210, 100%, 50%) - Primary accent
- `danger`: hsl(0, 72%, 50%) - Error/danger states
- `primary`: hsl(210, 13%, 17%) - Primary text
- `surface`: hsl(0, 0%, 100%) - Card surfaces

### Spacing
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px

### Border Radius
- `sm`: 6px
- `md`: 10px
- `lg`: 16px

## 🔐 Security Features

- **Row Level Security (RLS)**: All database tables have RLS policies
- **Authentication**: Supabase Auth with email/password
- **Data Encryption**: Sensitive data encrypted at rest
- **CORS Protection**: Proper CORS configuration for API endpoints
- **Input Validation**: Client and server-side validation

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Deployment (Supabase)

1. Database migrations are automatically applied
2. Edge Functions deployed via Supabase CLI
3. Environment variables set in Supabase dashboard

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized for mobile browsers
- Progressive Web App (PWA) ready

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📈 Analytics & Monitoring

- User interaction tracking
- Error monitoring with Sentry
- Performance monitoring
- Subscription analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@knowyourrights-ai.com or join our Discord community.

## 🔗 Links

- [Live Demo](https://knowyourrights-ai.vercel.app)
- [Documentation](https://docs.knowyourrights-ai.com)
- [API Reference](https://api.knowyourrights-ai.com/docs)

---

**Disclaimer**: This application provides general legal information and should not be considered as legal advice. Always consult with a qualified attorney for specific legal matters.
