import { NextResponse } from "next/server";
import type { LoginRequest } from "@/types/auth";
import { mockLogin } from "@/test/mocks";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequest;
  const forcedScenario = request.headers.get("x-mock-scenario");

  const result = await mockLogin(body, forcedScenario);

  return NextResponse.json(result.body, { status: result.status });
}
