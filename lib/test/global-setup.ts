import { execSync } from "node:child_process";

const CONTAINER = "astromind-test-db";
const DEFAULT_URL = "postgresql://postgres:postgres@localhost:55432/astromind_test";

function isReady(): boolean {
  try {
    execSync(`docker exec ${CONTAINER} pg_isready -U postgres -d astromind_test`, {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

export default async function setup() {
  process.env.DATABASE_URL ??= DEFAULT_URL;

  if (isReady()) {
    return () => {};
  }

  try {
    execSync("docker --version", { stdio: "ignore" });
  } catch {
    throw new Error("Docker no está disponible. Los tests de integración lo necesitan.");
  }

  // Limpia un contenedor previo que haya quedado colgado
  try {
    execSync(`docker rm -f ${CONTAINER}`, { stdio: "ignore" });
  } catch {
    // ignore
  }

  let started = false;
  execSync(
    `docker run --rm -d --name ${CONTAINER} -p 55432:5432 -e POSTGRES_DB=astromind_test -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres postgres:18-alpine`,
    { stdio: "ignore" }
  );
  started = true;

  for (let i = 0; i < 30; i++) {
    if (isReady()) break;
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!isReady()) {
    throw new Error("El contenedor de Postgres para tests no estuvo listo a tiempo");
  }

  return async function teardown() {
    if (!started) return;
    try {
      execSync(`docker stop ${CONTAINER}`, { stdio: "ignore" });
    } catch {
      // ignore
    }
  };
}
