interface Content {
  _id?: string;
  title?: string;
  category?: string;
  cover?: string;
  tags?: string[];
  badges?: string[];
  likes?: number;
  stars?: number;
  links?: Link[];
  index?: Index[];
  name?: string;
  author?: string;
  message?: string;
  github?: boolean;
  githubLink?: string;
  userLiked?: boolean;
  user?: string;
  slug?: string;
}

export interface Article extends Content {
  created?: string;
  published?: string;
  level?: string;
  views?: number;
  summary?: string;
  status?: string;
  type?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Draft extends Article {}

export interface User {
 _id?: string;
 name: string;
 email: string;
 password?: string;
 account?: string;
 profile?: UserProfile;
}

interface UserProfile {
 avatar?: string;
 rol?: string;
 bio?: string;
 facebook?: string;
 twitter?: string;
 github?: string;
 portfolio?: string;
 language?: string;
}

export interface ServerResponse {
  ok: boolean;
  message?: string;
  err?: any;
}

export interface UserContent {
  articles?: Article[];
  drafts?: Article[];
}

export interface MenuLink {
  title: string;
  icon: string;
  route: string;
}

export interface HeaderIcons {
  icon?: string;
  route?: string;
}

export interface CustomSlide {
  image: string;
  message: string;
}

export interface UserContentResponse extends ServerResponse, UserContent {}

export interface UserResponse extends ServerResponse {
  user: User;
  token?: string;
}

export interface DraftResponse extends ServerResponse {
  draft?: Draft;
  drafts?: Draft[];
}

export interface ArticleResponse extends ServerResponse {
  article?: Draft;
  articles?: Draft[];
}

export interface ContentResponse extends ServerResponse {
  articles?: Article[];
  drafts?: Draft[];
}

export interface Category extends Content {
  info?: CategoryInfo;
  faq?: FAQ[];
  updated?: string;
  type?: string;
}

export interface CategoryInfo {
  creator?: string;
  where?: string;
  site?: string;
  age?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CategoryResponse extends ServerResponse {
  category?: Category;
  categories?: Category[];
}

export interface CategoryAvatar {
  name?: string;
  image: string;
  selected: boolean;
  index: number;
  message: string;
}

export interface Settings {
  name: string;
  value: string | boolean;
}

export interface Item {
  title: string;
  icon: string;
}

export interface Index {
  title: string;
  subtitle: string;
  id: string;
}

export interface Link {
  name: string;
  url: string;
}

export interface Reaction {
  source: string;
  user: string;
  type: string;
  value: number;
  target?: string;
}

export interface ReactionResponse extends ServerResponse {
  reactions: Reaction[];
}

export interface Check {
  hasGoodTitle?: CheckStatus;
  hasGoodCategory?: CheckStatus;
  hasGoodTags?: CheckStatus;
  hasGoodBadges?: CheckStatus;
  hasGoodLevel?: CheckStatus;
  hasGoodLinks?: CheckStatus;
  hasGoodCover?: CheckStatus;
  hasGoodSummary?: CheckStatus;
  hasGoodMessage?: CheckStatus;
}

export interface CheckStatus {
  ok?: boolean;
  cause?: string;
}

export class CustomError {
 name: string;
 message: string;
 status?: number;
 text: string;
 url?: string;
 author?: string;
 date?: string;
 platform?: string;

 constructor(name: string,
             message: string = 'Error',
             text: string = 'Error',
             author: string,
             status: number = null,
             url: string = '',
             platform: string = '') {
   this.name = name;
   this.message = message;
   this.status = status;
   this.text = text;
   this.url = url;
   this.author = author;
   this.platform = platform;
 }
}

// tslint:disable-next-line:no-empty-interface
export interface SWResponse extends ServerResponse {}

export interface NotificationPayload {
  title?: string;
  body: string;
  icon?: string;
  vibrate?: number[];
  requireInteraction?: boolean;
  image?: string;
  data?: NotificationData;
  actions: NotificationAction[];
  user?: string;
  broadcast?: boolean;
  admin?: boolean;
  device?: string | RegExp;
}

interface NotificationData {
  url?: string;
  data?: any;
}

interface NotificationAction {
  action: string;
  title: string;
}

export interface ArticlesDataResponse extends ServerResponse {
  articlesCount?: number;
  lastArticles?: Article[];
  categoryCount?: object;
  likedArticles?: Article[];
  viewedArticles?: Article[];
  likes?: number;
}
