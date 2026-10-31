# AI subscriptions – implementation status

## Added
- `/api/ai-subscription/plans?audience=user|b2b`: public active plan list.
- `GET /api/ai-subscription/me`: verified user subscription, per-feature quotas and invoices.
- `POST /api/ai-subscription/order`: server-priced Razorpay order.
- `POST /api/ai-subscription/verify`: signature + Razorpay captured payment verified before activation.
- `POST /api/ai-subscription/plans`, `PATCH /api/ai-subscription/plans/:id`: admin-only plan management.
- Quota middleware on `/api/ai/ask`, `/api/shipments/step1`, `/api/shipments/:id/analyze`.
- SubscriptionUsage and SubscriptionPayment collections, plan audience/tier/featureLimits.
- Subscription activation notification and daily expiry reminders 15 days before expiry.
- User/B2B subscription UI and Razorpay checkout on Upgrade page.

## Environment
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
FREE_TESTING_UNLIMITED=true

Set FREE_TESTING_UNLIMITED=false to require active subscriptions when there is none. Never commit secrets. Configure webhook/reconciliation for production and move notifications to persistent scheduled worker. Razorpay payment test and Vite build require installed dependencies and test keys.

## Important outstanding
- All AI features (HS Lookup, Incentive Checker, Government Schemes, Country Rules, B2B Trade Research) have **not** been safely mapped to every API endpoint; do not claim full enforcement. Some routes are public reference-data reads and must not consume quota blindly.
- Admin Plans old UI still uses original Plan controller: new dynamic plan API is available but Admin UI must be migrated.
- Website pricing comparison UI remains legacy and must be linked to API.
- Paid plan renewal/trial state machine, refund, webhook reconciliation, robust invoice PDF and integration testing pending.
- The in-process daily alert runs only while server is running. Use external scheduler for reliable production.
