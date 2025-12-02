# 🎠 Nuxt Advanced Slider

> 🚀 Advanced, fully customizable slider with synchronization, drag & drop functionality, and modern UI/UX design.


**📖 [Srpska verzija](README.sr.md) | English**

**🌐 [Live Demo](https://itimers.github.io/nuxt-slider-full/)**

---

## ✨ About the Project

This project represents a **professional slider system** developed in **Nuxt 3** with **TypeScript** and **Pinia** state management. The slider supports **synchronization between multiple instances**, **drag & drop**, **touch events**, **dynamic animations**, and many other advanced features.



## 🎯 Key Features

### 🔄 **Slider Synchronization**
- ✅ Full synchronization between two or more slider instances
- ✅ Synchronized slide transitions
- ✅ Synchronized pause and play
- ✅ Synchronized drag & drop

### 🖱️ **Drag & Drop Functionality**
- ✅ Mouse drag support
- ✅ Touch/swipe support for mobile devices
- ✅ Smooth animations during drag
- ✅ Threshold system to distinguish clicks from drags
- ✅ Synchronized drag between linked sliders

### 📊 **Progress Indicators**
- ✅ Circular progress indicator (circle progress)
- ✅ Linear progress bar
- ✅ Progress bar inside image
- ✅ Dynamic progress with pause

### 🎨 **UI/UX Elements**
- ✅ Navigation arrows (prev/next)
- ✅ Dot pagination with click
- ✅ Play/Pause controls
- ✅ Maximize/Minimize functionality
- ✅ Modal mode
- ✅ Overlay effect on maximize

### 📱 **Responsive Design**
- ✅ Adapted for all screen sizes
- ✅ Touch optimized for mobile devices
- ✅ Dynamic number of slides per view
- ✅ Fluid animations and transitions

### ⚡ **Performance**
- ✅ RequestAnimationFrame for smooth animations
- ✅ Optimized state management
- ✅ Lazy loading images
- ✅ Efficient event listeners

---

## 🛠️ Technologies

- **Framework:** Nuxt 3 (v4.1.3)
- **Language:** TypeScript
- **State Management:** Pinia (v3.0.3) + Composables
- **Styling:** SCSS/Sass
- **Runtime:** Vue 3 (v3.5.22)

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/itimers/nuxt-slider-full.git
cd nuxt-slider-full
```

### 2️⃣ Install dependencies

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

## 🚀 Running the Project

### Development Server

Start the development server on `http://localhost:3000`:

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

Build the application for production:

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

## 🎮 Usage

### Basic Example

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

### Synchronized Slider

```vue
<template>
  <div>
    <!-- Main slider -->
    <Slider 
      instanceId="slider" 
      syncWith="cards"
      :slidesPerView="1" 
      :minSlides="4"
      :maxSlides="7"
      :activeSlideOn="5"
    />
    
    <!-- Synchronized cards slider -->
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

## 🔧 State Management Options

The slider supports **two state management approaches** - you can choose the one that best fits your project:

### 1️⃣ **Pinia Store (Default)**

Using the traditional Pinia store approach:

```vue
<script setup>
import { useSlidesStore } from '~/stores/slides'

const sm = useSlidesStore()

// Access slider methods
sm.slideTo('slider', 'next')
sm.choosePause('slider', true)
sm.goToSlide('slider', 5)
</script>
```

### 2️⃣ **Composable (Alternative)**

Using the modern composable approach with `useSlides()`:

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

// Use the same methods directly
slideTo('slider', 'next')
choosePause('slider', true)
goToSlide('slider', 5)

// Access slider state
const currentSlide = getCurrentActiveSlide('slider')
const dragging = isDragging('slider')
</script>
```

**✨ Both approaches work identically** - the composable version provides the same functionality with a more modern API that integrates seamlessly with Vue 3's Composition API and Nuxt 3's `useState`.

### Key Differences:

| Feature | Pinia Store | Composable |
|---------|-------------|------------|
| **Import** | `useSlidesStore()` | `useSlides()` |
| **Usage** | `sm.methodName()` | `methodName()` directly |
| **State** | Centralized in store | Shared via `useState` |
| **SSR** | ✅ Full support | ✅ Full support |
| **DevTools** | ✅ Pinia DevTools | ✅ Vue DevTools |

Choose the approach that best matches your project's architecture! 🚀

---

## ⚙️ Options and Props

### 📋 **Props Reference**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `instanceId` | `string` | `"slider"` | 🆔 Unique ID for slider instance |
| `syncWith` | `string` | `undefined` | 🔗 ID of another slider instance for synchronization |
| `slidesPerView` | `number` | `1` | 📊 Number of slides visible simultaneously |
| `enableDrag` | `boolean` | `true` | 🖱️ Enable mouse drag |
| `enableTouch` | `boolean` | `true` | 👆 Enable touch/swipe |
| `enablePauseButton` | `boolean` | `true` | ⏯️ Show play/pause button |
| `enableProgressBar` | `boolean` | `true` | 📊 Show progress bar |
| `enableProgressBarInPicture` | `boolean` | `false` | 🖼️ Progress bar inside image |
| `enableCircleProgress` | `boolean` | `true` | ⭕ Circular progress indicator |
| `enableDots` | `boolean` | `true` | 🔘 Dot pagination |
| `enableArrows` | `boolean` | `true` | ◀️▶️ Navigation arrows |
| `enableMaximize` | `boolean` | `true` | 🔍 Maximize/minimize functionality |
| `isModal` | `boolean` | `false` | 🪟 Modal mode |
| `minSlides` | `number` | `4` | ⬇️ Minimum number of slides |
| `maxSlides` | `number` | `6` | ⬆️ Maximum number of slides |
| `activeSlideOn` | `number` | `5` | 🎯 Position of active slide |

---

## 🎨 Styling

### CSS Classes

The project uses SCSS for styling with the following main classes:

```scss
.slider               // Main slider container
.slides-container     // Container for slides
.slide-wrapper        // Wrapper for each slide
.slide                // Individual slide
.pagination           // Pagination container
.dot-container        // Dots navigation
.progress-container   // Progress bar container
.arrow                // Navigation arrows
```

### Custom Styles

```scss
// Customize styles as needed
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

## 🏗️ Project Structure

```
nuxt-slider-full/
├── 📁 app/
│   ├── 📁 components/
│   │   └── 📁 slider/
│   │       ├── slider.vue       # 🎠 Main slider component
│   │       ├── next.vue         # ▶️ Next arrow component
│   │       ├── pause.vue        # ⏸️ Pause icon
│   │       └── play.vue         # ▶️ Play icon
│   ├── 📁 layouts/
│   │   └── default.vue          # 🖼️ Default layout
│   ├── 📁 pages/
│   │   └── index.vue            # 🏠 Home page
│   └── 📁 stores/
│       └── slides.ts            # 🗄️ Pinia store for slider logic
├── 📁 public/
│   └── 📁 img/slider/           # 🖼️ Slider images
├── nuxt.config.ts               # ⚙️ Nuxt configuration
├── package.json                 # 📦 Dependencies
└── README.md                    # 📖 Documentation
```

---

## 🧩 Key Code Functionalities

### 1️⃣ **State Management (Pinia Store + Composable)**

The slider offers **dual state management options**:

**Pinia Store:**
```typescript
import { useSlidesStore } from '~/stores/slides'
const sm = useSlidesStore()
```

**Composable:**
```typescript
const { getSlider, slideTo, choosePause } = useSlides()
```

Both manage:
- ✅ Multiple slider instances
- ✅ Auto-sliding logic
- ✅ Drag & drop state
- ✅ Progress tracking
- ✅ Synchronization between instances

### 2️⃣ **Drag & Drop System**

```typescript
// Mouse events
- handleMouseDown() - Initiates drag
- handleMouseMove() - Tracks drag movement
- handleMouseUp() - Ends drag and resets state

// Touch events
- handleTouchStart() - Initiates touch drag
- handleTouchMove() - Tracks touch movement
- handleTouchEnd() - Ends touch drag

// Synchronized variants
- onMouseDownSynced()
- onMouseMoveSynced()
- onMouseUpSynced()
```

### 3️⃣ **Progress Tracking**

- Dynamic progress bar that updates in real-time
- Saved progress during pause
- Progress restart after drag
- Synchronized progress between linked sliders

### 4️⃣ **Auto-Slide Mechanism**

```typescript
// Auto-sliding with custom duration per slide
- Each slide can have different duration
- Automatic pause during drag
- Resume from where it stopped after pause
```

---

## 🐛 Resolved Issues

### ✅ **Drag Synchronization**
**Problem:** When the user holds drag and releases, the main slider continues, but the synchronized one doesn't work.  
**Solution:** Implemented `resetDragState()` that resets the state of both sliders simultaneously.

### ✅ **Progress Bar Synchronization**
**Problem:** Progress doesn't synchronize between linked sliders.  
**Solution:** Added global event listeners that reset the state of both sliders.

### ✅ **Touch Event Optimization**
**Problem:** Touch events didn't work smoothly on mobile devices.  
**Solution:** Implemented passive event listeners and optimized touch handlers.

---

## 🎯 Use Cases

### 📸 **Image Galleries**
Ideal for portfolios, product showcases, or photo galleries.

### 🛍️ **E-commerce**
Product display with synchronized thumbnails.

### 📰 **News Sliders**
Hero sliders for news sites and blogs.

### 🎨 **Portfolio Showcase**
Professional display of work with detailed descriptions.

---

## 📝 To-Do List

- [ ] 🌐 i18n support
- [ ] ♿ Accessibility improvements (ARIA labels)
- [ ] 📱 PWA optimizations
- [ ] 🎥 Video slide support
- [ ] 🔊 Audio controls
- [ ] 📊 Analytics tracking
- [ ] 🎨 Theme system (light/dark mode)
- [ ] 🔌 Plugin system for custom extensions

---

## 📄 License

MIT License - Feel free to use for commercial and non-commercial projects.

---

## 👨‍💻 Author

**ITime Team**
- 🌐 GitHub: [@itimers](https://github.com/itimers)

---

## 🤝 Contributing

Contributions are welcome! 

1. 🍴 Fork the project
2. 🔧 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

---

## 📞 Support

For questions and support:
- 🐛 Issues: [GitHub Issues](https://github.com/itimers/nuxt-slider-full/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/itimers/nuxt-slider-full/discussions)

---

<div align="center">

### ⭐ If you like the project, leave a star! ⭐

Made with ❤️ by ITime Team

</div>
