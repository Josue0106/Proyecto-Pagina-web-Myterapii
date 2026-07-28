# Preparar un clon público sin activos ni datos sensibles

## Objetivo
Dejar el repositorio listo para crear una copia pública de portfolio sin subir imágenes reales, datos privados ni credenciales.

## Qué mover o excluir en el clon público
- Mantener solo lo esencial del sitio y el código funcional.
- Eliminar o reemplazar los activos sensibles: imágenes reales, logos de negocio, capturas, PDFs, screenshots.
- No incluir secretos ni archivos de entorno con credenciales.
- No incluir datos de Supabase ni archivos de respaldo que contengan contenido real.

## Mecanismo automático recomendado
- El workflow en .github/workflows/sync-public-clone.yml sincroniza el repositorio público cada vez que se haga push a main.
- El archivo .public-ignore actúa como una lista de exclusiones para el export público.
- Cualquier archivo que coincida con esas reglas no se copiará al clon público.

## Recomendación práctica
1. Cambiar el repositorio a privado en GitHub.
2. Crear un nuevo repositorio público para el portfolio.
3. Crear el secreto PUBLIC_REPO_TOKEN en el repositorio privado con un token que tenga permisos de escritura sobre el público.
4. En el clon público, usar únicamente assets locales placeholders en public/.
5. Mantener las variables de entorno vacías o con valores demo.
6. Si se quiere, usar una rama o un directorio separado para el contenido público.

## Archivos que conviene dejar en el clon público
- web/src/**
- web/public/brand/hero-medical.svg
- web/public/brand/logo.jpg
- README.md
- package.json

## Archivos que conviene no incluir
- .env.local
- .env
- supabase/seed-demo.sql
- supabase/qa-queries.sql
- cualquier captura o imagen real de cliente
- cualquier archivo con datos personales o sensibles
