'use strict';

window.siteData = {
  analytics: { provider: '', plausibleDomain: '', goatcounterUrl: '', gaMeasurementId: '' },
  articles: [
    { slug: 'platform-engineering-crossplane-backstage', title: 'Platform engineering with Crossplane and Backstage', description: 'An overview and step-by-step install of a self-service internal developer platform built on Crossplane, Backstage, and GitOps.', category: 'IDP', readTime: '13 min read', date: '2026-08-21', url: './articles/platform-engineering-crossplane-backstage.html' },
    { slug: 'sre-training-series', title: 'SRE training series: from fundamentals to your own LGTM stack', description: 'A free 12-part course covering SLIs, SLOs, error budgets, percentiles, cardinality, and building a production observability stack.', category: 'Series', readTime: '12 parts', date: '2026-07-27', url: './articles/sre-training-series.html' },
    { slug: 'rca-agent-langgraph-mcp', title: 'Building an autonomous RCA agent with LangGraph and MCP', description: 'How a LangGraph-orchestrated agent triages Grafana Alertmanager alerts automatically via MCP tool integrations, and safely self-heals in Dev.', category: 'AI Agents', readTime: '10 min read', date: '2026-07-12', url: './articles/rca-agent-langgraph-mcp.html' },
    { slug: 'terraform-for-beginners', title: 'Terraform for beginners: what to learn first', description: 'A practical roadmap for learning Terraform without getting stuck in theory overload.', category: 'Beginner', readTime: '8 min read', date: '2026-04-30', url: './articles/terraform-for-beginners.html' },
    { slug: 'kubernetes-on-aws', title: 'Kubernetes on AWS: a pragmatic operating model', description: 'A clear view of what teams should standardize before scaling EKS workloads.', category: 'Platform', readTime: '9 min read', date: '2026-04-30', url: './articles/kubernetes-on-aws.html' },
    { slug: 'platform-engineering-best-practices', title: 'Platform engineering best practices that actually help', description: 'How to build internal platforms that reduce friction instead of adding another layer of process.', category: 'Strategy', readTime: '8 min read', date: '2026-04-30', url: './articles/platform-engineering-best-practices.html' }
  ],
  series: {
    sre: {
      slug: 'sre-training-series',
      title: 'SRE Training Series',
      hubUrl: './articles/sre-training-series.html',
      parts: [
      { n: 1, slug: 'sre-01-what-is-sre', title: 'What is SRE, really?', description: 'Site Reliability Engineering is not a rebrand of operations.', level: 'Foundations', readTime: '9 min read', date: '2026-07-27', url: './articles/sre-01-what-is-sre.html' },
      { n: 2, slug: 'sre-02-sli-slo-sla', title: 'SLI, SLO, SLA: the reliability contract', description: 'Most reliability programs stall because the first SLO is written about a machine instead of a user.', level: 'Foundations', readTime: '11 min read', date: '2026-07-27', url: './articles/sre-02-sli-slo-sla.html' },
      { n: 3, slug: 'sre-03-error-budgets-burn-rate', title: 'Error budgets and burn-rate alerting', description: 'An SLO with no consequence is a dashboard.', level: 'Foundations', readTime: '12 min read', date: '2026-07-27', url: './articles/sre-03-error-budgets-burn-rate.html' },
      { n: 4, slug: 'sre-04-percentiles-p50-p95-p99', title: 'p50, p95, p99 and the truth about averages', description: 'Average latency is the most confidently wrong number on your dashboard.', level: 'Measurement', readTime: '11 min read', date: '2026-07-27', url: './articles/sre-04-percentiles-p50-p95-p99.html' },
      { n: 5, slug: 'sre-05-golden-signals-use-red', title: 'Golden signals, USE and RED', description: 'Traffic, errors, latency and saturation are the four questions every incident eventually reduces to.', level: 'Measurement', readTime: '10 min read', date: '2026-07-27', url: './articles/sre-05-golden-signals-use-red.html' },
      { n: 6, slug: 'sre-06-metrics-and-promql', title: 'Metrics fundamentals and PromQL', description: 'Almost every wrong graph in production traces back to the same three mistakes: the wrong metric type, rate applied to the wrong thing, and aggregation done in the wrong order..', level: 'Instrumentation', readTime: '12 min read', date: '2026-07-27', url: './articles/sre-06-metrics-and-promql.html' },
      { n: 7, slug: 'sre-07-cardinality', title: 'Cardinality: the design problem nobody warns you about', description: 'Cardinality is where observability bills, query latency, and on-call sanity are actually decided.', level: 'Instrumentation', readTime: '13 min read', date: '2026-07-27', url: './articles/sre-07-cardinality.html' },
      { n: 8, slug: 'sre-08-logs-and-loki', title: 'Logs at scale with Loki', description: 'Loki is cheap because it indexes almost nothing.', level: 'Signals', readTime: '11 min read', date: '2026-07-27', url: './articles/sre-08-logs-and-loki.html' },
      { n: 9, slug: 'sre-09-tracing-otel-tempo', title: 'Distributed tracing that answers \'where did the time go\'', description: 'Metrics tell you the p99 got worse.', level: 'Signals', readTime: '12 min read', date: '2026-07-27', url: './articles/sre-09-tracing-otel-tempo.html' },
      { n: 10, slug: 'sre-10-build-your-own-lgtm-stack', title: 'Building your own LGTM stack', description: 'This is the hands-on part.', level: 'Platform', readTime: '15 min read', date: '2026-07-27', url: './articles/sre-10-build-your-own-lgtm-stack.html' },
      { n: 11, slug: 'sre-11-dashboards-and-alerting', title: 'Dashboards and alerts that work at 3 a.m.', description: 'A good alert wakes a human who can do something about it, with a link to the thing they should do.', level: 'Operations', readTime: '11 min read', date: '2026-07-27', url: './articles/sre-11-dashboards-and-alerting.html' },
      { n: 12, slug: 'sre-12-incident-response-and-scale', title: 'Incidents, postmortems, and what comes next', description: 'The final part covers the human system: how incidents are run, how postmortems produce change instead of paperwork, and how the observability platform scales without eating the budget..', level: 'Operations', readTime: '13 min read', date: '2026-07-27', url: './articles/sre-12-incident-response-and-scale.html' }
      ]
    }
  }
};
