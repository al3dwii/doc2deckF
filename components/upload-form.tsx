"use client";

import { useState } from "react";
import { apiUploadDocAuthed, UpgradeError } from "../lib/api";
import { UpgradeCTA } from "./upgrade-cta";
import { useApiToken } from "../lib/auth-client";

type Props = {
  categoryId?: string;
};

export function UploadForm({ categoryId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [upgrade, setUpgrade] = useState<UpgradeError | null>(null);
  const getToken = useApiToken();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUpgrade(null);
    const token = await getToken();
    const resp = await apiUploadDocAuthed(file, categoryId, token);
    if (resp.upgrade) {
      setUpgrade(resp.upgrade);
      return;
    }
    setJobId(resp.job_id ?? null);
    if (resp.job_id) poll(resp.job_id);
  }

  async function poll(id: string) {
    const interval = setInterval(async () => {
      const r = await fetch(`${apiBase}/api/v1/jobs/${id}`);
      const j = await r.json();
      setStatus(j);
      if (j.status === "succeeded" || j.status === "failed") {
        clearInterval(interval);
      }
    }, 2000);
  }

  // ...render identical to previous version (remove planOverride UI)...

  return (
    <div className="upload-form-wrapper">
      <form onSubmit={submit} className="upload-form">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="submit" disabled={!file}>Convert</button>
      </form>
      {upgrade && (
        <div style={{ border: "1px solid #f00", padding: "1rem", marginTop: "1rem" }}>
          <strong>Upgrade needed:</strong>
          {/* error messages same as before */}
          <UpgradeCTA requiredPlan={upgrade.required_plan ?? "starter"} reason={upgrade.error} />
        </div>
      )}
      {jobId && <p>Job: {jobId}</p>}
      {status?.status === "succeeded" && (
        <p>
          Done: <a href={status.download_url}>Download PPTX</a>
        </p>
      )}
      {status?.status === "failed" && <p style={{ color: "red" }}>Error: {status.error}</p>}
    </div>
  );
}
