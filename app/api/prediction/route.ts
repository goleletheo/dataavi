
import { NextResponse } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS rounds (
      id BIGSERIAL PRIMARY KEY,
      round_id TEXT UNIQUE NOT NULL,
      multiplier DOUBLE PRECISION NOT NULL,
      server_seed_hash TEXT DEFAULT '',
      client_seed TEXT DEFAULT '',
      player_seed TEXT DEFAULT '',
      created_at TEXT NOT NULL
    )
  `;
}

export async function GET() {
  try {
    await ensureTable();

    const rounds = await sql`
      SELECT * FROM rounds ORDER BY id DESC
    `;

    return NextResponse.json({ rounds });
  } catch (error) {
    console.error("Failed to load rounds:", error);

    return NextResponse.json(
      { error: "Could not load rounds from the database." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const multiplier = Number(body.multiplier);
    const roundId = String(
      body.round_id || `manual-${Date.now()}`
    );

    if (!Number.isFinite(multiplier) || multiplier < 1) {
      return NextResponse.json(
        { error: "Multiplier must be at least 1.00." },
        { status: 400 }
      );
    }

    await ensureTable();

    const result = await sql`
      INSERT INTO rounds (
        round_id,
        multiplier,
        server_seed_hash,
        client_seed,
        player_seed,
        created_at
      )
      VALUES (
        ${roundId},
        ${multiplier},
        ${String(body.server_seed_hash || "")},
        ${String(body.client_seed || "")},
        ${String(body.player_seed || "")},
        ${new Date().toISOString()}
      )
      RETURNING *
    `;

    return NextResponse.json(
      { round: result[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save round:", error);

    return NextResponse.json(
      { error: "Could not save round. Check whether the round ID already exists." },
      { status: 400 }
    );
  }
}
