# KnowYourRights AI - Deployment Guide

This guide will walk you through deploying the KnowYourRights AI application to production.

## Prerequisites

- Supabase account
- Stripe account
- OpenRouter account (for OpenAI API access)
- Vercel account (for frontend deployment)

## 1. Supabase Setup

### Create a New Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created

### Database Setup

1. Navigate to the SQL Editor in your Supabase dashboard
2. Run the migration files in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_state_laws.sql`

### Edge Functions Deployment

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. Deploy the Edge Functions:
   ```bash
   supabase functions deploy create-checkout-session
   supabase functions deploy create-portal-session
   supabase functions deploy stripe-webhook
   supabase functions deploy send-emergency-email
   ```

### Environment Variables

Set the following environment variables in your Supabase dashboard under Settings > Edge Functions:

```
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 2. Stripe Setup

### Create Products and Prices

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Products
3. Create two products:

**Premium Monthly:**
- Name: "KnowYourRights AI Premium Monthly"
- Price: $4.99 USD
- Billing: Recurring monthly
- Copy the Price ID (starts with `price_`)

**Premium Yearly:**
- Name: "KnowYourRights AI Premium Yearly"
- Price: $49.99 USD
- Billing: Recurring yearly
- Copy the Price ID (starts with `price_`)

### Webhook Configuration

1. Go to Developers > Webhooks in your Stripe dashboard
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/stripe-webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret (starts with `whsec_`)

## 3. OpenRouter Setup

1. Go to [OpenRouter](https://openrouter.ai)
2. Create an account and get your API key
3. Add credits to your account for API usage

## 4. Frontend Deployment (Vercel)

### Environment Variables

Set these environment variables in your Vercel dashboard:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openrouter_api_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
VITE_STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_your_monthly_price_id
VITE_STRIPE_PREMIUM_YEARLY_PRICE_ID=price_your_yearly_price_id
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Import the project
3. Set the environment variables
4. Deploy

## 5. Domain Configuration

### Custom Domain (Optional)

1. In Vercel, go to your project settings
2. Navigate to Domains
3. Add your custom domain
4. Configure DNS records as instructed

### Supabase Custom Domain (Optional)

1. In Supabase, go to Settings > API
2. Configure custom domain if needed
3. Update CORS settings to include your domain

## 6. Security Configuration

### Row Level Security

RLS policies are already configured in the migration files. Verify they're active:

1. Go to Authentication > Policies in Supabase
2. Ensure all tables have appropriate policies enabled

### CORS Configuration

Update CORS settings in Supabase:

1. Go to Settings > API
2. Add your production domain to CORS origins
3. Include common headers: `authorization`, `x-client-info`, `apikey`, `content-type`

## 7. Testing

### Test Payment Flow

1. Use Stripe test cards to verify checkout works
2. Test subscription creation and management
3. Verify webhook events are processed correctly

### Test Core Features

1. User registration and authentication
2. State-specific rights guides
3. Recording functionality
4. Emergency contact management
5. Location services

## 8. Monitoring and Analytics

### Error Monitoring

Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Vercel Analytics for performance monitoring

### Database Monitoring

- Monitor Supabase dashboard for performance
- Set up alerts for high usage
- Review slow queries regularly

## 9. Backup and Recovery

### Database Backups

Supabase automatically backs up your database, but consider:
- Setting up additional backup schedules
- Testing restore procedures
- Documenting recovery processes

### Code Backups

- Ensure code is backed up in version control
- Tag releases for easy rollback
- Document deployment procedures

## 10. Maintenance

### Regular Updates

- Keep dependencies updated
- Monitor security advisories
- Update state law information regularly
- Review and update pricing as needed

### Performance Optimization

- Monitor Core Web Vitals
- Optimize images and assets
- Review and optimize database queries
- Consider CDN for static assets

## Troubleshooting

### Common Issues

**Stripe Webhooks Not Working:**
- Verify webhook URL is correct
- Check webhook signing secret
- Review Supabase function logs

**Database Connection Issues:**
- Verify RLS policies
- Check API keys and permissions
- Review Supabase project status

**Authentication Problems:**
- Verify Supabase auth configuration
- Check redirect URLs
- Review user creation triggers

### Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [OpenRouter Documentation](https://openrouter.ai/docs)

## Security Checklist

- [ ] All environment variables are set correctly
- [ ] RLS policies are enabled and tested
- [ ] CORS is configured properly
- [ ] Webhook endpoints are secured
- [ ] API keys are not exposed in client code
- [ ] HTTPS is enforced everywhere
- [ ] Input validation is implemented
- [ ] Rate limiting is configured

## Go-Live Checklist

- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Edge functions deployed
- [ ] Stripe products and webhooks configured
- [ ] Domain configured and SSL active
- [ ] Monitoring and analytics set up
- [ ] Backup procedures tested
- [ ] Documentation updated
- [ ] Team trained on maintenance procedures

---

**Note:** This is a production deployment guide. Always test thoroughly in a staging environment before deploying to production.
