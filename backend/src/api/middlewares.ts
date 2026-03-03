import { defineMiddlewares } from "@medusajs/framework/http";
import type {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";

/**
 * Middleware para bloquear el acceso a rutas admin restringidas.
 *
 * Bloquea las siguientes rutas admin para usuarios que no tengan
 * el flag "superadmin" en su app_metadata:
 *
 * - /admin/promotions/*
 * - /admin/campaigns/*
 * - /admin/price-lists/*
 * - /admin/customers/*
 * - /admin/customer-groups/*
 *
 * Para dar acceso de superadmin a un usuario, añadir en la DB:
 *   UPDATE auth_identity SET app_metadata = '{"superadmin": true}' WHERE id = 'xxx';
 *
 * O eliminando este archivo para desactivar todas las restricciones.
 */

const restrictedRouteGuard = (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction,
) => {
  const authContext = (req as any).auth_context;

  // Si no hay contexto de auth, dejar que el middleware de auth lo maneje
  if (!authContext) {
    return next();
  }

  // Si el usuario tiene flag superadmin, permitir acceso
  const appMetadata = authContext.app_metadata || {};
  if (appMetadata.superadmin === true) {
    return next();
  }

  // Bloquear acceso para usuarios no superadmin
  res.status(403).json({
    type: "not_allowed",
    message: "No tienes permisos para acceder a esta sección.",
  });
};

export default defineMiddlewares({
  routes: [
    // Bloquear /admin/promotions y sus sub-rutas
    {
      matcher: "/admin/promotions(.*)",
      middlewares: [restrictedRouteGuard],
    },
    // Bloquear /admin/campaigns y sus sub-rutas
    {
      matcher: "/admin/campaigns(.*)",
      middlewares: [restrictedRouteGuard],
    },
    // Bloquear /admin/price-lists y sus sub-rutas
    {
      matcher: "/admin/price-lists(.*)",
      middlewares: [restrictedRouteGuard],
    },
    // Bloquear /admin/customers y sus sub-rutas
    {
      matcher: "/admin/customers(.*)",
      middlewares: [restrictedRouteGuard],
    },
    // Bloquear /admin/customer-groups y sus sub-rutas
    {
      matcher: "/admin/customer-groups(.*)",
      middlewares: [restrictedRouteGuard],
    },
  ],
});
