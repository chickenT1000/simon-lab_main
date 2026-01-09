# Simon Lab Platform Status

Current state of the Simon Lab platform as of **January 2026**.

## Application Status

| Application | Status | Version | Notes |
|-------------|--------|---------|-------|
| **Landing Page** | ✅ Live | - | Static site at simon-lab.org |
| **Auth Portal** | ✅ Implemented | 0.1.0 | Login, signup, settings, dashboard |
| **LabelHash** | ✅ Production | 0.1.0 | ISO 20560 label designer |
| **ProcessView** | 🔄 Development | 0.1.0 | P&ID visualization, Poltechnika demo |
| **CapacityIndex** | 📋 Planned | - | Business intelligence |

### Status Legend
- ✅ Production/Live - Fully functional
- 🔄 Development - Core features working, integration in progress
- 📋 Planned - Not yet started

---

## Feature Matrix

### Auth Portal (`auth.simon-lab.org`)

| Feature | Status | Notes |
|---------|--------|-------|
| Email/Password login | ✅ | Supabase Auth |
| GitHub OAuth | ✅ | Requires provider setup |
| Google OAuth | ✅ | Requires provider setup |
| User registration | ✅ | With email verification |
| Password reset | ✅ | Via Supabase |
| User dashboard | ✅ | Shows apps and projects |
| Profile settings | ✅ | Name, organization |
| Change password | ✅ | For email users |
| Delete account | ✅ | With confirmation |
| Session sharing | ✅ | Across all subdomains |
| Redirect flow | ✅ | Return to origin app |

### LabelHash (`label.simon-lab.org`)

| Feature | Status | Notes |
|---------|--------|-------|
| ISO 20560 compliance | ✅ | Full standard support |
| Pipeline labels | ✅ | All flow types |
| Tank labels | ✅ | |
| Hazard symbols | ✅ | GHS compatible |
| Color bands | ✅ | Configurable |
| Flow direction arrows | ✅ | |
| PDF export | ✅ | Single and batch |
| PNG export | ✅ | |
| Batch generation | ✅ | Multiple labels at once |
| Project integration | 📋 | Not yet connected to shared projects |

### ProcessView (`process.simon-lab.org`)

| Feature | Status | Notes |
|---------|--------|-------|
| P&ID visualization | ✅ | SVG-based rendering |
| Equipment display | ✅ | Tanks, reactors, heat exchangers |
| Piping display | ✅ | With flow animation |
| Real-time simulation | ✅ | Socket.io based |
| Temperature/pressure | ✅ | Live values |
| Valve control | ✅ | Interactive |
| Pump control | ✅ | On/off, speed |
| Project: Poltechnika | ✅ | Demo installation |
| Auth integration | ✅ | Supabase login |
| Project picker | ✅ | Multi-project support |
| Quick access mode | ✅ | Passphrase-based |
| Database project storage | 🔄 | In progress |
| Multi-user sessions | 📋 | Planned |
| Cross-app data sharing | 📋 | Planned |

### CapacityIndex (`capacityindex.simon-lab.org`)

| Feature | Status | Notes |
|---------|--------|-------|
| Capacity planning | 📋 | Not started |
| Business analytics | 📋 | Not started |
| Project integration | 📋 | Not started |

---

## Integration Status

### Completed Integrations

| Integration | Apps | Description |
|-------------|------|-------------|
| Shared Authentication | All | Single Supabase project, session sharing |
| Shared Types | All | `@simon-lab/core` package |
| Auth Components | ProcessView, Auth Portal | `@simon-lab/auth` package |

### In Progress

| Integration | Apps | Description | Blocker |
|-------------|------|-------------|---------|
| Database Projects | ProcessView | Load projects from Supabase | Schema alignment needed |
| Realtime Sync | ProcessView | Replace Socket.io with Supabase Realtime | None |

### Not Yet Started

| Integration | Apps | Description |
|-------------|------|-------------|
| Equipment → Labels | ProcessView → LabelHash | Generate labels from P&ID equipment |
| Capacity → Simulation | CapacityIndex → ProcessView | Throughput projections |
| Cross-app Navigation | All | Deep linking between apps |

---

## Database Schema Status

### Implemented Tables

| Table | Purpose | RLS |
|-------|---------|-----|
| `profiles` | User profiles | ✅ |
| `projects` | Project metadata | ✅ |
| `access_tokens` | Quick access passphrases | ✅ |
| `access_logs` | Audit trail | ✅ |
| `rate_limits` | Brute force protection | ✅ |

### Planned Tables

| Table | Purpose |
|-------|---------|
| `project_members` | Collaboration/sharing |
| `simulation_states` | Realtime sync state |

---

## Known Issues & Gaps

### Schema Mismatch
ProcessView's internal `ProjectMeta` type is richer than `@simon-lab/core`'s `ProjectDefinition`. Missing from core:
- `PipelineSegment`, `PipelineLine`, `Collector` types
- `ProjectRoadmapItem` type
- Registry snapshots in changelog

### Manual Processes
- Project seeding requires manual SQL execution
- No UI for creating new projects (admin only)

### Missing Features
- No project sharing/collaboration UI
- No password reset UI (uses Supabase default)
- No email change functionality

---

## Deployment Checklist

### For New Deployments

- [ ] Create Supabase project
- [ ] Run database migrations
- [ ] Configure OAuth providers (GitHub, Google)
- [ ] Set environment variables
- [ ] Deploy Auth Portal to `auth.simon-lab.org`
- [ ] Deploy ProcessView to `process.simon-lab.org`
- [ ] Deploy LabelHash to `label.simon-lab.org`
- [ ] Configure DNS for all subdomains
- [ ] Test cross-app session sharing

---

## Development Priorities

### High Priority
1. Complete ProcessView database integration
2. Schema alignment between ProcessView and core

### Medium Priority
3. Supabase Realtime for simulation (replace Socket.io)
4. LabelHash project integration

### Low Priority
5. CapacityIndex initial implementation
6. Cross-app deep linking
7. Project collaboration features

---

## Version History

| Date | Changes |
|------|---------|
| 2026-01-09 | Auth Portal implemented, Sign In link added to landing page |
| 2026-01-07 | Supabase integration for ProcessView auth |
| 2026-01-05 | Initial platform documentation |

---

*Last updated: 2026-01-09*
