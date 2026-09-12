// ============================================================
//  QUILLORA — India IT Jobs Posts Index
//  All 25 job posts combined and exported
// ============================================================

import { CITY_POSTS } from "./city-posts";
import { COMPANY_POSTS_A } from "./company-posts-a";
import { COMPANY_POSTS_B } from "./company-posts-b";
import { ROLE_POSTS } from "./role-posts";
import { EXPERIENCE_POSTS } from "./experience-posts";

export const ALL_JOB_POSTS = [
  ...CITY_POSTS,
  ...COMPANY_POSTS_A,
  ...COMPANY_POSTS_B,
  ...ROLE_POSTS,
  ...EXPERIENCE_POSTS,
];
