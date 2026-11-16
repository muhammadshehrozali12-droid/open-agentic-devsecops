# 🛡️ Agentic DevSecOps Guard (Open Agentic Web • NANDA v0.2)

**Zero-Trust In-Browser Multi-Agent Cloud Security Auditor, FinOps Optimizer & Federated Policy Mesh**

🔗 **Live App:** [https://github.io](https://github.io)  
📄 **Agent Manifest:** [agent-manifest.json](https://github.ioagent-manifest.json)  
🕸️ **Network Graph:** [devsecops-network.network.json](https://github.iodevsecops-network.network.json)

---

## 🎯 Problem Statement
Cloud engineers frequently deploy Infrastructure-as-Code (Terraform) with critical security vulnerabilities (such as `0.0.0.0/0` open SSH ports, plaintext hardcoded secrets, unencrypted S3 buckets, and wildcard IAM privileges) alongside oversized EC2 compute instances that waste up to **42% of monthly cloud budgets**. Traditional scanners require uploading sensitive infrastructure code to external servers—creating privacy and compliance risks.

## 💡 Solution: Autonomous In-Browser Multi-Agent Mesh
**Agentic DevSecOps Guard** executes a federated multi-agent workflow **100% inside the browser** using standard open web technologies:

1. **`Orchestrator Agent`:** Coordinates policy routing and exposes a public `window.invokeAgent()` interface for external agentic callers.
2. **`ZeroTrust-SecAgent`:** Audits Terraform HCL against CIS AWS Benchmarks & OWASP IaC rules (`CIS-AWS-4.1`, `OWASP-IAC-02`, `IAM-LEAST-PRIV`, `CIS-AWS-2.1.1`).
3. **`CloudCost-FinOpsAgent`:** Identifies oversized x86 compute instances (`m5.2xlarge`, `c5.4xlarge`, `t3.2xlarge`, `r5.xlarge`), calculates exact monthly USD waste, and recommends Graviton ARM (`t4g.medium`) right-sizing.
4. **`AutoFix-RemediationAgent`:** Automatically synthesizes hardened, production-ready Terraform HCL patches with one-click copy and JSON audit export.

---

## 🏗️ System Architecture

```text
User / Remote Agent ──▶ Orchestrator Agent
                              │
                              ▼
                    ZeroTrust-SecAgent (CIS & Secrets Audit)
                              │
                              ▼
                   CloudCost-FinOpsAgent (Savings Estimator)
                              │
                              ▼
                  AutoFix-RemediationAgent (Hardened HCL Patch)
                              │
                              ▼
             A2A Trace + JSON Report + Live Mesh Federation
```

---

## 📂 Repository Files (Open Agentic Web Conforming)
* `index.html` — Interactive Zero-Trust Dashboard, BYOK Multi-LLM Config, & Federation UI
* `runtime.js` — Browser-native Multi-Agent Execution Engine & `window.invokeAgent()` runtime
* `agent-manifest.json` — Public NANDA v0.2 Agent Discovery Manifest
* `devsecops-network.network.json` — Multi-Agent Topology & Delegation Graph
* `README.md` — Architecture & Compliance Documentation

---

## ⚡ Quick Test Guide (30 Seconds)
1. Open the **[Live App](https://github.io)**.
2. Click **Load Complex Enterprise Sample** and press **🚀 Run Multi-Agent Audit**.
3. Inspect the **Security Posture Score**, **FinOps Savings ($/mo)**, **Auto-Remediated HCL Code**, and **Internal A2A Execution Trace**.
4. Scroll to **Open Agentic Web Federation** and click **⚡ Sync Mesh** to verify live `agent-manifest.json` discovery.

---

## 🏆 Built For
**Open Agentic Web Challenge** — Hosted by Cognizant with technology contributions from Cognizant AI Lab, MIT Lab's Project NANDA, Mozilla Otari, and AWS.

## 👨‍💻 Author
**Muhammad Shehroz Ali** — DevSecOps & Cloud Security Practitioner | Gujranwala, Pakistan  
GitHub: [@muhammadshehrozali12-droid](https://github.com)
