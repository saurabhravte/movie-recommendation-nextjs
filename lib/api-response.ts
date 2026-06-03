import { NextResponse } from "next/server";

export type ApiResponse<T> =
  | { data: T; error: null; status: "ok" }
  | { data: null; error: { message: string; code?: string }; status: "error" };

export function ok<T>(data: T, init?: { status?: number }) {
  return NextResponse.json<ApiResponse<T>>(
    { data, error: null, status: "ok" },
    { status: init?.status ?? 200 }
  );
}

export function fail(
  message: string,
  init?: { status?: number; code?: string }
) {
  return NextResponse.json<ApiResponse<never>>(
    {
      data: null,
      error: { message, code: init?.code },
      status: "error",
    },
    { status: init?.status ?? 400 }
  );
}
