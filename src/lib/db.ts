import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { 
  prisma: PrismaClient;
  lastDbFailure?: number;
};

const prismaClient = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient;

// Cache failure state for 30 seconds if connection fails
const FAILURE_CACHE_MS = 30000;

function markFailure() {
  globalForPrisma.lastDbFailure = Date.now();
}

function checkOffline() {
  if (globalForPrisma.lastDbFailure) {
    if (Date.now() - globalForPrisma.lastDbFailure < FAILURE_CACHE_MS) {
      throw new Error('Database is offline (cached failure state)');
    }
  }
}

// Create a proxy handler for PrismaClient to intercept model calls and fail fast if offline
export const db = new Proxy(prismaClient, {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);
    
    // If it's a database model (like project, skill, etc.)
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return new Proxy(value, {
        get(modelTarget, modelProp, modelReceiver) {
          const method = Reflect.get(modelTarget, modelProp, modelReceiver);
          if (typeof method === 'function') {
            return async function (...args: any[]) {
              checkOffline();
              try {
                return await method.apply(modelTarget, args);
              } catch (err: any) {
                const errMsg = err?.message || '';
                // Mark database as offline on initialization or connection errors
                if (
                  err?.name === 'PrismaClientInitializationError' || 
                  errMsg.includes("Can't reach database") || 
                  errMsg.includes('Connection') || 
                  errMsg.includes('timed out')
                ) {
                  markFailure();
                }
                throw err;
              }
            };
          }
          return method;
        }
      });
    }
    
    return value;
  }
}) as unknown as PrismaClient;

