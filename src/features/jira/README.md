# Módulo Jira

## 📋 Propósito

Este módulo contiene toda la lógica relacionada con la integración de Jira en el proyecto de automatizaciones. Está organizado siguiendo una arquitectura feature-first con separación clara de capas (Application, Domain, Infrastructure).

## 🏗️ Arquitectura

### Application Layer (`application/`)
Contiene los casos de uso y orquestación de la lógica de negocio:

- **createJiraIssues.ts**: Creación de issues en Jira desde Google Sheets
- **createJiraSubtasks.ts**: Creación de subtareas en Jira
- **downloadJiraIssues.ts**: Descarga de issues de Jira a Google Sheets
- **updateJiraReporters.ts**: Actualización de reporters en issues existentes
- **buildReporterUpdateList.ts**: Construcción de lista de actualizaciones de reporters
- **createSubtasksFromMapperProjects.ts**: Creación de subtareas desde proyectos mapper

### Domain Layer (`domain/`)
Contiene la lógica de dominio pura, sin dependencias externas:

- **jiraPayloadFactory.ts**: Factory para construcción de payloads de Jira API
- **normalization.ts**: Normalización de datos entre Jira y Google Sheets

### Infrastructure Layer (`infrastructure/`)
Contiene la implementación de integraciones con sistemas externos:

- **jiraClient.ts**: Cliente para Jira REST API
- **jiraAuth.ts**: Gestión de autenticación con Jira
- **jiraUserDirectory.ts**: Gestión de directorio de usuarios de Jira

## 📦 Scripts Actuales a Migrar

Los siguientes scripts en `src/` serán migrados a este módulo:

1. **src/createJiraIssues.ts** → `application/createJiraIssues.ts`
2. **src/createJiraSubtasks.ts** → `application/createJiraSubtasks.ts`
3. **src/downloadJiraIssues.ts** → `application/downloadJiraIssues.ts`
4. **src/updateJiraReporter.ts** → `application/updateJiraReporters.ts`

## 🔄 Próximos Pasos

1. Revisar código existente en los scripts actuales
2. Extraer lógica compartida a `platform/` y `shared/`
3. Implementar las capas de dominio e infraestructura
4. Migrar casos de uso a la capa de aplicación
5. Actualizar entrypoints para usar el nuevo módulo
6. Eliminar scripts antiguos una vez validada la migración

## 🎯 Beneficios de esta Estructura

- **Separación de responsabilidades**: Cada capa tiene un propósito claro
- **Testabilidad**: La lógica de dominio es fácil de testear sin dependencias
- **Mantenibilidad**: Código organizado y fácil de encontrar
- **Escalabilidad**: Fácil agregar nuevos casos de uso o features
- **Reutilización**: Platform y shared son reutilizables en otros módulos
