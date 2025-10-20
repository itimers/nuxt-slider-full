<script lang="ts" setup>
interface Props {
  side?: string;
  slidesPerView?: number;
  instanceId?: string;
  syncWith?: string;
  enableDrag?: boolean;
  enableTouch?: boolean;
  enablePauseButton?: boolean;
  enableProgressBar?: boolean;
  enableProgressBarInPicture?: boolean;
  enableCircleProgress?: boolean;
  enableDots?: boolean;
  enableArrows?: boolean;
  enableMaximize?: boolean;
  isModal?: boolean;
  minSlides?: number;
  maxSlides?: number;
  activeSlideOn?: number;
}
const props = withDefaults(defineProps<Props>(), {
  slidesPerView: 1,
  instanceId: "slider",
  syncWith: undefined,
  enableDrag: true,
  enableTouch: true,
  enablePauseButton: true,
  enableProgressBar: true,
  enableCircleProgress: true,
  enableDots: true,
  enableArrows: true,
  enableMaximize: true,
  isModal: false,
  enableProgressBarInPicture: false,
  enablePauseButtonInPicture: false,
  minSlides: 4,
  maxSlides: 6,
  activeSlideOn: 5,
});

const sm = useSlidesStore();
const id = computed(() => props.instanceId);
const getS = () => sm.getSlider(id.value);
const slides = computed(() => getS().slides);
const slideWidth = computed(() => getS().slideWidth);
const activeSlideOn = computed(() => getS().activeSlideOn);
const progressActive = computed(() => getS().progressActive);
const isPaused = computed(() => getS().isPaused);
const dots = computed(() => getS().dots);
const currentActiveSlide = computed(() => sm.getCurrentActiveSlide(id.value));
const currentSlideTime = computed(() => sm.getCurrentSlideTime(id.value));
const isDragging = computed(() => sm.isDragging(id.value));
const dragOffsetPct = computed(() => sm.dragOffsetPct(id.value));
const wasRecentlyDragged = computed(() => sm.wasRecentlyDragged(id.value));
const progressWidth = computed(() => sm.getProgressWidth(id.value));
const slidesEntering = computed(() => sm.getSlidesEntering(id.value));
const slidesLeaving = computed(() => sm.getSlidesLeaving(id.value));
const visibleSlidesFiltered = computed(() => slides.value.filter((s) => s.visibility));
const sliderInstanceClass = computed(() => `sliderid-${id.value}`);
const slidesPerView = computed(() => getS().slidesPerView);
const slideWidthPercent = computed(() => `${100 / slidesPerView.value}%`);
const isMaximized = computed(() => sm.getIsMaximized(id.value));

const handleMaximize = () => {
  if (props.syncWith) sm.toggleMaximizeBoth(id.value, props.syncWith);
  else sm.toggleMaximize(id.value);
};

const handleSlideClick = (idx: number, isActive: boolean) => {
  if (isActive) return;

  if (props.syncWith) {
    sm.goToSlide(id.value, idx, true);
    sm.goToSlide(props.syncWith, idx, true);
  }
  else sm.goToSlide(id.value, idx);
};
const handleMouseDown = (e: MouseEvent) => {
  if (!props.enableDrag) return;
  props.syncWith ? sm.onMouseDownSynced(id.value, props.syncWith, e) : sm.onMouseDown(id.value, e);
};
const resetDragState = () => {
  const inst = sm.getSlider(id.value);
  if (inst.dragging) {
    inst.dragging = false;
    inst.dragOffsetPct = 0;
    inst.rotatedSlides = 0;
    inst.pendingDragDelta = null;
    if (inst.clickThresholdTimer) {
      clearTimeout(inst.clickThresholdTimer);
      inst.clickThresholdTimer = null;
    }
    if (inst.dragAnimationFrame) {
      cancelAnimationFrame(inst.dragAnimationFrame);
      inst.dragAnimationFrame = null;
    }
  }
};

