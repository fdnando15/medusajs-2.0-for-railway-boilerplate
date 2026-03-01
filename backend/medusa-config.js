import { loadEnv, Modules, defineConfig } from "@medusajs/utils";
import {
  ADMIN_CORS,
  AUTH_CORS,
  BACKEND_URL,
  COOKIE_SECRET,
  DATABASE_URL,
  JWT_SECRET,
  REDIS_URL,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  SHOULD_DISABLE_ADMIN,
  STORE_CORS,
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
  WORKER_MODE,
  // Nuevas constantes para S3/Supabase
  S3_ENDPOINT,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_REGION,
  S3_BUCKET,
  S3_FILE_URL,
} from "lib/constants";
loadEnv(process.env.NODE_ENV, process.cwd());
const medusaConfig = {
  projectConfig: {
    databaseUrl: DATABASE_URL,
    databaseLogging: false,
    redisUrl: REDIS_URL,
    workerMode: WORKER_MODE,
    http: {
      adminCors: ADMIN_CORS,
      authCors: AUTH_CORS,
      storeCors: STORE_CORS,
      jwtSecret: JWT_SECRET,
      cookieSecret: COOKIE_SECRET,
    },
    build: {
      rollupOptions: {
        external: ["@medusajs/dashboard", "@medusajs/admin-shared"],
      },
    },
  },
  admin: {
    backendUrl: BACKEND_URL,
    disable: SHOULD_DISABLE_ADMIN,
  },
  modules: [
    // =====================================================
    // FILE STORAGE MODULE (Supabase S3 o Local)
    // =====================================================
    {
      key: Modules.FILE,
      resolve: "@medusajs/file",
      options: {
        providers: [
          // Si tienes todas las variables S3 configuradas, usa Supabase
          ...(S3_ENDPOINT &&
          S3_ACCESS_KEY_ID &&
          S3_SECRET_ACCESS_KEY &&
          S3_BUCKET &&
          S3_REGION
            ? [
                {
                  resolve: "@medusajs/file-s3",
                  id: "s3",
                  options: {
                    file_url: S3_FILE_URL,
                    access_key_id: S3_ACCESS_KEY_ID,
                    secret_access_key: S3_SECRET_ACCESS_KEY,
                    region: S3_REGION,
                    bucket: S3_BUCKET,
                    endpoint: S3_ENDPOINT,
                    additional_client_config: {
                      forcePathStyle: true, // Necesario para Supabase
                    },
                  },
                },
              ]
            : // Si no, usa almacenamiento local (fallback)
              [
                {
                  resolve: "@medusajs/file-local",
                  id: "local",
                  options: {
                    upload_dir: "static",
                    backend_url: `${BACKEND_URL}/static`,
                  },
                },
              ]),
        ],
      },
    },
    // =====================================================
    // REDIS MODULES (Event Bus + Workflow Engine)
    // =====================================================
    ...(REDIS_URL
      ? [
          {
            key: Modules.EVENT_BUS,
            resolve: "@medusajs/event-bus-redis",
            options: {
              redisUrl: REDIS_URL,
            },
          },
          {
            key: Modules.WORKFLOW_ENGINE,
            resolve: "@medusajs/workflow-engine-redis",
            options: {
              redis: {
                url: REDIS_URL,
              },
            },
          },
        ]
      : []),
    // =====================================================
    // NOTIFICATION MODULE (Resend)
    // =====================================================
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "./src/modules/resend",
            id: "resend",
            options: {
              channels: ["email"],
              api_key: RESEND_API_KEY,
              from: RESEND_FROM_EMAIL,
            },
          },
        ],
      },
    },
    // =====================================================
    // PAYMENT MODULE (Stripe)
    // =====================================================
    ...(STRIPE_API_KEY && STRIPE_WEBHOOK_SECRET
      ? [
          {
            key: Modules.PAYMENT,
            resolve: "@medusajs/payment",
            options: {
              providers: [
                {
                  resolve: "@medusajs/payment-stripe",
                  id: "stripe",
                  options: {
                    apiKey: STRIPE_API_KEY,
                    webhookSecret: STRIPE_WEBHOOK_SECRET,
                  },
                },
              ],
            },
          },
        ]
      : []),
  ],

  // =====================================================
  // PLUGINS (Meilisearch ELIMINADO - ya no se usa)
  // =====================================================
  plugins: [],
};
export default defineConfig(medusaConfig);
