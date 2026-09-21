export const TESTIMONIALS_UPDATED_EVENT = 'testimonials-updated';

export function notifyTestimonialsUpdated() {
  window.dispatchEvent(new CustomEvent(TESTIMONIALS_UPDATED_EVENT));
}