const handleMouseMove = (e: MouseEvent) => {
  if (!props.enableDrag) return;
  const inst = sm.getSlider(id.value);
  if (!inst.dragging) return;

  props.syncWith ? sm.onMouseMoveSynced(id.value, props.syncWith, e) : sm.onMouseMove(id.value, e);
};

const handleTouchStart = (e: TouchEvent) => {
  if (!props.enableTouch) return;
  props.syncWith ? sm.onTouchStartSynced(id.value, props.syncWith, e) : sm.onTouchStart(id.value, e);
};
const handleTouchMove = (e: TouchEvent) => {
  if (!props.enableTouch) return;
  const inst = sm.getSlider(id.value);
  if (!inst.dragging) return;

  props.syncWith ? sm.onTouchMoveSynced(id.value, props.syncWith, e) : sm.onTouchMove(id.value, e);
};


const handleGlobalMouseUp = () => {
  const inst = sm.getSlider(id.value);
  if (inst.dragging) {
    resetDragState();
  }
};

const handleGlobalTouchEnd = () => {
  const inst = sm.getSlider(id.value);
  if (inst.dragging) {
    resetDragState();
  }
};

const sliderRef = ref<HTMLElement | null>(null);
const isLoadingSlider = ref(true);

const isModalOpen = computed(() => sm.getIsModalOpen(id.value));

const handleSliderMouseUp = (e: MouseEvent) => {
  if (!props.enableDrag) return;
  props.syncWith ? sm.onMouseUpSynced(id.value, props.syncWith, e) : sm.onMouseUp(id.value, e);
};

const handleSliderTouchEnd = (e: TouchEvent) => {
  if (!props.enableTouch) return;
  props.syncWith ? sm.onTouchEndSynced(id.value, props.syncWith, e) : sm.onTouchEnd(id.value, e);
};

const attachSliderListeners = () => {
  if (sliderRef.value) {
    sliderRef.value.addEventListener('mouseup', handleSliderMouseUp, { passive: true });
    sliderRef.value.addEventListener('touchend', handleSliderTouchEnd, { passive: true });
  }
};

const detachSliderListeners = () => {
  if (sliderRef.value) {
    sliderRef.value.removeEventListener('mouseup', handleSliderMouseUp);
    sliderRef.value.removeEventListener('touchend', handleSliderTouchEnd);
  }
};

const attachGlobalResetListeners = () => {
  document.addEventListener('mouseup', handleGlobalMouseUp);
  document.addEventListener('touchend', handleGlobalTouchEnd, { passive: true });
};

const detachGlobalResetListeners = () => {
  document.removeEventListener('mouseup', handleGlobalMouseUp);
  document.removeEventListener('touchend', handleGlobalTouchEnd);
};

watch(isModalOpen, (newVal) => {
  if (newVal && props.isModal) {
    setTimeout(() => {
      attachSliderListeners();
    }, 150);
  }
});

onMounted(() => {
  sm.initializeSlides(id.value);
  /* if (props.syncWith) {
    sm.choosePauseBoth(id.value, props.syncWith, true);
  } else {
    sm.choosePause(id.value, true);
  } */
  sm.setSlideWidth(id.value, 100 / props.slidesPerView);
  sm.setSlidesPerView(id.value, props.slidesPerView);
  sm.setMinSlides(id.value, props.minSlides);
  sm.setMaxSlides(id.value, props.maxSlides);
  sm.setActiveSlideOn(id.value, props.activeSlideOn);

  nextTick(() => {
    if (sliderRef.value) {
      sm.setSliderContainerRef(id.value, sliderRef.value as HTMLElement);
      if (!props.isModal || isModalOpen.value) {
        attachSliderListeners();
      }
    }
  });

  attachGlobalResetListeners();

  setTimeout(() => {
    isLoadingSlider.value = false;
  }, 50)
});

