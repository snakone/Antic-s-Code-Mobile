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

interface ServerResponse {
  ok: boolean;
  message?: string;
  err?: any;
}

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

export interface Draft extends Content {
  message?: string;
  user?: string;
  author?: string;
  created?: string;
  slug?: string;
  level?: string;
  views?: number;
  summary?: string;
  status?: string;
  check?: Check;
  github?: boolean;
  githubLink?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Article extends Draft {}

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
