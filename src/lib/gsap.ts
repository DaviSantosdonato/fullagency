"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point.
 *
 * `gsap.registerPlugin` is idempotent, but importing ScrollTrigger from many
 * modules is how you end up with two copies of it under bundler tree-shaking.
 * Everything in this app imports GSAP from here.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** ScrollTrigger's own defaults are fine; these just centralise the tuning. */
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };
