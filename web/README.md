# Web de la clínica

Esta web forma la capa pública del proyecto y está pensada para presentar la clínica de forma clara, profesional y cercana. El sitio combina una experiencia visual sencilla con un flujo de reserva asistida, de modo que los visitantes puedan conocer los servicios y avanzar hacia una cita sin complicaciones.

## Qué ofrece la web

- Una landing page con propuesta de valor, identidad visual y llamado a la acción principal.
- Páginas dedicadas a servicios, sobre la clínica, contacto y reservas.
- Un formulario de solicitud de cita que recoge información útil para la operación clínica.
- Integración con Supabase para almacenar solicitudes y gestionar contenido multimedia.
- Soporte para mostrar logo y recursos gráficos desde la carpeta pública o desde datos dinámicos.

## Arquitectura general

- [src/app](src/app): páginas y rutas principales de la aplicación.
- [src/components](src/components): estructura de la interfaz, secciones reutilizables y formularios.
- [src/lib](src/lib): configuración del sitio, helpers de Supabase, Substack y gestión de recursos visuales.
- [public/brand](public/brand): activos gráficos base de la marca.

## Entorno y configuración

La aplicación depende de variables de entorno para conectar la reserva, los enlaces públicos y los servicios de Supabase. Estas configuraciones se utilizan para ajustar la experiencia del sitio y para asegurar que los flujos de reserva y contenido funcionen de forma consistente.

Toma como base [web/.env.example](.env.example) para crear tu archivo local de entorno.

Variables principales:

- `NEXT_PUBLIC_SUBSTACK_URL`: URL pública de la newsletter para activar la sincronización automática de artículos.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número de WhatsApp en formato internacional para activar el respaldo de contacto.
- `NEXT_PUBLIC_GOOGLE_BOOKING_URL`: enlace de la agenda de reservas.
- `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`: necesarios para guardar solicitudes en Supabase.

## Tecnologías principales

- Next.js para la experiencia web y el enrutado de páginas.
- React y TypeScript para la interfaz y la lógica de componentes.
- Supabase para almacenamiento de datos y soporte de integración backend.
- Tailwind y componentes reutilizables para una interfaz más rápida de mantener.

El objetivo de esta parte del repositorio es que la web sea comprensible, fácil de extender y adecuada para una primera versión pública de la clínica.
