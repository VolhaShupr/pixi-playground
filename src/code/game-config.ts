export const GAME_TEXTURES = [
  {
    name: 'background',
    srcs: 'assets/background.jpg',
  },
  {
    name: 'btnActive',
    srcs: 'assets/btn-active.png',
  },
  {
    name: 'btnInactive',
    srcs: 'assets/btn-inactive.png',
  },
  {
    name: 'sym1',
    srcs: 'assets/SYM1.png',
  },
  {
    name: 'sym3',
    srcs: 'assets/SYM3.png',
  },
  {
    name: 'sym4',
    srcs: 'assets/SYM4.png',
  },
  {
    name: 'sym5',
    srcs: 'assets/SYM5.png',
  },
  {
    name: 'sym6',
    srcs: 'assets/SYM6.png',
  },
  {
    name: 'sym7',
    srcs: 'assets/SYM7.png',
  },
];

export const TRANSITION_DURATION = 1000; // 1 sec

const WHEEL_IDLE_SPEED = 0.005;
const WHEEL_ACCELERATED_SPEED = WHEEL_IDLE_SPEED * 4;
export const WHEEL_CONFIG = {
  radius: 190,
  spinSpeed: {
    idle: WHEEL_IDLE_SPEED,
    accelerated: WHEEL_ACCELERATED_SPEED,
  }
}

export const DEFAULT_FPS = 60;
export const TRANSITION_PER_FRAME = (WHEEL_CONFIG.spinSpeed.accelerated - WHEEL_CONFIG.spinSpeed.idle) / (TRANSITION_DURATION / 1000) * (1 / DEFAULT_FPS);
