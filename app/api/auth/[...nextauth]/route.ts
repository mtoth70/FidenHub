// FILE: app/api/auth/[...nextauth]/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { handlers } from "@/lib/auth";

// NextAuth v5 expone handlers con GET y POST listos
export const { GET, POST } = handlers;

