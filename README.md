# Delivery Automation Hub (Google Apps Script)

This project is a multi-domain automation hub, starting with Jira automations but designed to scale to other delivery automations. It follows a Clean Architecture approach.

## Purpose

The **Delivery Automation Hub** centralizes process improvements for Process Analysts and QA.
- **First Domain**: Jira Automations (Feature implemented).
- **Scalability**: Designed to easily add new domains (e.g., Reports, Notifications, Syncs) without cluttering the codebase.

## Architecture

This project follows a Clean Architecture approach adapted for Apps Script:

- **src/features/**: Self-contained feature modules.
  - **jira/**: The first implemented domain.
  - **core/**: Shared automation core.
  - **domain/**: Interfaces and Types.
  - **application/**: Use Cases / Business Logic.
  - **infrastructure/**: Adapters.
  - **automation.ts**: Registry of automations exposed by this feature.
- **src/platform/**: Generic infrastructure.
  - **config/**: ConfigService, SecretsService.
  - **state/**: StateService (PropertiesService wrapper).
  - **google/**: Adapters for Google Services (Sheets, Drive, Gmail, Calendar).
  - **http/**: HttpClient with retry/backoff.
- **src/shared/**: Common utilities.

## Build & Deployment Rules (DO NOT CHANGE)
This repository follows a strict multi-file distribution contract to ensure the Apps Script editor shows real code files in the correct folder structure.

### 1. NO SINGLE-FILE BUNDLE
- This project intentionally **DOES NOT** bundle into a single `Code.gs`.
- `dist/` mirrors `src/` hierarchy.
- One `.gs` file is emitted for every `.ts` source file.
- `imports` and `exports` are **FORBIDDEN** in the output files (dist).
- Code uses **TypeScript Namespaces** (e.g., `namespace Platform.Config`) to manage dependencies in the global scope.

### 2. ENTRYPOINTS
- `src/main.ts` (compiled to `dist/main.gs`) defines global entrypoints (`onOpen`, triggers).
- It references automations via Namespaces.

### 3. AUTOMATED GUARDS
The build script (`scripts/build.js`) enforces these rules:
- Fails if `dist/Code.gs` or `dist/index.gs` exists.
- Fails if any `.gs` file contains `import` or `export` statements.
- Checks that `dist` contains valid subdirectories.

### 4. DEPLOYMENT
- `clasp push` uploads the entire `dist/` directory including subfolders.
- The Apps Script editor will display folders `features/`, `platform/`, etc. as real directories.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build**:
   ```bash
   npm run build
   ```
   Output is in `dist/`.

3. **Deploy**:
   ```bash
   clasp push
   ```

## Adding a New Delivery Automation

1. Create a new folder in `src/features/<new-domain>`.
2. Implement your logic in `application/` and definitions in `domain/`.
3. Create `automation.ts` and export an `Automation` object.
4. Register it in `src/main.ts`.

## Configuration

Configuration is handled via `ConfigService` which reads from Script Properties.
Required keys for Jira:
- `jira.domain`
- `jira.userEmail`
- `jira.apiToken`
