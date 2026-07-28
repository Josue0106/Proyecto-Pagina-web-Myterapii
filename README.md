# Clínica Digital — base operativa y de contenido

Este repositorio reúne la base documental y técnica de un proyecto de clínica digital orientado a fisioterapia. Su propósito es ofrecer una visión clara de cómo está organizada la propuesta, qué componentes forman parte del ecosistema y qué recursos se utilizan para apoyar la operación diaria.

## Qué contiene este proyecto

- Un esquema inicial para Supabase con la estructura de datos base de la clínica.
- Documentación de automatización para integrar reservas, mensajes y flujos operativos.
- Material de cumplimiento y buenas prácticas para un entorno más seguro y profesional.
- Una hoja de ruta de puesta en marcha para ir creciendo de forma ordenada.
- Una web funcional desarrollada con Next.js para presentar la clínica y capturar solicitudes de reserva.

## Organización del repositorio

- [supabase](supabase): definiciones SQL, datos de ejemplo y consultas de verificación.
- [automation](automation): recursos para conectar Calendly, Make y mensajes de comunicación.
- [ops](ops): guías operativas, cumplimiento y decisiones de stack.
- [roadmap](roadmap): plan de implementación por fases.
- [web](web): aplicación web que representa la presencia digital de la clínica.

## Visión del proyecto

La idea central es facilitar una experiencia simple, profesional y cercana para los pacientes: descubrir los servicios, entender cómo funciona la clínica, reservar una cita y mantener un canal de comunicación claro con el equipo.

Este repositorio está pensado para ser legible fuera del contexto interno del equipo inicial, por lo que prioriza explicar el propósito, la estructura y la lógica general del proyecto sobre cualquier detalle operativo de ejecución.

## Preparación para un clon público
Para crear una copia pública de portfolio sin subir activos sensibles ni datos privados, conviene:
- usar archivos locales en la carpeta web/public/ para el logo y futuras imágenes,
- evitar subir archivos de entorno con secretos reales,
- y seguir la guía en scripts/prepare-public-clone.md.
