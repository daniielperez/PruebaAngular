# PruebaFront

Proyecto técnico en Angular que consume y presenta publicaciones desde una API REST.

---

##  Estructura del proyecto

```
src/
├── app/
│   ├── posts/
│   │   ├── components/
│   │   │   ├── post-list-component/
│   │   │   └── post-details-component/
│   │   ├── services/
│   │   └── posts.module.ts
│   ├── app-routing.module.ts
│   └── app.module.ts
```

* **posts/components**: Componentes relacionados a publicaciones.
* **posts/services**: Lógica de comunicación con la API (`api.service.ts`).
* **Modularización**: Cada conjunto funcional tiene su propio módulo.

---

##  Cómo ejecutar el proyecto

```bash
npm install
npm start
```

La app se ejecutará en `http://localhost:4200`

---

##  Funcionalidades implementadas

* Visualización de publicaciones (`PostListComponent`).
* Detalle individual de publicación (`PostDetailComponent`).
* Mensajes de carga y error.
* Estilo con Angular Material.

---

##  Pruebas unitarias

* Se utilizaron Jasmine y Karma.
* Se realizaron pruebas en `post-list` y `post-details`.

### Cobertura actual:

```
Statements : 88.09%
Branches   : 80%
Functions  : 73.33%
Lines      : 87.5%
```

---

##  Estado global (manejo de errores y loading)

Cada componente maneja:

* Estado `isLoading` para control de spinners.
* Estado `error` para manejo de errores.

---

##  Decisiones técnicas

* Angular CLI con estructura modular para escalabilidad.
* Servicios centralizados para facilitar el testing y desacoplar lógica.
* Angular Material para una interfaz consistente.
* Cobertura de pruebas superior al 80% para garantizar mantenibilidad.

---

## 📈 Mejoras futuras

* Implementar store (NgRx) para manejo de estado global.
* Test de integración completa usando Cypress.
* Mejora visual con temas personalizados.
