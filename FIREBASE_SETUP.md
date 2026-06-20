# Firebase Setup Guide para BellaFit

## Paso 1: Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click **"Agregar proyecto"**
3. Nombre: `BellaFit` (o similar)
4. Acepta los términos y click **"Crear proyecto"**
5. Espera a que se cree (2-3 minutos)

## Paso 2: Configurar Firestore Database

1. En el panel, ve a **"Firestore Database"** (en el menú izquierdo, bajo "Build")
2. Click **"Crear base de datos"**
3. Selecciona:
   - Modo: **"Iniciar en modo de prueba"** (cambiaremos a reglas de seguridad después)
   - Ubicación: La más cercana a Chile (recomendado: `us-south1` o `us-central1`)
4. Click **"Crear"**

## Paso 3: Configurar Authentication

1. Ve a **"Authentication"** en el menú izquierdo
2. Click **"Comenzar"**
3. En "Proveedores de firmas", selecciona **"Email/Contraseña"**
4. Habilita **"Email/Contraseña"**
5. **Deshabilita** "Crear cuenta de usuario anónima" (opcional)
6. Click **"Guardar"**

## Paso 4: Configurar Storage (para fotos de perfil)

1. Ve a **"Storage"** en el menú izquierdo
2. Click **"Comenzar"**
3. Modo: **"Iniciar en modo de prueba"**
4. Ubicación: Misma que Firestore
5. Click **"Crear"**

## Paso 5: Obtener Credenciales de Configuración

1. Ve a **"Configuración del proyecto"** (engranaje arriba a la izquierda)
2. En la pestaña **"General"**, baja a la sección **"Tus aplicaciones"**
3. Click **"Agregar app"** → Selecciona **Web** (el ícono `</>``)
4. Registra la app con nombre: `bellafit-web`
5. Click **"Registrar app"**
6. Copia el objeto `firebaseConfig` que aparece en pantalla

## Paso 6: Agregar Credenciales al Proyecto

1. En la raíz del proyecto, crea un archivo `.env.local`
2. Copia las siguientes variables del `firebaseConfig`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
```

**Ejemplo real de `firebaseConfig`:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD..." → NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "bellafit-xxxxx.firebaseapp.com" → NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "bellafit-xxxxx" → NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "bellafit-xxxxx.appspot.com" → NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789" → NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123456789:web:xxxxx" → NEXT_PUBLIC_FIREBASE_APP_ID
  databaseURL: "https://bellafit-xxxxx.firebaseio.com" → NEXT_PUBLIC_FIREBASE_DATABASE_URL
};
```

## Paso 7: Crear Estructura de Firestore

Las colecciones se crean automáticamente cuando el app intenta escribir datos. Las colecciones principales son:

- **`users`** - Perfiles de usuarios
  - Documentos: `uid` (ID de Firebase Auth)
  - Campos: `email`, `displayName`, `phoneNumber`, `role`, `profileImage`, `bio`, etc.

- **`purchases`** - Historial de compras
  - Campos: `userId`, `productId`, `productName`, `amount`, `status`, `createdAt`, etc.

- **`enrollments`** - Inscripciones en clases
  - Campos: `userId`, `classId`, `className`, `instructorId`, `status`, etc.

- **`classes`** - Información de clases
  - Campos: `name`, `description`, `instructorId`, `schedule`, `capacity`, etc.

- **`products`** - Productos de la tienda
  - Campos: `name`, `description`, `price`, `image`, `category`, etc.

## Paso 8: Configurar Reglas de Seguridad (Importante)

Después de desarrollo inicial, actualiza las reglas de Firestore:

### Firestore Rules

Ve a **"Firestore Database"** → **"Reglas"** y reemplaza con:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Permite a usuarios leer su propio perfil
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Compras - solo lectura del propietario
    match /purchases/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
    
    // Inscripciones en clases
    match /enrollments/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
    
    // Clases e instructores - lectura pública
    match /classes/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.instructorId;
    }
    
    match /products/{document=**} {
      allow read: if true;
    }
  }
}
```

### Storage Rules

Ve a **"Storage"** → **"Reglas"** y usa:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    match /users/{userId}/profile_images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
    
    match /class-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
    
    match /product-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

## Paso 9: Verificar Conexión

1. En la terminal, ejecuta:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:3000/registro`

3. Intenta crear una cuenta con:
   - Email: `test@example.com`
   - Contraseña: `password123`
   - Nombre: `Test User`

4. Si se redirige a `/perfil`, ¡Firebase está configurado correctamente!

## Recursos

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Auth JS SDK](https://firebase.google.com/docs/auth/web/start)

## Troubleshooting

### Error: "Cannot find module 'firebase'"
```bash
npm install firebase
```

### Error: "Firebase configuration is invalid"
- Verifica que `.env.local` tiene todas las variables correctas
- Reinicia el servidor: `npm run dev`

### No puedo crear cuenta
- Verifica que Authentication está habilitado en Firebase Console
- Verifica que Email/Contraseña está activado en Providers

### Las compras no se guardan
- Ve a Firestore Console y verifica que la colección `purchases` existe
- Verifica que las Reglas de Seguridad permiten escrituras desde `userId`
