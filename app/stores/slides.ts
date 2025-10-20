import { defineStore } from "pinia";
const img = "/img/slider/1.webp";
const img2 = "/img/slider/3.webp";
const img3 = "/img/slider/5.webp";
const img4 = "/img/slider/7.webp";
interface Slide {
  id: number;
  position: number;
  title: string;
  subtitle: string;
  description: string;
  active: boolean;
  duration: number;
  visibility: boolean;
  img: string;
}

interface SliderInstance {
  id: string;
  currentSlide: number;
  currentDot: number;
  activeSlideOn: number;
  slideWidth: number;
  maxSlides: number;
  minSlides: number;
  direction: "right" | "left";
  isAnimating: boolean;
  slideDelay: number;
  isPaused: boolean;
  autoSlideTimer: ReturnType<typeof setTimeout> | null;
  progressActive: boolean;
  dots: Array<{ id: string }>;
  slides: Slide[];
  currentTranslateX: number;
  dragging: boolean;
  dragStartX: number;
  dragOffsetPct: number;
  sliderContainerRef: HTMLElement | null;
  wasPausedBeforeDrag: boolean;
  slidesPerView: number;
  rotatedSlides: number;
  clickStartTime: number;
  clickThresholdTimer: ReturnType<typeof setTimeout> | null;
  dragAnimationFrame: number | null;
  pendingDragDelta: number | null;
  wasRecentlyDragged: boolean;
  remainingTime: number;
  pauseStartTime: number;
  slideStartTime: number;
  progressWidth: number;
  slidesEntering: Set<number>;
  slidesLeaving: Set<number>;
  dynamicSlidesOnDrag: boolean;
  dragInitialMinSlides: number | null;
  dragInitialMaxSlides: number | null;
  isMaximized: boolean;
  originalMinSlides: number | null;
  originalMaxSlides: number | null;
  originalActiveSlideOn: number | null;
  originalSlidesPerView: number | null;
  originalCurrentSlideId: number | null;
  isModalOpen: boolean;
  openedSlideId: number | null;
}

const testText = "Izrada web sajtova kod nas se zasniva isključivo na programskom jeziku – bez šablona, bez prečica. Svaka linija koda je pažljivo napisana kako bi vaš sajt bio brz, siguran i potpuno prilagođen vašim potrebama. Kvalitet je zagarantovan jer ne koristimo gotova rešenja, već razvijamo sve od nule, uz savremene tehnologije i vrhunsku optimizaciju. Rezultat je jedinstven, responzivan i profesionalan sajt koji se izdvaja na tržištu i dugoročno donosi rezultate. Izrada web sajtova kod nas se zasniva isključivo na programskom jeziku – bez šablona, bez prečica. Svaka linija koda je pažljivo napisana kako bi vaš sajt bio brz, siguran i potpuno prilagođen vašim potrebama. Kvalitet je zagarantovan jer ne koristimo gotova rešenja, već razvijamo sve od nule, uz savremene tehnologije i vrhunsku optimizaciju. Rezultat je jedinstven, responzivan i profesionalan sajt koji se izdvaja na tržištu i dugoročno donosi rezultate. Izrada web sajtova kod nas se zasniva isključivo na programskom jeziku – bez šablona, bez prečica. Svaka linija koda je pažljivo napisana kako bi vaš sajt bio brz, siguran i potpuno prilagođen vašim potrebama. Kvalitet je zagarantovan jer ne koristimo gotova rešenja, već razvijamo sve od nule, uz savremene tehnologije i vrhunsku optimizaciju. Rezultat je jedinstven, responzivan i profesionalan sajt koji se izdvaja na tržištu i dugoročno donosi rezultate. Izrada web sajtova kod nas se zasniva isključivo na programskom jeziku – bez šablona, bez prečica. Svaka linija koda je pažljivo napisana kako bi vaš sajt bio brz, siguran i potpuno prilagođen vašim potrebama. Kvalitet je zagarantovan jer ne koristimo gotova rešenja, već razvijamo sve od nule, uz savremene tehnologije i vrhunsku optimizaciju. Rezultat je jedinstven, responzivan i profesionalan sajt koji se izdvaja na tržištu i dugoročno donosi rezultate. već razvijamo sve od nule, uz savremene tehnologije i vrhunsku optimizaciju. Rezultat je jedinstven, responzivan i profesionalan sajt koji se izdvaja na tržištu i dugoročno donosi rezultate. ";
const testText2 = "Korišćenje programskog jezika umesto page buildera donosi veću brzinu sajta, bolju SEO optimizaciju i potpunu kontrolu nad dizajnom i funkcionalnostima.";
const testText3 = "Ovo je slider modal i on sluzi da napravimo slider da funkcionise kao modali. Ovo je slider modal i on sluzi da napravimo slider da funkcionise kao modali. Ovo je slider modal i on sluzi da napravimo slider da funkcionise kao modali. Ovo je slider modal i on sluzi da napravimo slider da funkcionise kao modali. Ovo je slider modal i on sluzi da napravimo slider da funkcionise kao modali. Ovo je slider modal i on sluzi da napravimo slider da funkcionise kao modali. Ovo je slider modal i on sluzi da napravimo slider da funkcionise kao modali. Ovo je slider modal i on sluzi da napravimo slider da funkcionise kao modali.";

