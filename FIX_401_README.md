# Admin 401 fix

Root cause: login saved the current JWT to `sessionStorage.cargomate-session`, whereas the Axios instance used by Admin Users, Vendors, Roles read `localStorage.token`. An old or missing token caused 401 responses.

Changes:
- Admin Axios now reads the same current JWT as the login/route guard.
- Extra CargoMate Axios and AI assistant token reads updated.
- Logout removes both current and stale legacy tokens.
- Login clears old legacy tokens when saving a new session.
- Role comparisons normalized to lowercase after database population.

Restart frontend and backend, log out and log in as Admin again. Check requests in DevTools: `/api/users`, `/api/vendors`, `/api/roles`. Successful 200 responses require a live database and valid Admin JWT.

Never publish backend `.env`; configure secrets locally.