onBeforeUnmount(() => {
  detachSliderListeners();
  detachGlobalResetListeners();
});
</script>

<template>
  <section v-if="!props.isModal || (props.isModal && isModalOpen)" class="slider"
    :class="[sliderInstanceClass, { 'is-maximized': isMaximized }, { 'is-modal': props.isModal }]" :style="{
      '--slide-width': slideWidthPercent
    }" :id="props.instanceId">
    <Transition name="slider-o" mode="out-in">
      <Teleport to="#overlays"
        v-if="(isMaximized || isModalOpen) && (!props.syncWith || (props.syncWith && props.instanceId < props.syncWith))">
        <div class="slider-overlay">
        </div>
      </Teleport>
    </Transition>

    <button v-if="props.isModal && isModalOpen" @click="sm.closeModal(id)" class="modal-close-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div class="pagination" v-if="(!props.isModal || isModalOpen) && props.enableCircleProgress && props.enableDots">
      <div class="circle-progress-container" v-if="props.enableCircleProgress">
        <svg id="clock" width="25" height="25" viewBox="0 0 25 25" class="clock-timer">
          <circle id="circle1" cx="12.5" cy="12.5" r="6" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="10" />
          <circle id="circle2" cx="12.5" cy="12.5" r="6" fill="none" stroke="#000" stroke-width="10"
            stroke-dasharray="37.7 37.7" class="progress-circle" :class="{ active: progressActive, paused: isPaused }"
            :style="{
              '--slide-duration': `${currentSlideTime}ms`,
              '--circle-progress-start':
                progressWidth > 0
                  ? `${37.7 - (37.7 * progressWidth) / 100}`
                  : '37.7',
            }" />
        </svg>
      </div>
      <div class="dot-container" v-if="props.enableDots">
        <div class="dot" v-for="dot in dots" :key="dot.id" :id="dot.id"
          :class="{ active: dot.id === currentActiveSlide }"
          @click.stop="props.syncWith ? sm.handleDotClickBoth(id, props.syncWith, dot.id) : sm.handleDotClick(id, dot.id)">
        </div>
      </div>

      <div class="play-pause" v-if="props.enablePauseButton">
        <button class="pause"
          @click.stop="props.syncWith ? sm.choosePauseBoth(id, props.syncWith, !isPaused) : sm.choosePause(id, !isPaused)">
          <SliderPause v-if="!isPaused" />
          <SliderPlay v-else />
        </button>
      </div>

      <div class="maximize-button" v-if="props.enableMaximize">
        <button @click.stop="handleMaximize">
          <svg v-if="!isMaximized" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        </button>
      </div>
    </div>

    <div class="progress-container" v-if="(!props.isModal || isModalOpen) && props.enableProgressBar">
      <div class="progress-bar" :class="{ active: progressActive, paused: isPaused }" :style="{
        '--slide-duration': `${currentSlideTime}ms`,
        '--progress-start': progressWidth > 0 ? `${progressWidth}%` : '0%',
      }"></div>
    </div>

    <button class="arrow arrow-prev" v-if="(!props.isModal || isModalOpen) && props.enableArrows"
      aria-label="previous slide"
      @click="props.syncWith ? sm.slideToBoth(id, props.syncWith, 'prev') : sm.slideTo(id, 'prev')">
      <SliderNext />
    </button>

    <div ref="sliderRef" class="slides-container" :class="{ 'is-dragging': isDragging }" @mousedown="handleMouseDown"
      @mousemove="handleMouseMove" @touchstart.passive="handleTouchStart" @touchmove.passive="handleTouchMove"
      @touchcancel.passive="handleSliderTouchEnd">
      <TransitionGroup class="slides" name="slide-fade" tag="div" :style="{
        transform: `translateX(-${slidesPerView > 1 ? activeSlideOn * slideWidth + dragOffsetPct : slideWidth + dragOffsetPct
          }%)`,
        transition: isDragging ? 'none' : 'transform var(--slide-transition)',
      }" v-if="slides">
        <div class="slide-wrapper" v-for="(slide, index) in visibleSlidesFiltered" :key="slide.id"
          @click.stop="wasRecentlyDragged ? null : handleSlideClick(slide.position, slide.active)" :class="[
            { active: slide.active },
            { 'slide-entering': slidesEntering.has(slide.id) },
            { 'slide-leaving': slidesLeaving.has(slide.id) },
            `slide-${slide.id}`,
          ]">
          <article class="slide">
            <div class="img">
              <div class="progress-container" v-if="props.enableProgressBarInPicture && slide.active">
                <div class="progress-bar" :class="{ active: progressActive, paused: isPaused }" :style="{
                  '--slide-duration': `${currentSlideTime}ms`,
                  '--progress-start':
                    progressWidth > 0 ? `${progressWidth}%` : '0%',
                }"></div>
              </div>
              <div v-if="isLoadingSlider" class="skeleton skeleton-img"></div>
              <img :src="slide.img" alt="article-img" @load="isLoadingSlider = false" />

            </div>


            <div class="heading">
              <h1>{{ slide.title }} (ID: {{ slide.id }})</h1>
            </div>
            <figure>
              <figcaption>
                <p>{{ slide.description }}</p>
              </figcaption>
            </figure>
            <aside>
              <p>Posetite stranicu</p>
              <NuxtLink to="/">O nama</NuxtLink>
            </aside>
          </article>
        </div>
      </TransitionGroup>
    </div>

    <button class="arrow arrow-next" v-if="(!props.isModal || isModalOpen) && props.enableArrows"
      aria-label="next slide"
      @click="props.syncWith ? sm.slideToBoth(id, props.syncWith, 'next') : sm.slideTo(id, 'next')">
      <SliderNext />
    </button>
  </section>
