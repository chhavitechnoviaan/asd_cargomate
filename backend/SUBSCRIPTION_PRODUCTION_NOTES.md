# CargoMate subscription work — October 31, 2026

Implemented in this patch: one-time 7-day trial endpoint, explicit opt-in free testing bypass, webhook signature verification, failure/capture reconciliation metadata, account-scoped PDF invoice download, external-run daily reminder worker, corrected Plan schema duplicate `features`, dynamic public pricing fetch with fallback.

Environment: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `MONGO_URI`, `JWT_SECRET`. For no-limit local testing only, set `FREE_TESTING_UNLIMITED=true` (otherwise limits require subscription).

Endpoints: POST `/api/ai-subscription/trial` `{planId}`, GET `/api/ai-subscription/invoices/:id/pdf`, POST `/api/ai-subscription/webhook` (raw Razorpay payload).

NOT YET PRODUCTION VERIFIED: must test live payment and webhook, crash recovery/idempotency across multi-write activation, tax-compliant invoices, all feature routes, all frontend flows, and Vite build. A robust background queue and transactional activation are recommended before production; the external worker should run daily via your hosting scheduler. Do not claim this package is fully production ready.