export const useSlidesStore = defineStore("slides", () => {
  const sliders = reactive<Record<string, SliderInstance>>({});
  const isInit = ref(false);
  const activeInstance = ref<string | null>(null);
  const slider = [
    { id: 1, zIndex: 8787, position: 1, title: "Slide 1", subtitle: "Subtitle 1", description: testText, img: img2, active: false, duration: 2000, visibility: false, },
    { id: 2, zIndex: 8786, position: 2, title: "Slide 2", subtitle: "Subtitle 2", description: testText, img: img3, active: false, duration: 3000, visibility: true, },
    { id: 3, zIndex: 8800, position: 3, title: "Slide 3", subtitle: "Subtitle 3", description: testText, img: img4, active: true, duration: 4000, visibility: true, },
    { id: 4, zIndex: 8799, position: 4, title: "Slide 4", subtitle: "Subtitle 4", description: testText, img: img, active: false, duration: 2500, visibility: true, },
    { id: 5, zIndex: 8798, position: 5, title: "Slide 5", subtitle: "Subtitle 5", description: testText, img: img2, active: false, duration: 20000, visibility: false, },
    { id: 6, zIndex: 8797, position: 6, title: "Slide 6", subtitle: "Subtitle 6", description: testText, img: img3, active: false, duration: 2000, visibility: false, },
    { id: 7, zIndex: 8796, position: 7, title: "Slide 7", subtitle: "Subtitle 7", description: testText, img: img4, active: false, duration: 3000, visibility: false, },
    { id: 8, zIndex: 8795, position: 8, title: "Slide 8", subtitle: "Subtitle 8", description: testText, img: img, active: false, duration: 4000, visibility: false, },
    { id: 9, zIndex: 8794, position: 9, title: "Slide 9", subtitle: "Subtitle 9", description: testText, img: img2, active: false, duration: 2500, visibility: false, },
    { id: 10, zIndex: 8793, position: 10, title: "Slide 10", subtitle: "Subtitle 10", description: testText, img: img3, active: false, duration: 3500, visibility: false, },
    { id: 11, zIndex: 8792, position: 11, title: "Slide 11", subtitle: "Subtitle 11", description: testText, img: img, active: false, duration: 2000, visibility: false, },
    { id: 12, zIndex: 8791, position: 12, title: "Slide 12", subtitle: "Subtitle 12", description: testText, img: img2, active: false, duration: 2000, visibility: false, },
    { id: 13, zIndex: 8790, position: 13, title: "Slide 13", subtitle: "Subtitle 13", description: testText, img: img3, active: false, duration: 2000, visibility: false, },
    { id: 14, zIndex: 8789, position: 14, title: "Slide 14", subtitle: "Subtitle 14", description: testText, img: img4, active: false, duration: 2000, visibility: false, },
    { id: 15, zIndex: 8788, position: 15, title: "Slide 15", subtitle: "Subtitle 15", description: testText, img: img, active: false, duration: 2000, visibility: false, },
  ];
  const cards = [
    { id: 1, zIndex: 8787, position: 1, title: "Card 1", subtitle: "Subtitle 1", description: testText2, img: img2, active: false, duration: 2000, visibility: true, },
    { id: 2, zIndex: 8786, position: 2, title: "Card 2", subtitle: "Subtitle 2", description: testText2, img: img3, active: false, duration: 3000, visibility: true, },
    { id: 3, zIndex: 8800, position: 3, title: "Card 3", subtitle: "Subtitle 3", description: testText2, img: img4, active: true, duration: 4000, visibility: true, },
    { id: 4, zIndex: 8799, position: 4, title: "Card 4", subtitle: "Subtitle 4", description: testText2, img: img, active: false, duration: 2500, visibility: true, },
    { id: 5, zIndex: 8798, position: 5, title: "Card 5", subtitle: "Subtitle 5", description: testText2, img: img2, active: false, duration: 20000, visibility: true, },
    { id: 6, zIndex: 8797, position: 6, title: "Card 6", subtitle: "Subtitle 6", description: testText2, img: img3, active: false, duration: 2000, visibility: true, },
    { id: 7, zIndex: 8796, position: 7, title: "Card 7", subtitle: "Subtitle 7", description: testText2, img: img4, active: false, duration: 3000, visibility: true, },
    { id: 8, zIndex: 8795, position: 8, title: "Card 8", subtitle: "Subtitle 8", description: testText2, img: img, active: false, duration: 4000, visibility: false, },
    { id: 9, zIndex: 8794, position: 9, title: "Card 9", subtitle: "Subtitle 9", description: testText2, img: img2, active: false, duration: 2500, visibility: false, },
    { id: 10, zIndex: 8793, position: 10, title: "Card 10", subtitle: "Subtitle 10", description: testText2, img: img3, active: false, duration: 3500, visibility: false, },
    { id: 11, zIndex: 8792, position: 11, title: "Card 11", subtitle: "Subtitle 11", description: testText2, img: img, active: false, duration: 2000, visibility: false, },
    { id: 12, zIndex: 8791, position: 12, title: "Card 12", subtitle: "Subtitle 12", description: testText2, img: img2, active: false, duration: 2000, visibility: false, },
    { id: 13, zIndex: 8790, position: 13, title: "Card 13", subtitle: "Subtitle 13", description: testText2, img: img3, active: false, duration: 2000, visibility: false, },
    { id: 14, zIndex: 8789, position: 14, title: "Card 14", subtitle: "Subtitle 14", description: testText2, img: img4, active: false, duration: 2000, visibility: false, },
    { id: 15, zIndex: 8788, position: 15, title: "Card 15", subtitle: "Subtitle 15", description: testText2, img: img, active: false, duration: 2000, visibility: false, },
  ];

  const sliderModal = [
    { id: 1, zIndex: 8787, position: 1, title: "Modal 1", subtitle: "Subtitle 1", description: testText3, img: img2, active: false, duration: 2000, visibility: false, },
    { id: 2, zIndex: 8786, position: 2, title: "Modal 2", subtitle: "Subtitle 2", description: testText3, img: img3, active: false, duration: 3000, visibility: false, },
    { id: 3, zIndex: 8800, position: 3, title: "Modal 3", subtitle: "Subtitle 3", description: testText3, img: img4, active: false, duration: 4000, visibility: false, },
    { id: 4, zIndex: 8799, position: 4, title: "Modal 4", subtitle: "Subtitle 4", description: testText3, img: img, active: false, duration: 2500, visibility: false, },
    { id: 5, zIndex: 8798, position: 5, title: "Modal 5", subtitle: "Subtitle 5", description: testText3, img: img2, active: false, duration: 20000, visibility: false, },
    { id: 6, zIndex: 8797, position: 6, title: "Modal 6", subtitle: "Subtitle 6", description: testText3, img: img3, active: false, duration: 2000, visibility: false, },
    { id: 7, zIndex: 8796, position: 7, title: "Modal 7", subtitle: "Subtitle 7", description: testText3, img: img4, active: false, duration: 3000, visibility: false, },
    { id: 8, zIndex: 8795, position: 8, title: "Modal 8", subtitle: "Subtitle 8", description: testText3, img: img, active: false, duration: 4000, visibility: false, },
    { id: 9, zIndex: 8794, position: 9, title: "Modal 9", subtitle: "Subtitle 9", description: testText3, img: img2, active: false, duration: 2500, visibility: false, },
    { id: 10, zIndex: 8793, position: 10, title: "Modal 10", subtitle: "Subtitle 10", description: testText3, img: img3, active: false, duration: 3500, visibility: false, },
    { id: 11, zIndex: 8792, position: 11, title: "Modal 11", subtitle: "Subtitle 11", description: testText3, img: img, active: false, duration: 2000, visibility: false, },
    { id: 12, zIndex: 8791, position: 12, title: "Modal 12", subtitle: "Subtitle 12", description: testText3, img: img2, active: false, duration: 2000, visibility: false, },
    { id: 13, zIndex: 8790, position: 13, title: "Modal 13", subtitle: "Subtitle 13", description: testText3, img: img3, active: false, duration: 2000, visibility: false, },
    { id: 14, zIndex: 8789, position: 14, title: "Modal 14", subtitle: "Subtitle 14", description: testText3, img: img4, active: false, duration: 2000, visibility: false, },
    { id: 15, zIndex: 8788, position: 15, title: "Modal 15", subtitle: "Subtitle 15", description: testText3, img: img, active: false, duration: 2000, visibility: false, },
  ];

  function generateDotsFromSlides(slides: Slide[], activeSlideOn: number) {
    const sortedSlides = [...slides].sort((a, b) => a.position - b.position);
    return sortedSlides.map((slide) => ({
      id: `slide-${slide.id}`,
    }));
  }

  function getSlider(id: string) {
    if (!sliders[id]) {
      if (id === "slider") {
        const initialSlides = JSON.parse(JSON.stringify(slider));
        const activeSlideOn = 5;

        sliders[id] = {
          id,
          currentSlide: 0,
          currentDot: 0,
          activeSlideOn,
          slideWidth: 100,
          minSlides: 4,
          maxSlides: 7,
          direction: "right",
          isAnimating: false,
          slideDelay: 200,
          isPaused: false,
          autoSlideTimer: null,
          progressActive: true,
          dots: generateDotsFromSlides(initialSlides, activeSlideOn),
          slides: initialSlides,
          currentTranslateX: 0,
          dragging: false,
          dragStartX: 0,
          dragOffsetPct: 0,
          sliderContainerRef: null,
          wasPausedBeforeDrag: false,
          slidesPerView: 1,
          rotatedSlides: 0,
          clickStartTime: 0,
          clickThresholdTimer: null,
          dragAnimationFrame: null,
          pendingDragDelta: null,
          wasRecentlyDragged: false,
          remainingTime: 0,
          pauseStartTime: 0,
          slideStartTime: 0,
          progressWidth: 0,
          slidesEntering: new Set<number>(),
          slidesLeaving: new Set<number>(),
          dynamicSlidesOnDrag: true,
          dragInitialMinSlides: null,
          dragInitialMaxSlides: null,
          isMaximized: false,
          originalMinSlides: null,
          originalMaxSlides: null,
          originalActiveSlideOn: null,
          originalSlidesPerView: null,
          originalCurrentSlideId: null,
          isModalOpen: false,
          openedSlideId: null,
        };
      } else if (id === "cards") {
        const initialSlides = JSON.parse(JSON.stringify(cards));
        const activeSlideOn = 5;

        sliders[id] = {
          id,
          currentSlide: 0,
          currentDot: 0,
          activeSlideOn,
          slideWidth: 25,
          minSlides: 0,
          maxSlides: 10,
          direction: "right",
          isAnimating: false,
          slideDelay: 200,
          isPaused: false,
          autoSlideTimer: null,
          progressActive: true,
          dots: generateDotsFromSlides(initialSlides, activeSlideOn),
          slides: initialSlides,
          currentTranslateX: 0,
          dragging: false,
          dragStartX: 0,
          dragOffsetPct: 0,
          sliderContainerRef: null,
          wasPausedBeforeDrag: false,
          slidesPerView: 4,
          rotatedSlides: 0,
          clickStartTime: 0,
          clickThresholdTimer: null,
          dragAnimationFrame: null,
          pendingDragDelta: null,
          wasRecentlyDragged: false,
          remainingTime: 0,
          pauseStartTime: 0,
          slideStartTime: 0,
          progressWidth: 0,
          slidesEntering: new Set<number>(),
          slidesLeaving: new Set<number>(),
          dynamicSlidesOnDrag: true,
          dragInitialMinSlides: null,
          dragInitialMaxSlides: null,
          isMaximized: false,
          originalMinSlides: null,
          originalMaxSlides: null,
          originalActiveSlideOn: null,
          originalSlidesPerView: null,
          originalCurrentSlideId: null,
          isModalOpen: false,
          openedSlideId: null,
        };
      } else if (id === "slider-modal") {
        const initialSlides = JSON.parse(JSON.stringify(sliderModal));
        const activeSlideOn = 5;

        sliders[id] = {
          id,
          currentSlide: 0,
          currentDot: 0,
          activeSlideOn,
          slideWidth: 100,
          minSlides: 4,
          maxSlides: 7,
          direction: "right",
          isAnimating: false,
          slideDelay: 200,
          isPaused: false,
          autoSlideTimer: null,
          progressActive: true,
          dots: generateDotsFromSlides(initialSlides, activeSlideOn),
          slides: initialSlides,
          currentTranslateX: 0,
          dragging: false,
          dragStartX: 0,
          dragOffsetPct: 0,
          sliderContainerRef: null,
          wasPausedBeforeDrag: false,
          slidesPerView: 1,
          rotatedSlides: 0,
          clickStartTime: 0,
          clickThresholdTimer: null,
          dragAnimationFrame: null,
          pendingDragDelta: null,
          wasRecentlyDragged: false,
          remainingTime: 0,
          pauseStartTime: 0,
          slideStartTime: 0,
          progressWidth: 0,
          slidesEntering: new Set<number>(),
          slidesLeaving: new Set<number>(),
          dynamicSlidesOnDrag: true,
          dragInitialMinSlides: null,
          dragInitialMaxSlides: null,
          isMaximized: false,
          originalMinSlides: null,
          originalMaxSlides: null,
          originalActiveSlideOn: null,
          originalSlidesPerView: null,
          originalCurrentSlideId: null,
          isModalOpen: false,
          openedSlideId: null,
        };
      } else {
        const initialSlides = JSON.parse(JSON.stringify(slider));
        const activeSlideOn = 2;

        sliders[id] = {
          id,
          currentSlide: 0,
          currentDot: 0,
          activeSlideOn,
          slideWidth: 100,
          maxSlides: 12,
          minSlides: 0,
          direction: "right",
          isAnimating: false,
          slideDelay: 200,
          isPaused: false,
          autoSlideTimer: null,
          progressActive: true,
          dots: generateDotsFromSlides(initialSlides, activeSlideOn),
          slides: initialSlides,
          currentTranslateX: 0,
          dragging: false,
          dragStartX: 0,
          dragOffsetPct: 0,
          sliderContainerRef: null,
          wasPausedBeforeDrag: false,
          slidesPerView: 1,
          rotatedSlides: 0,
          clickStartTime: 0,
          clickThresholdTimer: null,
          dragAnimationFrame: null,
          pendingDragDelta: null,
          wasRecentlyDragged: false,
          remainingTime: 0,
          pauseStartTime: 0,
          slideStartTime: 0,
          progressWidth: 0,
          slidesEntering: new Set<number>(),
          slidesLeaving: new Set<number>(),
          dynamicSlidesOnDrag: false,
          dragInitialMinSlides: null,
          dragInitialMaxSlides: null,
          isMaximized: false,
          originalMinSlides: null,
          originalMaxSlides: null,
          originalActiveSlideOn: null,
          originalSlidesPerView: null,
          originalCurrentSlideId: null,
          isModalOpen: false,
          openedSlideId: null,
        };
      }
      updateSlides(id);

      if (id === "slider") setCurrentSlideById(id, 1);
      else if (id === "cards") setCurrentSlideById(id, 1);
      else setCurrentSlideById(id, 1);
    }
    activeInstance.value = id;
    return sliders[id];
  }
  const getVisibleSlides = (id: string) => getSlider(id).slides.filter(s => s.visibility);
  const getCurrentSlideTime = (id: string) => {
    const inst = getSlider(id);
    return inst.remainingTime > 0 ? inst.remainingTime : (inst.slides[inst.activeSlideOn]?.duration ?? 5000);
  };
  const getFullSlideTime = (id: string) => getSlider(id).slides[getSlider(id).activeSlideOn]?.duration ?? 5000;
  const getCurrentActiveSlide = (id: string) => {
    const slide = getSlider(id).slides.find(s => s.active);
    return slide ? `slide-${slide.id}` : "";
  };
  const currentTranslateX = (id: string) => getSlider(id).activeSlideOn * getSlider(id).slideWidth;
  const setSlideWidth = (id: string, w: number) => { getSlider(id).slideWidth = w; };

  function initializeSlides(id: string) {
    if (typeof window === 'undefined') return;

    try {
      const instance = getSlider(id);
      instance.isPaused = false
      startAutoSlide(id);
      isInit.value = true;
    } catch (error) {
    }
  }
  const executeWithDelay = (id: string, action: () => void, delay?: number) => {
    if (typeof window === 'undefined') return;
    const inst = getSlider(id);
    if (!inst.isAnimating) {
      inst.isAnimating = true;
      action();
      requestAnimationFrame(() => setTimeout(() => inst.isAnimating = false, delay ?? inst.slideDelay));
    }
  };
  const updateCurrentSlide = (id: string) => {
    const inst = getSlider(id);
    inst.currentSlide = inst.slides.find(s => s.active)?.id ?? 0;
  };

  const trackSlideVisibilityChanges = (id: string, oldMap: Map<number, boolean>) => {
    if (typeof window === 'undefined') return;
    const inst = getSlider(id);
    inst.slides.forEach(s => {
      const was = oldMap.get(s.id), is = s.visibility;
      if (was === false && is === true) {
        inst.slidesEntering.add(s.id);
        requestAnimationFrame(() => inst.slidesEntering.delete(s.id));
      }
      if (was === true && is === false) {
        inst.slidesLeaving.add(s.id);
        requestAnimationFrame(() => inst.slidesLeaving.delete(s.id));
      }
    });
  };

  function updateSlides(id: string) {
    const inst = getSlider(id);
    const oldMap = new Map(inst.slides.map(s => [s.id, s.visibility]));
    inst.slides.forEach((s, i) => {
      s.position = i;
      s.active = i === inst.activeSlideOn;
      s.visibility = i >= inst.minSlides && i <= inst.maxSlides;
    });
    trackSlideVisibilityChanges(id, oldMap);
    updateCurrentSlide(id);
  }
  function startAutoSlide(id: string) {
    const inst = getSlider(id);
    if (!inst.isPaused) {
      stopAutoSlide(id);
      const time = inst.remainingTime > 0 ? inst.remainingTime : getCurrentSlideTime(id);
      const resuming = inst.remainingTime > 0;
      inst.slideStartTime = Date.now();
      if (!resuming) inst.progressWidth = 0;
      inst.progressActive = false;
      setTimeout(() => inst.progressActive = true, 20);
      inst.autoSlideTimer = setTimeout(() => {
        if (!inst.isAnimating && !inst.isPaused) {
          inst.remainingTime = inst.progressWidth = 0;
          slideTo(id, inst.direction === "right" ? "next" : "prev");
          startAutoSlide(id);
        }
      }, time);
    }
  }
  function stopAutoSlide(id: string, save = false) {
    const inst = getSlider(id);
    if (save && inst.slideStartTime > 0) {
      const elapsed = Date.now() - inst.slideStartTime;
      const timeToUse = inst.remainingTime > 0 ? inst.remainingTime : getFullSlideTime(id);
      inst.remainingTime = Math.max(0, timeToUse - elapsed);
      const full = getFullSlideTime(id);
      inst.progressWidth = Math.min(100, Math.max(0, ((full - inst.remainingTime) / full) * 100));
    }
    if (inst.autoSlideTimer) { clearTimeout(inst.autoSlideTimer); inst.autoSlideTimer = null; }
    inst.progressActive = false;
  }
  const setDirection = (id: string, dir: "right" | "left") => {
    const inst = getSlider(id);
    inst.direction = dir === "left" ? "left" : "right";
    if (!inst.isPaused) startAutoSlide(id);
  };
  function goToSlide(id: string, idx: number, skip = false) {
    const inst = getSlider(id);
    if (inst.dragging || (!skip && Date.now() - inst.clickStartTime >= 30) || idx === inst.activeSlideOn) return;
    executeWithDelay(id, () => {
      if (idx === inst.activeSlideOn) return;
      inst.remainingTime = inst.progressWidth = 0;
      const dir = idx < inst.activeSlideOn ? -1 : 1;
      const num = Math.abs(inst.activeSlideOn - idx);
      for (let i = 0; i < num; i++) {
        if (dir === 1) inst.slides.push(inst.slides.shift()!);
        else inst.slides.unshift(inst.slides.pop()!);
      }
      updateSlides(id);
      if (!inst.isPaused) startAutoSlide(id);
    });
  }
  function slideTo(id: string, dir: "next" | "prev") {
    executeWithDelay(id, () => {
      const inst = getSlider(id);
      inst.remainingTime = inst.progressWidth = 0;
      if (dir === "next") inst.slides.push(inst.slides.shift()!);
      else inst.slides.unshift(inst.slides.pop()!);
      updateSlides(id);
      if (!inst.isPaused) startAutoSlide(id);
    });
  }

  function setCurrentSlideById(id: string, slideId: number) {
    const inst = getSlider(id);
    const currentIndex = inst.slides.findIndex(s => s.id === slideId);

    if (currentIndex !== -1 && currentIndex !== inst.activeSlideOn) {
      const rotateCount = currentIndex - inst.activeSlideOn;

      if (rotateCount > 0) {
        for (let i = 0; i < rotateCount; i++) {
          inst.slides.push(inst.slides.shift()!);
        }
      } else if (rotateCount < 0) {
        for (let i = 0; i < Math.abs(rotateCount); i++) {
          inst.slides.unshift(inst.slides.pop()!);
        }
      }

      updateSlides(id);
    }
  }

  const findIdx = (inst: SliderInstance, dotId: string) => inst.slides.findIndex(s => s.id.toString() === dotId.replace("slide-", ""));
  function handleDotClick(id: string, dotId: string) {
    const inst = getSlider(id);
    if (inst.isAnimating) return;
    executeWithDelay(id, () => {
      const idx = findIdx(inst, dotId);
      if (idx !== -1) goToSlide(id, idx, true);
    });
  }
  function handleDotClickBoth(pId: string, sId: string, dotId: string) {
    const pInst = getSlider(pId), sInst = getSlider(sId);
    if (pInst.isAnimating && sInst.isAnimating) return;
    const pIdx = findIdx(pInst, dotId), sIdx = findIdx(sInst, dotId);
    if (pIdx !== -1) goToSlide(pId, pIdx, true);
    if (sIdx !== -1) goToSlide(sId, sIdx, true);
    sInst.slideStartTime = pInst.slideStartTime;
    sInst.remainingTime = pInst.remainingTime;
    sInst.progressWidth = pInst.progressWidth;
  }
  function choosePause(id: string, paused: boolean) {
    const inst = getSlider(id);

    if (paused) {
      stopAutoSlide(id, true);
      inst.pauseStartTime = Date.now();
      inst.isPaused = true;
      inst.progressActive = false;
    } else {
      inst.isPaused = false;
      inst.slideStartTime = Date.now();
      inst.progressActive = true;

      if (inst.remainingTime <= 0) {
        inst.remainingTime = getFullSlideTime(id);
        inst.progressWidth = 0;
      }

      startAutoSlide(id);
    }
  }

  const setSliderContainerRef = (id: string, ref: HTMLElement | null) => { getSlider(id).sliderContainerRef = ref; };
  const isDragging = (id: string) => getSlider(id).dragging;
  const dragOffsetPct = (id: string) => getSlider(id).dragOffsetPct;
  const setSlidesPerView = (id: string, v: number) => { getSlider(id).slidesPerView = v; };
  const setMinSlides = (id: string, v: number) => { getSlider(id).minSlides = v; updateSlides(id); };
  const setMaxSlides = (id: string, v: number) => { getSlider(id).maxSlides = v; updateSlides(id); };
  const setActiveSlideOn = (id: string, v: number) => { getSlider(id).activeSlideOn = v; updateSlides(id); };
  const wasRecentlyDragged = (id: string) => getSlider(id).wasRecentlyDragged;
  const getRemainingTime = (id: string) => getSlider(id).remainingTime;
  const getProgressWidth = (id: string) => getSlider(id).progressWidth;
  const getSlidesEntering = (id: string) => getSlider(id).slidesEntering;
  const getSlidesLeaving = (id: string) => getSlider(id).slidesLeaving;
  const getIsMaximized = (id: string) => getSlider(id).isMaximized;
  const handleAutoSliderChange = (id: string, active: boolean) => {
    const inst = getSlider(id);
    inst.isPaused = active;
    if (active) stopAutoSlide(id);
    else startAutoSlide(id);
  };
  const toggleMaximize = (id: string) => {
    const inst = getSlider(id);
    inst.isMaximized = !inst.isMaximized;

    if (id === "cards") {
      if (inst.isMaximized) {
        if (inst.originalMinSlides === null) inst.originalMinSlides = inst.minSlides;
        if (inst.originalMaxSlides === null) inst.originalMaxSlides = inst.maxSlides;
        if (inst.originalActiveSlideOn === null) inst.originalActiveSlideOn = inst.activeSlideOn;
        if (inst.originalSlidesPerView === null) inst.originalSlidesPerView = inst.slidesPerView;

        inst.minSlides = 0;
        inst.maxSlides = 12;
        inst.activeSlideOn = 5;
        inst.slidesPerView = 8;
        setSlidesPerView(id, 8);
        setSlideWidth(id, 100 / 8);
      } else {
        if (inst.originalMinSlides !== null) inst.minSlides = inst.originalMinSlides;
        if (inst.originalMaxSlides !== null) inst.maxSlides = inst.originalMaxSlides;
        if (inst.originalActiveSlideOn !== null) inst.activeSlideOn = inst.originalActiveSlideOn;
        if (inst.originalSlidesPerView !== null) {
          inst.slidesPerView = inst.originalSlidesPerView;
          setSlidesPerView(id, inst.originalSlidesPerView);
          setSlideWidth(id, 100 / inst.originalSlidesPerView);
        }
      }
      updateSlides(id);
    }
  };
  const toggleMaximizeBoth = (pId: string, sId: string) => {
    const pInst = getSlider(pId), sInst = getSlider(sId);
    pInst.isMaximized = !pInst.isMaximized;
    sInst.isMaximized = pInst.isMaximized;

    const cardsId = pId === "cards" ? pId : sId === "cards" ? sId : null;
    if (cardsId) {
      const cardsInst = getSlider(cardsId);
      if (cardsInst.isMaximized) {
        if (cardsInst.originalMinSlides === null) cardsInst.originalMinSlides = cardsInst.minSlides;
        if (cardsInst.originalMaxSlides === null) cardsInst.originalMaxSlides = cardsInst.maxSlides;
        if (cardsInst.originalActiveSlideOn === null) cardsInst.originalActiveSlideOn = cardsInst.activeSlideOn;
        if (cardsInst.originalSlidesPerView === null) cardsInst.originalSlidesPerView = cardsInst.slidesPerView;
        if (cardsInst.originalCurrentSlideId === null) {
          const activeSlide = cardsInst.slides.find(s => s.active);
          cardsInst.originalCurrentSlideId = activeSlide?.id ?? 1;
        }

        cardsInst.slidesPerView = 8;
        cardsInst.slideWidth = 100 / 8;
        cardsInst.minSlides = 0;
        cardsInst.maxSlides = 12;
        cardsInst.activeSlideOn = 5;

        setCurrentSlideById(cardsId, 1);
      } else {
        if (cardsInst.originalMinSlides !== null) cardsInst.minSlides = cardsInst.originalMinSlides;
        if (cardsInst.originalMaxSlides !== null) cardsInst.maxSlides = cardsInst.originalMaxSlides;
        if (cardsInst.originalActiveSlideOn !== null) cardsInst.activeSlideOn = cardsInst.originalActiveSlideOn;
        if (cardsInst.originalSlidesPerView !== null) {
          cardsInst.slidesPerView = cardsInst.originalSlidesPerView;
          cardsInst.slideWidth = 100 / cardsInst.originalSlidesPerView;
        }
        if (cardsInst.originalCurrentSlideId !== null) {
          setCurrentSlideById(cardsId, cardsInst.originalCurrentSlideId);
        }
      }
      updateSlides(cardsId);
    }
  };

  const initializeSliderRef = (id: string) => {
    if (typeof window === 'undefined') return;
    const inst = getSlider(id);

    const sliderElement = document.querySelector(`#${id} .slides-container`) as HTMLElement;

    if (sliderElement) {
      inst.sliderContainerRef = sliderElement;
      console.log(`Slider ref initialized for ${id}`, sliderElement);
    } else {
      console.warn(`Slider element not found for ${id}`);
    }
  };

  const openSlide = (id: string, slideId: number) => {
    const inst = getSlider(id);
    inst.isModalOpen = true;
    inst.openedSlideId = slideId;
    setCurrentSlideById(id, slideId);

    setTimeout(() => initializeSliderRef(id), 100);
  };

  const openAllSlides = (id: string) => {
    const inst = getSlider(id);
    inst.isModalOpen = true;
    inst.openedSlideId = null;

    setTimeout(() => initializeSliderRef(id), 100);
  };

  const closeModal = (id: string) => {
    const inst = getSlider(id);
    inst.isModalOpen = false;
    inst.openedSlideId = null;
  };

  const getIsModalOpen = (id: string) => getSlider(id).isModalOpen;
  const getOpenedSlideId = (id: string) => getSlider(id).openedSlideId;

  const setupDrag = (inst: SliderInstance, x: number, ms: number, cb: () => void) => {
    inst.wasPausedBeforeDrag = inst.isPaused;
    inst.clickStartTime = Date.now();
    inst.dragStartX = x;
    inst.dragOffsetPct = inst.rotatedSlides = 0;
    if (inst.clickThresholdTimer) clearTimeout(inst.clickThresholdTimer);
    inst.clickThresholdTimer = setTimeout(cb, ms);
  };
  const startDrag = (id: string, x: number, ms: number, sId?: string) => {
    const inst = getSlider(id);
    if (!inst.sliderContainerRef) return;

    if (inst.dragInitialMinSlides === null) inst.dragInitialMinSlides = inst.minSlides;
    if (inst.dragInitialMaxSlides === null) inst.dragInitialMaxSlides = inst.maxSlides;

    setupDrag(inst, x, ms, () => {
      if (!inst.wasPausedBeforeDrag) {
        stopAutoSlide(id, true);
        if (sId) stopAutoSlide(sId, true);
      }

      inst.dragging = true;
      inst.isPaused = true;

      if (sId) {
        const sync = getSlider(sId);
        sync.dragging = true;
        sync.isPaused = true;

        if (!inst.wasPausedBeforeDrag) {
          sync.remainingTime = inst.remainingTime;
          sync.progressWidth = inst.progressWidth;
          sync.slideStartTime = inst.slideStartTime;
        }
      }
    });

    if (sId) {
      const sync = getSlider(sId);
      sync.wasPausedBeforeDrag = sync.isPaused;
      sync.clickStartTime = inst.clickStartTime;
      sync.dragStartX = inst.dragStartX;
      sync.dragOffsetPct = sync.rotatedSlides = 0;

      if (sync.dragInitialMinSlides === null) sync.dragInitialMinSlides = sync.minSlides;
      if (sync.dragInitialMaxSlides === null) sync.dragInitialMaxSlides = sync.maxSlides;
    }
  };

  const onMouseDown = (id: string, e: MouseEvent, sId?: string) => startDrag(id, e.clientX, 120, sId);
  const moveDrag = (id: string, delta: number, sId?: string) => {
    if (typeof window === 'undefined') return;
    const inst = getSlider(id);
    inst.pendingDragDelta = delta;
    if (!inst.dragAnimationFrame) {
      inst.dragAnimationFrame = requestAnimationFrame(() => {
        if (inst.pendingDragDelta !== null && inst.dragging && inst.sliderContainerRef) {
          inst.dragOffsetPct = -(inst.pendingDragDelta / inst.sliderContainerRef.clientWidth) * 100;
          inst.pendingDragDelta = null;

          if (inst.dynamicSlidesOnDrag && inst.dragInitialMinSlides !== null && inst.dragInitialMaxSlides !== null) {
            const slideWidth = 100 / inst.slidesPerView;
            const totalSlides = inst.slides.length;

            const slidesMoved = Math.floor(Math.abs(inst.dragOffsetPct) / slideWidth);

            if (inst.dragOffsetPct < 0) {
              inst.minSlides = Math.max(0, inst.dragInitialMinSlides - slidesMoved);
            } else if (inst.dragOffsetPct > 0) {
            } else {
              inst.minSlides = inst.dragInitialMinSlides;
              inst.maxSlides = inst.dragInitialMaxSlides;
            }

            updateSlides(id);
          }
        }
        inst.dragAnimationFrame = null;
      });
    }
  };
  const onMouseMove = (id: string, e: MouseEvent) => moveDrag(id, e.clientX - getSlider(id).dragStartX);
  function finalizeDrag(inst: SliderInstance, id: string): boolean {
    if (!inst.sliderContainerRef) return false;
    const w = inst.sliderContainerRef.clientWidth;
    const delta = -(inst.dragOffsetPct / 100) * w;
    const dur = Date.now() - inst.clickStartTime;
    const fast = dur <= 250;
    let changed = false;

    const calcSlides = (abs: number) => {
      if (!fast) return 1;
      if (abs >= w * 0.80) return 5;
      if (abs >= w * 0.60) return 4;
      if (abs >= w * 0.40) return 3;
      if (abs >= w * 0.20) return 2;
      return 1;
    };

    if (inst.slidesPerView === 1) {
      if (Math.abs(delta) >= 50) {
        const n = calcSlides(Math.abs(delta));
        for (let i = 0; i < n; i++) {
          if (inst.dragOffsetPct > 0) inst.slides.push(inst.slides.shift()!);
          else inst.slides.unshift(inst.slides.pop()!);
        }
        updateSlides(id);
        changed = true;
      }
    } else {
      let off = Math.round(inst.dragOffsetPct / (100 / inst.slidesPerView));
      if (fast && Math.abs(delta) >= 50) {
        const abs = Math.abs(delta);
        let extra = 0;
        if (abs >= w * 0.80) extra = 6;
        else if (abs >= w * 0.60) extra = 5;
        else if (abs >= w * 0.40) extra = 4;
        else if (abs >= w * 0.20) extra = 3;
        if (extra > 0 && off !== 0) off = off > 0 ? off + extra : off - extra;
      }
      if (off !== 0) {
        const dir = off > 0 ? -1 : 1;
        for (let i = 0; i < Math.abs(off); i++) {
          if (dir > 0) inst.slides.unshift(inst.slides.pop()!);
          else inst.slides.push(inst.slides.shift()!);
        }
        updateSlides(id);
        changed = true;
      }
    }
    return changed;
  }
  const cleanup = (inst: SliderInstance, id: string, changed = false) => {
    if (inst.clickThresholdTimer) { clearTimeout(inst.clickThresholdTimer); inst.clickThresholdTimer = null; }
    if (inst.dragAnimationFrame && typeof window !== 'undefined') {
      cancelAnimationFrame(inst.dragAnimationFrame);
      inst.dragAnimationFrame = null;
    }
    const was = inst.dragging;
    inst.dragging = false;
    if (was) {
      inst.wasRecentlyDragged = true;
      setTimeout(() => inst.wasRecentlyDragged = false, 300);
    }
    inst.dragOffsetPct = inst.rotatedSlides = 0;
    inst.pendingDragDelta = null;

    if (inst.dynamicSlidesOnDrag && inst.dragInitialMinSlides !== null && inst.dragInitialMaxSlides !== null) {
      inst.minSlides = inst.dragInitialMinSlides;
      inst.maxSlides = inst.dragInitialMaxSlides;
      inst.dragInitialMinSlides = null;
      inst.dragInitialMaxSlides = null;
      updateSlides(id);
    }

    if (changed) inst.remainingTime = inst.progressWidth = 0;
    if (!inst.wasPausedBeforeDrag) { inst.isPaused = false; startAutoSlide(id); }
  };
  const endDrag = (id: string, sId?: string) => {
    const inst = getSlider(id);
    let changed = false;

    if (sId) {
      const sync = getSlider(sId);

      const bothStillRunning =
        (inst.progressActive && inst.remainingTime > 0) ||
        (sync.progressActive && sync.remainingTime > 0);

      if (bothStillRunning) {
        //^ console.warn(`[SYNC GUARD] Odbijeno: progress nije završen na ${id} ili ${sId}`);
        cleanup(inst, id, false);
        cleanup(sync, sId, false);
        return;
      }
    }

    if (inst.dragging) {
      changed = finalizeDrag(inst, id);

      if (sId && changed) {
        const sync = getSlider(sId);
        const activeSlide = inst.slides[inst.activeSlideOn];

        if (activeSlide) {
          const targetIdx = sync.slides.findIndex(s => s.id === activeSlide.id);
          if (targetIdx !== -1 && targetIdx !== sync.activeSlideOn) {
            const dir = targetIdx < sync.activeSlideOn ? -1 : 1;
            const num = Math.abs(sync.activeSlideOn - targetIdx);
            for (let i = 0; i < num; i++) {
              if (dir === 1) sync.slides.push(sync.slides.shift()!);
              else sync.slides.unshift(sync.slides.pop()!);
            }
          }
        }

        sync.dragOffsetPct = 0;
        sync.remainingTime = inst.remainingTime;
        sync.progressWidth = inst.progressWidth;
        sync.slideStartTime = inst.slideStartTime;

        updateSlides(sId);
        cleanup(sync, sId, changed);
      }
    }

    cleanup(inst, id, changed);

    if (sId && !inst.wasPausedBeforeDrag) {
      const sync = getSlider(sId);
      sync.isPaused = false;
      startAutoSlide(sId);
    }
  };


  const onMouseUp = (id: string, e: MouseEvent, sId?: string) => endDrag(id, sId);
  const onTouchStart = (id: string, e: TouchEvent, sId?: string) => e.touches[0] && startDrag(id, e.touches[0].clientX, 30, sId);
  const onTouchMove = (id: string, e: TouchEvent) => e.touches[0] && moveDrag(id, e.touches[0].clientX - getSlider(id).dragStartX);
  const onTouchEnd = (id: string, e: TouchEvent, sId?: string) => endDrag(id, sId);
  const doBoth = (fn: (id: string, ...args: any[]) => void, p: string, s: string, ...args: any[]) => { fn(p, ...args); fn(s, ...args); };
  const syncSliders = (pId: string, sId: string) => {
    if (!pId || !sId || pId === sId) return;
    const p = getSlider(pId), s = getSlider(sId);
    s.direction = p.direction;
    s.isPaused = p.isPaused;
    s.slideDelay = p.slideDelay;
    s.slides = JSON.parse(JSON.stringify(p.slides));
    updateSlides(sId);
    if (!s.isPaused) { stopAutoSlide(sId); startAutoSlide(sId); }
  };

  return {
    sliders,
    isInit,
    activeInstance,
    getSlider,
    getVisibleSlides,
    getCurrentSlideTime,
    getCurrentActiveSlide,
    currentTranslateX,
    setSlideWidth,
    initializeSlides,
    updateSlides,
    startAutoSlide,
    stopAutoSlide,
    setDirection,
    goToSlide,
    slideTo,
    setCurrentSlideById,
    handleDotClick,
    handleDotClickBoth,
    choosePause,
    handleAutoSliderChange,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    setSliderContainerRef,
    isDragging,
    dragOffsetPct,
    setSlidesPerView,
    setMinSlides,
    setMaxSlides,
    setActiveSlideOn,
    wasRecentlyDragged,
    getRemainingTime,
    getProgressWidth,
    getSlidesEntering,
    getSlidesLeaving,
    getIsMaximized,
    toggleMaximize,
    toggleMaximizeBoth,
    syncSliders,
    initializeSliderRef,
    openSlide,
    openAllSlides,
    closeModal,
    getIsModalOpen,
    getOpenedSlideId,

    setDirectionBoth: (p: string, s: string, d: "right" | "left") => doBoth(setDirection, p, s, d),
    slideToBoth: (p: string, s: string, d: "next" | "prev") => {
      doBoth(slideTo, p, s, d);
      const pInst = getSlider(p), sInst = getSlider(s);
      sInst.slideStartTime = pInst.slideStartTime;
      sInst.remainingTime = pInst.remainingTime;
      sInst.progressWidth = pInst.progressWidth;
    },
    choosePauseBoth: (p: string, s: string, paused: boolean) => {
      doBoth(choosePause, p, s, paused);
      const pInst = getSlider(p), sInst = getSlider(s);

      sInst.slideStartTime = pInst.slideStartTime;
      sInst.remainingTime = pInst.remainingTime;
      sInst.progressWidth = pInst.progressWidth;
    },
    onMouseMoveSynced: (id: string, sId: string, e: MouseEvent) => moveDrag(id, e.clientX - getSlider(id).dragStartX, sId),
    onMouseDownSynced: (id: string, sId: string, e: MouseEvent) => onMouseDown(id, e, sId),
    onMouseUpSynced: (id: string, sId: string, e: MouseEvent) => onMouseUp(id, e, sId),
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchStartSynced: (id: string, sId: string, e: TouchEvent) => onTouchStart(id, e, sId),
    onTouchMoveSynced: (id: string, sId: string, e: TouchEvent) => {
      if (e.touches[0]) moveDrag(id, e.touches[0].clientX - getSlider(id).dragStartX, sId);
    },
    onTouchEndSynced: (id: string, sId: string, e: TouchEvent) => onTouchEnd(id, e, sId),

  };
});