</template>



<style lang="scss">
:root {
  --app: #fff;
  --hbs: rgba(0, 0, 0, 0.1);
  --font: #333;
  --primary: #31a6ff;
}

*,
:after,
:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body,
html {
  height: 100%;
  overflow: hidden auto;
  width: 100%;
}

html:focus-within {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  line-height: 1.2;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

canvas,
img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

ol,
ul {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

b,
strong {
  font-weight: bolder;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 1.5rem;
}

p {
  font-size: 1.2rem;
}

aside {
  color: #333;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0 0;
  position: relative;
  width: 100%;
}

aside a,
aside p {
  font-size: inherit;
}

aside a {
  background: #aaa;
  border-radius: 77px;
  color: #fff;
  padding: 5px 10px;
  text-align: center;
}

aside .buttons,
aside .group-item {
  align-items: center;
  display: flex;
  gap: 5px;
}

aside .buttons {
  justify-content: flex-start;
}

aside.group {
  flex-wrap: wrap;
  gap: 15px 20px;
}

aside.group>.group-item {
  flex: 1 1 200px;
}

aside.group .group-item {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 20px;
}

aside.group .buttons {
  flex-wrap: wrap;
}

figure {
  background: var(--app);
  width: 100%;
}

.sections,
figure {
  position: relative;
}

.sections {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-inline: auto;
  padding: 0 20px;
}

article {
  display: grid;
  gap: 5px 20px;
  grid-template-areas: "heading img" "content img" "aside img";
  position: relative;
}

.img {
  grid-area: img;
}

.heading {
  grid-area: heading;
}

figure {
  grid-area: content;
}

aside {
  grid-area: aside;
}

section.card-center-center-mt-10px-p-10px-0 {
  margin-top: 10px;
  margin-inline: auto;
  padding: 10px 0;
}

section.card-center-center-mt-10px-p-10px-0 article {
  border-radius: 13px;
  box-shadow: 0 0 20px 0 var(--hbs);
  gap: 0;
  grid-template-areas: "img" "heading" "content" "aside";
  grid-template-rows: 0.1fr auto auto auto;
  max-width: 1200px;
  overflow: hidden;
  place-items: flex-start;
  place-self: center;
  width: 100%;
}

section.card-center-center-mt-10px-p-10px-0 article .heading {
  padding-top: 10px;
  text-align: center;
}

section.card-center-center-mt-10px-p-10px-0 article .heading,
section.card-center-center-mt-10px-p-10px-0 article aside,
section.card-center-center-mt-10px-p-10px-0 article figure {
  padding: 0 15px;
}

section.card-center-center-mt-10px-p-10px-0 article aside {
  padding-bottom: 15px;
}

section.card-center-center-mt-10px-p-10px-0 .img {
  aspect-ratio: 1.7777777778;
  height: 100%;
  max-height: 400px;
  min-height: 300px;
  min-width: 200px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

section.card-center-center-mt-10px-p-10px-0 .img img {
  aspect-ratio: 1.7777777778;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  width: 100%;
  object-view-box: inset(0 0 0 0);
}

section.default-center-left-center-mt-0px-p-0px {
  margin-top: 0;
  margin-inline: auto;
  padding: 0;
}

section.default-center-left-center-mt-0px-p-0px article {
  border-radius: 13px;
  box-shadow: 0 0 20px 0 var(--hbs);
  overflow: hidden;
}

section.default-center-left-center-mt-0px-p-0px article .heading {
  padding-top: 10px;
}

section.default-center-left-center-mt-0px-p-0px article aside {
  padding-bottom: 10px;
}

section.default-center-left-center-mt-0px-p-0px article {
  grid-template-areas: "img heading" "img content" "img aside";
  grid-template-columns: auto auto;
  grid-template-rows: 0.1fr auto auto;
}

section.default-center-left-center-mt-0px-p-0px .img {
  height: 100%;
  max-width: 500px;
  min-height: 100px;
  min-width: 100px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

section.default-center-left-center-mt-0px-p-0px .img img {
  aspect-ratio: 1.7777777778;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  object-view-box: inset(0 0 0 0);
  height: 100%;
  max-width: 500px;
  min-height: 100px;
  min-width: 100px;
  width: 100%;
}

.slider-o-enter-active,
.slider-o-leave-active {
  transition: opacity 0.3s ease-out;
}

.slider-o-enter-from,
.slider-o-leave-to {
  opacity: 0;
}

.slider {
  position: relative;
  width: 100%;
  --slide-transition: 0.5s;
  transition: all 0.3s ease;
}

.slider-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .3);
  backdrop-filter: blur(9px);
  z-index: 9999;
}

.slider-overlay .maximize-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9998;
}

.slides-container {
  cursor: default;
}

.slides-container.is-dragging {
  cursor: grab;
}

.slides-container.is-dragging:active {
  cursor: grabbing;
}

.slides {
  position: relative;
  width: 100%;
  display: flex;
  transition: transform var(--slide-transition);
  user-select: none;
}

.slides .img img {
  -webkit-user-drag: none;
  user-select: none;
  pointer-events: auto;
}

.slide-wrapper {
  position: relative;
  z-index: 9999;
  user-select: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  opacity: 0.2;
  flex: 0 0 var(--slide-width, 100%);
  transform-origin: center center;
  transition: transform var(--slide-transition) ease, opacity var(--slide-transition) ease, flex 0.2s ease;
  transition-delay: 0s, 0.3s, 0s;
}

.sliderid-slider {
  width: 90%;
  margin-inline: auto;
}

.sliderid-slider .slide-wrapper .slide {
  width: 98.6%;
  margin-inline: auto;
}

.sliderid-cards {
  width: 90%;
  margin-inline: auto;
}

.sliderid-cards .slide-wrapper .slide {
  width: 95%;
  margin-inline: auto;
}

.slide {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  user-select: none;
  background: white;
  transition: opacity var(--slide-transition) ease-out, max-height 0.2s ease;
  transition-delay: 0.2s, 0.2s;
}

.slide-wrapper.active .slide figcaption:hover{
    overflow: hidden auto;
}
.slide figcaption {
  scrollbar-gutter: stable;
  height: 100%;
  max-height: 250px;
  overflow: hidden;
}

.slide figcaption::-webkit-scrollbar {
  width: 8px;
}

.slide figcaption::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.slide figcaption::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.slide figcaption::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.slide::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  opacity: 0;
  visibility: hidden;
  background: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, .8) 30%, rgba(255, 255, 255, .5) 50%, rgba(255, 255, 255, 0) 70%);
  transition: opacity 0.3s ease, visibility 0.3s ease, height 0.3s ease;
}

