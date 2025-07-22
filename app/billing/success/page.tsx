"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useApiToken } from "@/lib/auth-client";

async function fetchBillingMe(token: string | null) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
  const res = await fetch(`${apiBase}/api/v1/billing/me`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.json();
}

export default function BillingSuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const getToken = useApiToken();
  const [billing, setBilling] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setBilling(await fetchBillingMe(token));
    })();
  }, []);

  return (
    <main>
      <h1>Payment Successful</h1>
      {sessionId && <p>Session: {sessionId}</p>}
      {billing && (
        <p>
          Current Plan: {billing.plan} (status: {billing.plan_status ?? "n/a"})
        </p>
      )}
      <a href="/">Return Home</a>
    </main>
  );
}
