# 🎠 Nuxt Advanced Slider

> 🚀 Napredni, potpuno prilagodljiv slider sa sinhronizacijom, drag & drop funkcionalnostima i modernim UI/UX dizajnom.


**📖 Srpska verzija | [English](README.md)**

**🌐 [Live Demo](https://itimers.github.io/nuxt-slider-full/)**

---

## ✨ O Projektu

Ovaj projekat predstavlja **profesionalni slider sistem** razvijen u **Nuxt 3** sa **TypeScript** i **Pinia** state managementom. Slider podržava **sinhronizaciju između više instanci**, **drag & drop**, **touch evente**, **dinamičke animacije** i mnoštvo drugih naprednih funkcionalnosti.

---

## 🎯 Glavne Karakteristike

### 🔄 **Sinhronizacija Slajdera**
- ✅ Potpuna sinhronizacija između dva ili više slider instanci
- ✅ Sinhronizovano prebacivanje slajdova
- ✅ Sinhronizovana pauza i reprodukcija
- ✅ Sinhronizovan drag & drop

### 🖱️ **Drag & Drop Funkcionalnosti**
- ✅ Mouse drag podrška
- ✅ Touch/swipe podrška za mobilne uređaje
- ✅ Smooth animacije tokom drag-a
- ✅ Threshold sistem za razlikovanje klika od drag-a
- ✅ Sinhronizovan drag između povezanih slajdera

### 📊 **Progress Indikatori**
- ✅ Kružni progress indikator (circle progress)
- ✅ Linearna progress bar
- ✅ Progress bar unutar slike
- ✅ Dinamički progress sa pauzom

### 🎨 **UI/UX Elementi**
- ✅ Navigacione strelice (prev/next)
- ✅ Dot pagination sa klikom
- ✅ Play/Pause kontrole
- ✅ Maximize/Minimize funkcionalnost
- ✅ Modal režim rada
- ✅ Overlay efekat kod maximize-a

### 📱 **Responsive Dizajn**
- ✅ Prilagođen za sve veličine ekrana
- ✅ Touch optimizovan za mobilne uređaje
- ✅ Dinamičan broj slajdova po view-u
- ✅ Fluid animacije i tranzicije

### ⚡ **Performanse**
- ✅ RequestAnimationFrame za smooth animacije
- ✅ Optimizovano upravljanje state-om
- ✅ Lazy loading slika
- ✅ Efficient event listeners

---

## 🛠️ Tehnologije

- **Framework:** Nuxt 3 (v4.1.3)
- **Language:** TypeScript
- **State Management:** Pinia (v3.0.3) + Composables
- **Styling:** SCSS/Sass
- **Runtime:** Vue 3 (v3.5.22)

---

## 📦 Instalacija

### 1️⃣ Kloniraj repozitorijum

```bash
git clone https://github.com/itimers/nuxt-slider-full.git
cd nuxt-slider-full
```

### 2️⃣ Instaliraj dependencije

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

---

## 🚀 Pokretanje Projekta

### Development Server

Pokreni development server na `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production Build

Build aplikacije za produkciju:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### Preview Production Build

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

---

## 🎮 Upotreba

### Osnovni Primer

```vue
<template>
  <Slider 
    instanceId="my-slider" 
    :slidesPerView="1"
    :enableDrag="true"
    :enableTouch="true"
    :enablePauseButton="true"
    :enableDots="true"
    :enableArrows="true"
  />
</template>
```

### Sinhronizovani Slider

```vue
<template>
  <div>
    <!-- Glavni slider -->
    <Slider 
      instanceId="slider" 
      syncWith="cards"
      :slidesPerView="1" 
      :minSlides="4"
      :maxSlides="7"
      :activeSlideOn="5"
    />
    
    <!-- Sinhronizovani cards slider -->
    <Slider 
      instanceId="cards" 
      syncWith="slider"
      :slidesPerView="4" 
      :minSlides="0"
      :maxSlides="10"
      :activeSlideOn="5"
    />
  </div>
</template>
```

---

## 🔧 Opcije State Managementa

Slider podržava **dva pristupa upravljanju stanjem** - možete izabrati onaj koji najbolje odgovara vašem projektu:

### 1️⃣ **Pinia Store (Podrazumevano)**

Korišćenje tradicionalnog Pinia store pristupa:

```vue
<script setup>
import { useSlidesStore } from '~/stores/slides'

const sm = useSlidesStore()

// Pristup slider metodama
sm.slideTo('slider', 'next')
sm.choosePause('slider', true)
sm.goToSlide('slider', 5)
</script>
```

### 2️⃣ **Composable (Alternativa)**

Korišćenje modernog composable pristupa sa `useSlides()`:

```vue
<script setup>
const { 
  slideTo, 
  choosePause, 
  goToSlide,
  getSlider,
  isDragging,
  getCurrentActiveSlide
} = useSlides()

// Koristite iste metode direktno
slideTo('slider', 'next')
choosePause('slider', true)
goToSlide('slider', 5)

// Pristup slider state-u
const currentSlide = getCurrentActiveSlide('slider')
const dragging = isDragging('slider')
</script>
```

**✨ Oba pristupa rade identično** - composable verzija pruža istu funkcionalnost sa modernijim API-jem koji se besprekorno integriše sa Vue 3 Composition API-jem i Nuxt 3 `useState`.

### Ključne Razlike:

| Karakteristika | Pinia Store | Composable |
|----------------|-------------|------------|
| **Import** | `useSlidesStore()` | `useSlides()` |
| **Upotreba** | `sm.methodName()` | `methodName()` direktno |
| **State** | Centralizovan u store-u | Deljeno preko `useState` |
| **SSR** | ✅ Puna podrška | ✅ Puna podrška |
| **DevTools** | ✅ Pinia DevTools | ✅ Vue DevTools |

Izaberite pristup koji najbolje odgovara arhitekturi vašeg projekta! 🚀

---

## ⚙️ Opcije i Props

### 📋 **Props Referenca**

| Prop | Tip | Default | Opis |
|------|-----|---------|------|
| `instanceId` | `string` | `"slider"` | 🆔 Jedinstveni ID slider instance |
| `syncWith` | `string` | `undefined` | 🔗 ID druge slider instance za sinhronizaciju |
| `slidesPerView` | `number` | `1` | 📊 Broj slajdova vidljivih istovremeno |
| `enableDrag` | `boolean` | `true` | 🖱️ Omogući mouse drag |
| `enableTouch` | `boolean` | `true` | 👆 Omogući touch/swipe |
| `enablePauseButton` | `boolean` | `true` | ⏯️ Prikaži play/pause dugme |
| `enableProgressBar` | `boolean` | `true` | 📊 Prikaži progress bar |
| `enableProgressBarInPicture` | `boolean` | `false` | 🖼️ Progress bar unutar slike |
| `enableCircleProgress` | `boolean` | `true` | ⭕ Kružni progress indikator |
| `enableDots` | `boolean` | `true` | 🔘 Dot pagination |
| `enableArrows` | `boolean` | `true` | ◀️▶️ Navigacione strelice |
| `enableMaximize` | `boolean` | `true` | 🔍 Maximize/minimize funkcionalnost |
| `isModal` | `boolean` | `false` | 🪟 Modal režim rada |
| `minSlides` | `number` | `4` | ⬇️ Minimalan broj slajdova |
| `maxSlides` | `number` | `6` | ⬆️ Maksimalan broj slajdova |
| `activeSlideOn` | `number` | `5` | 🎯 Pozicija aktivnog slajda |

---

## 🎨 Stilizovanje

### CSS Klase

Projekat koristi SCSS za stilizovanje sa sledećim glavnim klasama:

```scss
.slider               // Glavni slider container
.slides-container     // Container za slajdove
.slide-wrapper        // Wrapper za svaki slajd
.slide                // Pojedinačni slajd
.pagination           // Pagination container
.dot-container        // Dots navigation
.progress-container   // Progress bar container
.arrow                // Navigacione strelice
```

### Custom Stilovi

```scss
// Prilagodi stilove prema potrebi
.sliderid-slider {
  margin-inline: auto;
  width: 90%;
  
  .slide-wrapper .slide {
    margin-inline: auto;
    width: 98.6%;
  }
}
```

---

## 🏗️ Struktura Projekta

```
nuxt-slider-full/
├── 📁 app/
│   ├── 📁 components/
│   │   └── 📁 slider/
│   │       ├── slider.vue       # 🎠 Glavni slider komponenta
│   │       ├── next.vue         # ▶️ Next arrow komponenta
│   │       ├── pause.vue        # ⏸️ Pause ikonica
│   │       └── play.vue         # ▶️ Play ikonica
│   ├── 📁 layouts/
│   │   └── default.vue          # 🖼️ Default layout
│   ├── 📁 pages/
│   │   └── index.vue            # 🏠 Home page
│   └── 📁 stores/
│       └── slides.ts            # 🗄️ Pinia store za slider logic
├── 📁 public/
│   └── 📁 img/slider/           # 🖼️ Slider slike
├── nuxt.config.ts               # ⚙️ Nuxt konfiguracija
├── package.json                 # 📦 Dependencies
└── README.md                    # 📖 Dokumentacija
```

---

## 🧩 Ključne Funkcionalnosti u Kodu

### 1️⃣ **State Management (Pinia Store + Composable)**

Slider nudi **dve opcije za upravljanje stanjem**:

**Pinia Store:**
```typescript
import { useSlidesStore } from '~/stores/slides'
const sm = useSlidesStore()
```

**Composable:**
```typescript
const { getSlider, slideTo, choosePause } = useSlides()
```

Obe opcije upravljaju:
- ✅ Multiple slider instances
- ✅ Auto-sliding logic
- ✅ Drag & drop state
- ✅ Progress tracking
- ✅ Synchronization između instanci

### 2️⃣ **Drag & Drop Sistem**

```typescript
// Mouse eventi
- handleMouseDown() - Pokreće drag
- handleMouseMove() - Prati drag movement
- handleMouseUp() - Završava drag i resetuje state

// Touch eventi
- handleTouchStart() - Pokreće touch drag
- handleTouchMove() - Prati touch movement
- handleTouchEnd() - Završava touch drag

// Sinhronizovane varijante
- onMouseDownSynced()
- onMouseMoveSynced()
- onMouseUpSynced()
```

### 3️⃣ **Progress Tracking**

- Dinamički progress bar koji se ažurira u realnom vremenu
- Sačuvan progress tokom pauze
- Restart progress-a nakon drag-a
- Sinhronizovan progress između povezanih slajdera

### 4️⃣ **Auto-Slide Mehanizam**

```typescript
// Auto-sliding sa custom trajanjem po slajdu
- Svaki slajd može imati različito trajanje
- Automatska pauza tokom drag-a
- Nastavak odakle je stao nakon pauze
```

---

## 🐛 Rešeni Problemi

### ✅ **Sinhronizacija Drag-a**
**Problem:** Kada korisnik zadrži drag i pusti, glavni slider nastavlja, ali sinhronizovani ne radi.  
**Rešenje:** Implementiran `resetDragState()` koji resetuje stanje oba slidera istovremeno.

### ✅ **Progress Bar Sinhronizacija**
**Problem:** Progress se ne sinhronizuje između povezanih slajdera.  
**Rešenje:** Dodati global event listeners koji resetuju stanje oba slidera.

### ✅ **Touch Event Optimization**
**Problem:** Touch eventi nisu radili glatko na mobilnim uređajima.  
**Rešenje:** Implementirani passive event listeners i optimizovani touch handlers.

---

## 🎯 Use Cases

### 📸 **Galerije Slika**
Idealno za portfolio, product showcase ili fotografske galerije.

### 🛍️ **E-commerce**
Prikaz proizvoda sa sinhronizovanim thumbnail-ima.

### 📰 **News Sliders**
Hero sliders za novinske sajtove i blogove.

### 🎨 **Portfolio Showcase**
Profesionalni prikaz radova sa detaljnim opisima.

---

## 📝 To-Do Lista

- [ ] 🌐 i18n podrška
- [ ] ♿ Accessibility improvements (ARIA labels)
- [ ] 📱 PWA optimizacije
- [ ] 🎥 Video slide podrška
- [ ] 🔊 Audio kontrole
- [ ] 📊 Analytics tracking
- [ ] 🎨 Theme system (light/dark mode)
- [ ] 🔌 Plugin sistem za custom ekstenzije

---

## 📄 Licenca

MIT License - Slobodno koristite za komercijalne i nekomercijalne projekte.

---

## 👨‍💻 Autor

**ITime Team**
- 🌐 GitHub: [@itimers](https://github.com/itimers)

---

## 🤝 Doprinos

Contributions su dobrodošle! 

1. 🍴 Fork projekat
2. 🔧 Kreiraj feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit promene (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push na branch (`git push origin feature/AmazingFeature`)
5. 🎉 Otvori Pull Request

---

## 📞 Podrška

Za pitanja i podršku:
- 🐛 Issues: [GitHub Issues](https://github.com/itimers/nuxt-slider-full/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/itimers/nuxt-slider-full/discussions)

---

<div align="center">

### ⭐ Ako ti se dopada projekat, ostavi zvezdicu! ⭐

Made with ❤️ by ITime Team

</div>