.slide-entering {
  height: 0 !important;
  z-index: -1 !important;
  opacity: 0 !important;
  transition: opacity 0.1s ease;
  transition-delay: 0.5s !important;
}

.slide-fade-leave-active {
  position: absolute;
  height: 0 !important;
  z-index: -1 !important;
  opacity: 0 !important;
  transition: opacity 0.1s ease;
  transition-delay: 0.5s !important;
}

.slide-fade-leave-to {
  position: absolute;
  height: 0 !important;
  z-index: -1 !important;
  opacity: 0 !important;
  transition: opacity 0.1s ease;
  transition-delay: 0.5s !important;
}

.slide-wrapper.active {
  opacity: 1;
}

.slide-wrapper.hide {
  opacity: 0;
  pointer-events: none;
}

.pagination {
  position: relative;
  width: 100%;
  z-index: 9;
  gap: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.play-pause button,
.maximize-button button,
.direction-controls button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.play-pause button svg,
.maximize-button button svg {
  width: 20px;
  height: 20px;
}

.maximize-button button {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.maximize-button button:hover {
  transform: scale(1.1);
}

.direction-controls {
  display: flex;
  gap: 5px;
}

.direction-controls button {
  width: 30px;
  height: 30px;
  background: #000 4d;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.direction-controls button.active {
  background: #000;
  color: white;
}

.dot-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.dot-container .dot {
  width: 15px;
  height: 15px;
  background: #6e6e6e;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot-container .dot.active {
  background: #000;
  transform: scale(1.2);
}

.progress-container {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #000;
  width: var(--progress-start, 0%);
  transform-origin: left center;
}

.progress-bar.paused {
  transition: none !important;
  width: var(--progress-start, 0%) !important;
}

.progress-bar.active {
  width: 100%;
  transition: width var(--slide-duration) linear;
}

.circle-progress-container {
  width: 23px;
  height: 23px;
}

.clock-timer {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

#circle1 {
  position: relative;
  fill: none;
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 12;
}

#circle2 {
  position: relative;
  fill: none;
  stroke: #000;
  stroke-width: 12;
  transform-origin: center;
}

.progress-circle {
  stroke-dashoffset: var(--circle-progress-start, 37.7);
  transition: none;
}

.progress-circle.paused {
  transition: none !important;
  stroke-dashoffset: var(--circle-progress-start, 37.7) !important;
}

.progress-circle.active {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset var(--slide-duration) linear;
}

.arrow {
  cursor: pointer;
  position: absolute;
  z-index: 15;
  top: 50%;
  width: 50px;
  height: 50px;
  font-size: 200%;
  color: white;
  background: #000 4d;
  border: none;
  border-radius: 50%;
  transform: translateY(-50%);
  transition: background 0.3s ease;
}

.arrow:hover {
  background: rgba(0, 0, 0, 0.6);
}

.arrow svg {
  width: 24px;
  height: 24px;
}

.arrow-prev {
  left: 20px;
  transform: translateY(-50%) rotate(180deg);
}

.arrow-next {
  right: 20px;
}

.slider.is-maximized {
  position: fixed;
  width: 100%;
  z-index: 9999;
  padding: 0;
}

.slider.is-maximized .pagination {
  height: 5vh;
  max-height: 10vh;
}

/* .slider.is-maximized .slide figcaption {
  max-height: ;
  scrollbar-gutter: none;
} */

.slider.is-maximized .slide-wrapper {
  opacity: 1;
}

.slider.is-maximized.sliderid-slider {
  position: fixed;
  top: 0;
  left: 0;
  animation: slideFromTop 1.2s cubic-bezier(0.5, 1.1, 0.5, 1);
}

.slider.is-maximized.sliderid-slider .slide {
  grid-template-rows: auto 1fr 1fr;
  max-height: 50vh;
  place-content: flex-start;
}
.slider.is-maximized.sliderid-slider .slide aside {
  place-content: flex-start;
  position: fixed;
  bottom: 0;
}

.slider.is-maximized.sliderid-cards {
  position: fixed;
  bottom: 0;
  left: 0;
  margin-top: 0px;
  padding-bottom: 20px;
  animation: slideFromBottom 1.2s cubic-bezier(0.5, 1.1, 0.64, 1);
}

.slider.is-maximized.sliderid-cards .slide {
  grid-template-rows: 50px 1fr 1fr;
}
.slider.is-maximized.sliderid-cards .slide img {
  max-height: 50px;
  overflow: hidden;
}
.slider.is-maximized.sliderid-cards .slide .heading h1 {
  font-size: 160%;
}
.slider.is-maximized.sliderid-cards .slide figcaption p {
  font-size: 100%;
}
.slider.is-maximized.sliderid-cards .slides {
  align-items: flex-end;
}

.slider.is-maximized.sliderid-cards .slide-wrapper {
  justify-content: center;
  align-items: center;
}

.slider.is-maximized.sliderid-cards .slide-wrapper:hover {
  z-index: 2;
  flex: 0 0 20%;
}

.slider.is-maximized.sliderid-cards .slide-wrapper.active {
  flex: 0 0 20%;
}

.slider.is-maximized.sliderid-cards .slide-wrapper.active .slide {
  /* max-height: 45vh; */
  z-index: 2;
}
.slider.is-maximized.sliderid-cards .slide-wrapper.active .slide {
  /* max-height: 60vh; */
  z-index: 2;
}
.slider.is-maximized.sliderid-cards .slide-wrapper.active .slide::after {
  opacity: 0;
  height: 0;
  visibility: hidden;
}

.slider.is-maximized.sliderid-cards .slide-wrapper.active:hover .slide {
  max-height: 60vh;
  z-index: 2;
}

.slider.is-maximized.sliderid-cards .slide {
  max-height: 40vh;
}

.slider.is-maximized.sliderid-cards .slide::after {
  opacity: 1;
  visibility: visible;
}

.slider.is-maximized.sliderid-cards .slide:hover {
  max-height: 60vh;
  z-index: 2;
}

.slider.is-maximized.sliderid-cards .slide:hover::after {
  opacity: 0;
  height: 0;
  visibility: hidden;
}

.skeleton {
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}

.skeleton-text {
  width: 100%;
  height: 1em;
  border-radius: 4px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  margin-top: 5px;
}

.skeleton-text:first-child {
  margin-top: 0;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

@keyframes slideFromTop {
  0% {
    transform: translateY(0);
    opacity: 0.3;
  }

  30% {
    transform: translateY(-200%);
    opacity: 0;
  }

  55% {
    transform: translateY(0%);
    opacity: 1;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideFromBottom {
  0% {
    transform: translateY(0);
    opacity: 0.3;
  }

  30% {
    transform: translateY(200%);
    opacity: 0;
  }

  55% {
    transform: translateY(0%);
    opacity: 1;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.skeleton-img {
  width: 100%;
  height: 400px;
  border-radius: 8px;
}
</style>