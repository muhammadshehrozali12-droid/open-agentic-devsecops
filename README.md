# 🛡️ Agentic DevSecOps Guard — MVP 0.2

### Zero-Trust In-Browser Multi-Agent Cloud Auditor & Federated Policy Mesh

<p align="center">
  <a href="https://shehrozali12-droid.github.io/open-agentic-devsecops/"><img src="https://img.shields.io/badge/Live_Demo-Launch_App-38bdf8?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/MVP_0.2-Conforming-22c55e?style=for-the-badge" alt="MVP 0.2">
  <img src="https://img.shields.io/badge/Zero_Trust-Client_Side-0ea5e9?style=for-the-badge" alt="Zero Trust">
  <img src="https://img.shields.io/badge/Backend-None_100%_Browser-f59e0b?style=for-the-badge" alt="No Backend">
  <img src="https://img.shields.io/badge/License-MIT-white?style=for-the-badge" alt="MIT">
</p>

<p align="center">
  <b>Scan Terraform in your browser. No server. No data leaves your device.</b><br>
  A multi-agent system that audits security, optimizes cost, and federates with other agents — all running on the Open Agentic Web.
</p>

---

## 🚀 Live Application

### 👉 [Launch Agentic DevSecOps Guard](https://shehrozali12-droid.github.io/open-agentic-devsecops/)

> **Try in 10 seconds:** Open link → Paste any Terraform code → Click **Run Multi-Agent Audit** → Get Security + FinOps report instantly.

---

## 🎯 The Problem

Developers paste Terraform / IaC into AI tools or deploy it without checking:

- ❌ **Port 22 / 0.0.0.0/0** open to the entire internet
- ❌ **Hardcoded secrets** committed in code
- ❌ **Oversized EC2 instances** wasting ~40%+ monthly spend

Existing tools need a backend, send your private code to a server, and don't talk to other agents.

**We fixed all three — in the browser.**

---

## ✨ What It Does

| Agent | Role | What It Finds |
| :--- | :--- | :--- |
| **`security_auditor`** | Front-End Auditor | `0.0.0.0/0` ingress, hardcoded secrets, IAM misconfig |
| **`cost_optimizer`** | FinOps Specialist | Oversized compute, right-sizing to `t3/t4g` → **~42% savings** |
| **`federated_peer_auditor`** | Cross-Domain Node | Handshakes with external agents, syncs policy |

### Key Features

- **🔒 100% Client-Side Zero-Trust** — No backend, no database, no tracking. Your code never leaves your browser.
- **🤖 Multi-Agent Delegation** — `security_auditor` → delegates → `cost_optimizer`. Full observable trace: `BOOT → MANIFEST → DELEGATION → INFERENCE`.
- **🌐 Inter-Agent Federation (LIVE)** — Real HTTPS handshake, fetches peer `agent-manifest.json`, verifies CORS + conformance, returns verified trust status. One-click `Sync Mesh`.
- **🔑 Pluggable Inference (BYOK)** — Works out-of-the-box with deterministic zero-cost engine, or plug your own OpenAI-compatible endpoint. Key stays in `localStorage` only.
- **📊 Enterprise Dashboard** — Security Score `0-100`, Risk Bar, CRITICAL / FINOPS cards with `Copy Fix` action.
- **🧾 Trust Boundary Consent** — Explicit user consent before any execution. Private context remains isolated.

---

## 🏗️ System Architecture

```mermaid
User Paste Terraform
        ↓
[ Trust Boundary Consent ]
        ↓
[ security_auditor ] ──delegates──→ [ cost_optimizer ]
        │                              ↓
        └────→ [ federated_peer_auditor ] → External Agentic Website
        ↓
[ Observable Trace + Score + Fix Cards ]
