// FILE: app/api/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { validateRut, cleanRut } from "../../../lib/rut";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, rut, region, comuna, email, password
    } = body || {};

    // Validaciones básicas
    if (!firstName || !lastName || !rut || !region || !comuna || !email || !password) {
      return NextResponse.json({ ok: false, error: "Completa todos los campos." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Email inválido." }, { status: 400 });
    }
    if (String(password).length < 8) {
      return NextResponse.json({ ok: false, error: "La contraseña debe tener al menos 8 caracteres." }, { status: 400 });
    }

    if (!validateRut(rut)) {
      return NextResponse.json({ ok: false, error: "RUT inválido." }, { status: 400 });
    }
    const rutClean = cleanRut(rut);

    // Unicidad por email o RUT
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: email.toLowerCase() }, { rut: rutClean }] },
    });
    if (existing) {
      return NextResponse.json({ ok: false, error: "Email o RUT ya registrados." }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        rut: rutClean,
        region,
        comuna,
      },
      select: { id: true, email: true, firstName: true, lastName: true, region: true, comuna: true },
    });

    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Error de servidor." }, { status: 500 });
  }
}
