/**
 * Disabled routes. Middleware will not be invoked on these paths and requests will be passed through
 * @type {string[]}
 */

export const disabledRoutes = ["/admin"];

/**
 * An array of routes that are accessible to the user without authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification", "/auth/reset"];

/**
 * An array of routes that are used for authentication. These routes are used to
 * redirect the user to the login page if they are not authenticated
 * @type {string[]}
 */

export const authRoutes = [
  "/admin",
  "/auth/new-password",
  "/auth/error",
  "/settings",
  "/notifications/dashboard",
  "/notifications/create",
  "/notifications/add-website",
];

/**
 * An array of routes where you need to be admin to access
 * @type {string[]}
 */

export const adminRoutes = ["/admin-dashboard", "/admin-dashboard/users"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
